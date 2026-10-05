import { MongoClient } from 'mongodb';

/**
 * MongoDB connection helper for the CMS store.
 * Reads MONGO_URL (or MONGODB_URI / MONGODB_URL aliases) from the environment,
 * caches the client on globalThis so hot-reload / serverless invocations reuse
 * one connection pool, and degrades gracefully when the server is unreachable.
 */

const uri =
  process.env.MONGO_URL || process.env.MONGODB_URI || process.env.MONGODB_URL || '';

export const isMongoConfigured = (): boolean => uri.trim().length > 0;

/** ms before a connection attempt gives up and we fall back to the JSON store */
const CONNECT_TIMEOUT_MS = 5000;

export const DB_NAME = process.env.MONGODB_DB || 'neoxis';

/** Collections used by the CMS. */
export const COLLECTIONS = {
  meta: 'cms_meta',
  users: 'cms_users',
  sections: 'cms_sections',
  sessions: 'cms_sessions',
  inquiries: 'cms_inquiries',
} as const;

interface MongoState {
  client: MongoClient | null;
  promise: Promise<MongoClient | null> | null;
  state: 'unconfigured' | 'connecting' | 'connected' | 'error';
  error: string | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __neoxisMongo: MongoState | undefined;
}

function getStore(): MongoState {
  if (!globalThis.__neoxisMongo) {
    globalThis.__neoxisMongo = {
      client: null,
      promise: null,
      state: uri.trim() ? 'connecting' : 'unconfigured',
      error: null,
    };
  }
  return globalThis.__neoxisMongo;
}

/**
 * Resolve a connected MongoClient, or null when unconfigured / unreachable.
 * Never throws — callers decide how to degrade (JSON fallback).
 */
export async function getMongo(): Promise<MongoClient | null> {
  const store = getStore();
  if (!isMongoConfigured()) {
    store.state = 'unconfigured';
    return null;
  }

  if (store.client) {
    store.state = 'connected';
    return store.client;
  }

  if (!store.promise) {
    store.promise = new MongoClient(uri.trim(), {
      serverSelectionTimeoutMS: CONNECT_TIMEOUT_MS,
      connectTimeoutMS: CONNECT_TIMEOUT_MS,
    })
      .connect()
      .then((client) => {
        store.client = client;
        store.state = 'connected';
        store.error = null;
        return client;
      })
      .catch((err: unknown) => {
        store.promise = null; // allow retrying on the next request
        store.state = 'error';
        store.error = err instanceof Error ? err.message : String(err);
        return null;
      });
  }

  return store.promise;
}

/** Connection status for the admin dashboard. */
export function mongoStatus(): { configured: boolean; state: MongoState['state']; error: string | null } {
  const store = getStore();
  return { configured: isMongoConfigured(), state: store.state, error: store.error };
}

/** Database handle or null when Mongo is not usable. */
export async function getDb() {
  const client = await getMongo();
  return client ? client.db(DB_NAME) : null;
}
