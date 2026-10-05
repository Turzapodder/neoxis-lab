import { COLLECTIONS, getDb, isMongoConfigured } from './mongodb';
import { readDb, updateDb, type Inquiry } from './db';

export type { Inquiry };

export interface InquiryInput {
  name: string;
  email: string;
  projectTypes?: string[];
  budget?: string | null;
  message: string;
  source?: 'contact_section' | 'connect_modal';
}

export interface InquiryStats {
  total: number;
  newCount: number;
  contactedCount: number;
  scheduledCount: number;
  closedCount: number;
}

/** Generate a collision-resistant inquiry identifier. */
function generateId(): string {
  return `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Retrieve all inquiries sorted by creation date descending. */
export async function getInquiries(): Promise<Inquiry[]> {
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const docs = await db
          .collection(COLLECTIONS.inquiries)
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        return docs.map(({ _id, ...rest }) => ({
          ...(rest as Inquiry),
          id: (rest.id as string) || String(_id),
        }));
      }
    } catch (err) {
      console.error('[inquiries] MongoDB read failed, falling back to JSON store:', err);
    }
  }

  const data = await readDb();
  const list = Array.isArray(data.inquiries) ? [...data.inquiries] : [];
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Retrieve a single inquiry by its ID. */
export async function getInquiryById(id: string): Promise<Inquiry | null> {
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const doc = await db.collection(COLLECTIONS.inquiries).findOne({
          $or: [{ id }, { _id: id as never }],
        });
        if (doc) {
          const { _id, ...rest } = doc;
          return { ...(rest as Inquiry), id: (rest.id as string) || String(_id) };
        }
      }
    } catch (err) {
      console.error('[inquiries] MongoDB findOne failed:', err);
    }
  }

  const data = await readDb();
  return (data.inquiries || []).find((inq) => inq.id === id) || null;
}

/** Create and persist a new client inquiry. */
export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  const now = new Date().toISOString();
  const inquiry: Inquiry = {
    id: generateId(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    projectTypes: Array.isArray(input.projectTypes) ? input.projectTypes : [],
    budget: input.budget || null,
    message: input.message.trim(),
    source: input.source || 'contact_section',
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };

  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        await db.collection(COLLECTIONS.inquiries).insertOne({
          ...inquiry,
          _id: inquiry.id as never,
        });

        // Mirror to JSON store for offline consistency without awaiting
        void updateDb((data) => {
          if (!data.inquiries) data.inquiries = [];
          data.inquiries.unshift(inquiry);
        }).catch(() => undefined);

        return inquiry;
      }
    } catch (err) {
      console.error('[inquiries] MongoDB insert failed, saving to JSON store:', err);
    }
  }

  return await updateDb((data) => {
    if (!data.inquiries) data.inquiries = [];
    data.inquiries.unshift(inquiry);
    return inquiry;
  });
}

/** Update an inquiry's status, notes, or scheduled meeting details. */
export async function updateInquiry(
  id: string,
  patch: Partial<Pick<Inquiry, 'status' | 'notes' | 'meetingScheduledAt' | 'meetingLink'>>,
): Promise<Inquiry | null> {
  const updates: Partial<Inquiry> = {
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        await db.collection(COLLECTIONS.inquiries).updateOne(
          { $or: [{ id }, { _id: id as never }] },
          { $set: updates },
        );

        // Mirror to JSON
        void updateDb((data) => {
          if (data.inquiries) {
            const index = data.inquiries.findIndex((i) => i.id === id);
            if (index !== -1) {
              data.inquiries[index] = { ...data.inquiries[index], ...updates };
            }
          }
        }).catch(() => undefined);

        return await getInquiryById(id);
      }
    } catch (err) {
      console.error('[inquiries] MongoDB update failed:', err);
    }
  }

  return await updateDb((data) => {
    if (!data.inquiries) data.inquiries = [];
    const index = data.inquiries.findIndex((i) => i.id === id);
    if (index === -1) return null;
    data.inquiries[index] = { ...data.inquiries[index], ...updates };
    return data.inquiries[index];
  });
}

/** Permanently delete an inquiry. */
export async function deleteInquiry(id: string): Promise<boolean> {
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const result = await db.collection(COLLECTIONS.inquiries).deleteOne({
          $or: [{ id }, { _id: id as never }],
        });

        void updateDb((data) => {
          if (data.inquiries) {
            data.inquiries = data.inquiries.filter((i) => i.id !== id);
          }
        }).catch(() => undefined);

        return result.deletedCount > 0;
      }
    } catch (err) {
      console.error('[inquiries] MongoDB delete failed:', err);
    }
  }

  return await updateDb((data) => {
    if (!data.inquiries) return false;
    const initial = data.inquiries.length;
    data.inquiries = data.inquiries.filter((i) => i.id !== id);
    return data.inquiries.length < initial;
  });
}

/** Summary statistics for dashboard cards and navigation badges. */
export async function getInquiryStats(): Promise<InquiryStats> {
  const inquiries = await getInquiries();
  return {
    total: inquiries.length,
    newCount: inquiries.filter((i) => i.status === 'new').length,
    contactedCount: inquiries.filter((i) => i.status === 'contacted').length,
    scheduledCount: inquiries.filter((i) => i.status === 'scheduled').length,
    closedCount: inquiries.filter((i) => i.status === 'closed').length,
  };
}
