import { PaymentLink } from '../types';

export interface StoredPaymentLink extends PaymentLink {
  id: string;
  createdAt: number;
}

const store = new Map<string, StoredPaymentLink>();

function generateId(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function saveLink(data: PaymentLink): StoredPaymentLink {
  let id = generateId();
  while (store.has(id)) {
    id = generateId();
  }
  const entry: StoredPaymentLink = { ...data, id, createdAt: Date.now() };
  store.set(id, entry);
  return entry;
}

export function getLink(id: string): StoredPaymentLink | undefined {
  return store.get(id);
}
