import { createClient } from 'redis';
import { DraftState } from './draftTypes';

export const DRAFT_KEY = 'formula-draft';

// In-memory fallback for when Redis is unavailable (e.g. local dev without Redis)
const memoryStore = new Map<string, string>();

export async function getRedisClient() {
  const client = createClient({ url: process.env.formula_REDIS_URL });
  await client.connect();
  return client;
}

export async function kvGet(key: string): Promise<string | null> {
  try {
    const client = await getRedisClient();
    const value = await client.get(key);
    await client.quit();
    return value;
  } catch {
    return memoryStore.get(key) ?? null;
  }
}

export async function kvSet(key: string, value: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.set(key, value);
    await client.quit();
  } catch {
    memoryStore.set(key, value);
  }
}

export async function kvDel(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(key);
    await client.quit();
  } catch {
    memoryStore.delete(key);
  }
}

const DEFAULT_STATE: DraftState = { picks: [], saved: false, startedAt: null };

export async function getDraftState(): Promise<DraftState> {
  const raw = await kvGet(DRAFT_KEY);
  return raw ? JSON.parse(raw) : DEFAULT_STATE;
}

export async function setDraftState(state: DraftState): Promise<void> {
  await kvSet(DRAFT_KEY, JSON.stringify(state));
}
