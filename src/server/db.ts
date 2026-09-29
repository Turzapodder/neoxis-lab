import { promises as fs } from 'fs';
import path from 'path';
import { buildSeed } from './seed';
import { COLLECTIONS, getDb, isMongoConfigured, mongoStatus } from './mongodb';

/**
 * CMS data store.
 *
 * Primary store: MongoDB (MONGO_URL) — collections cms_meta / cms_users /
 * cms_sections. When Mongo is unreachable the store transparently falls back
 * to the original JSON file at ./data/cms.json so the admin panel and the
 * public site keep working offline.
 *
 * Defaults deep-merge from seed, so adding new seed fields never breaks an
 * existing database.
 */

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms.json');

export interface AdminUser {
  id: string;
  email: string;
  /** scrypt hash: salt:hash, both hex. */
  passwordHash: string;
  name: string;
  role: 'admin';
  createdAt: string;
}

export interface CmsData {
  version: 1;
  users: AdminUser[];
  content: Record<string, unknown>;
  /** Admin session families (refresh tokens live here, hashed). */
  sessions: StoredSession[];
}

/** A refresh-token session family, stored hashed. Defined here (not in
 *  sessions.ts) to avoid a circular import. */
export interface StoredSession {
  id: string;
  userId: string;
  /** sha256 hex of the CURRENT refresh token. */
  refreshHash: string;
  /** Recently rotated-out hashes — reuse of any of these revokes the family. */
  staleHashes: string[];
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
  revokedAt: string | null;
  userAgent: string;
}

export type ActiveStore = 'mongodb' | 'json';

interface StoreStatus {
  active: ActiveStore;
  configured: boolean;
  state: ReturnType<typeof mongoStatus>['state'];
  error: string | null;
}

let lastStatus: StoreStatus = { active: 'json', configured: false, state: 'unconfigured', error: null };

export function storeStatus(): StoreStatus {
  return lastStatus;
}

/* ── JSON fallback store (original implementation) ──────────────────────── */

let writeQueue: Promise<void> = Promise.resolve();

/** Isomorphic deep merge: seed fills any missing keys in the stored content. */
function deepMerge<T>(defaults: T, stored: unknown): T {
  if (Array.isArray(defaults)) return (Array.isArray(stored) ? stored : defaults) as T;
  if (defaults !== null && typeof defaults === 'object') {
    if (stored === null || typeof stored !== 'object' || Array.isArray(stored)) return defaults;
    const out: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
    for (const [key, value] of Object.entries(stored as Record<string, unknown>)) {
      if (key in out) out[key] = deepMerge(out[key], value);
      else out[key] = value;
    }
    return out as T;
  }
  return (stored === undefined ? defaults : stored) as T;
}

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function mergeWithSeed(parsed: Partial<CmsData> | null): CmsData {
  const seed = buildSeed();
  const storedUsers = parsed?.users;
  return {
    version: 1,
    users: Array.isArray(storedUsers) && storedUsers.length > 0 ? storedUsers : seed.users,
    content: deepMerge(seed.content, parsed?.content),
    sessions: Array.isArray(parsed?.sessions) ? parsed!.sessions : [],
  };
}

async function readJson(): Promise<CmsData> {
  try {
    const raw = await fs.readFile(DB_FILE, 'utf8');
    return mergeWithSeed(JSON.parse(raw) as Partial<CmsData>);
  } catch {
    return buildSeed(); // first run (or unreadable file)
  }
}

async function writeJson(data: CmsData): Promise<void> {
  await ensureDir();
  const tmp = `${DB_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmp, DB_FILE);
}

/* ── MongoDB store ──────────────────────────────────────────────────────── */

async function readMongo(): Promise<CmsData | null> {
  const db = await getDb().catch(() => null);
  if (!db) return null;

  const [userDocs, sectionDocs, sessionDocs] = await Promise.all([
    db.collection(COLLECTIONS.users).find({}).toArray(),
    db.collection(COLLECTIONS.sections).find({}).toArray(),
    db.collection(COLLECTIONS.sessions).find({}).toArray(),
  ]);

  const stored: Partial<CmsData> = {
    users: userDocs.map(({ _id: _ignored, ...rest }) => rest as AdminUser),
    content: Object.fromEntries(
      sectionDocs.map((doc) => [doc.key as string, doc.value]),
    ),
    sessions: sessionDocs.map(({ _id: _ignored, ...rest }) => rest as CmsData['sessions'][number]),
  };
  return mergeWithSeed(stored);
}

async function writeMongo(data: CmsData): Promise<boolean> {
  const db = await getDb().catch(() => null);
  if (!db) return false;

  const now = new Date().toISOString();
  await db
    .collection<{ _id: string; version: number; updatedAt: string }>(COLLECTIONS.meta)
    .updateOne({ _id: 'cms' }, { $set: { version: 1, updatedAt: now } }, { upsert: true });

  await db.collection(COLLECTIONS.users).deleteMany({});
  if (data.users.length > 0) {
    await db.collection(COLLECTIONS.users).insertMany(data.users);
  }

  await db.collection(COLLECTIONS.sessions).deleteMany({});
  if (data.sessions.length > 0) {
    await db.collection(COLLECTIONS.sessions).insertMany(
      data.sessions.map((session) => ({ ...session, _id: session.id as never })),
    );
  }

  const ops = Object.entries(data.content).map(([key, value]) => ({
    replaceOne: { filter: { key }, replacement: { key, value }, upsert: true },
  }));
  if (ops.length > 0) {
    await db.collection(COLLECTIONS.sections).bulkWrite(ops);
  }
  return true;
}

/* ── Public API (same interface as the JSON-only version) ───────────────── */

export async function readDb(): Promise<CmsData> {
  if (isMongoConfigured()) {
    try {
      const data = await readMongo();
      if (data) {
        lastStatus = { ...mongoStatus(), active: 'mongodb' };
        return data;
      }
    } catch {
      /* fall through to JSON */
    }
  }
  lastStatus = { ...mongoStatus(), active: 'json' };
  return readJson();
}

export async function writeDb(data: CmsData): Promise<void> {
  if (isMongoConfigured()) {
    try {
      const wrote = await writeMongo(data);
      if (wrote) {
        lastStatus = { ...mongoStatus(), active: 'mongodb' };
        // Mirror to the JSON file so the offline fallback stays fresh.
        await writeJson(data).catch(() => undefined);
        return;
      }
    } catch {
      /* fall through to JSON so writes never get lost */
    }
  }
  lastStatus = { ...mongoStatus(), active: 'json' };
  await writeJson(data);
}

/** Read-modify-write helper; the only way callers should mutate the db. */
export async function updateDb<T>(mutate: (data: CmsData) => T | Promise<T>): Promise<T> {
  return enqueue(async () => {
    const data = await readDb();
    const result = await mutate(data);
    await writeDb(data);
    return result;
  });
}

/** Serialize writes so concurrent requests never interleave read-modify-write. */
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const next = writeQueue.then(task, task);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}
