import type { Transaction } from "@/models/transaction";

// In-memory server-side mock storage
const globalTransactions: Transaction[] = [];

/**
 * Generate a unique realistic remittance tracking number: e.g. TRX-20261113-7X9B
 */
export function generateTransactionId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TRX-${dateStr}-${randomSuffix}`;
}

export function saveTransaction(tx: Transaction): Transaction {
  // Check if already exists
  const existingIdx = globalTransactions.findIndex((t) => t.id === tx.id);
  if (existingIdx >= 0) {
    globalTransactions[existingIdx] = tx;
  } else {
    globalTransactions.unshift(tx);
  }
  return tx;
}

export function getTransactionById(id: string): Transaction | undefined {
  return globalTransactions.find((t) => t.id === id);
}

export function getAllTransactions(): Transaction[] {
  return [...globalTransactions];
}

export function updateTransactionRating(
  id: string,
  rating: number,
  comment?: string
): Transaction | undefined {
  const tx = globalTransactions.find((t) => t.id === id);
  if (tx) {
    tx.rating = rating;
    if (comment !== undefined) {
      tx.ratingComment = comment;
    }
  }
  return tx;
}
