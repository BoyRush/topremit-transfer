import type { CreateTransactionPayload, Transaction } from "@/models/transaction";

// Pre-seeded mock transactions for demonstration & history testing
const INITIAL_MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "TRX-20261113-9K2L",
    transactionReference: "TRX-20261113-9K2L",
    destinationCountry: { code: "GB", name: "Inggris Raya", flagEmoji: "🇬🇧" },
    destinationCurrency: "GBP",
    sendAmount: 5000000,
    receiveAmount: 250,
    exchangeRate: 0.00005,
    service: "BANK_TRANSFER",
    speed: "REGULAR",
    transferFee: 75000,
    totalPayment: 5075000,
    paymentBank: {
      id: "bca",
      code: "BCA",
      name: "BCA (Bank Central Asia)",
      accountNumber: "8001239847123",
      accountName: "PT TOPREMIT TRANSFER INDONESIA",
    },
    recipient: {
      bankCode: "BARCLAYS",
      bankName: "Barclays Bank UK",
      accountNumber: "20198273",
      fullName: "Oliver George Smith",
      transferPurpose: "EDUCATION",
      email: "oliver.smith@example.co.uk",
      note: "Accommodation fee",
    },
    status: "PENDING",
    createdAt: "2026-11-13T10:00:00.000Z",
    updatedAt: "2026-11-13T10:00:00.000Z",
  },
  {
    id: "TRX-20261110-8A1C",
    transactionReference: "TRX-20261110-8A1C",
    destinationCountry: { code: "SG", name: "Singapura", flagEmoji: "🇸🇬" },
    destinationCurrency: "SGD",
    sendAmount: 3600000,
    receiveAmount: 300,
    exchangeRate: 0.00008333,
    service: "BANK_TRANSFER",
    speed: "INSTANT",
    transferFee: 100000,
    totalPayment: 3700000,
    paymentBank: {
      id: "bca",
      code: "BCA",
      name: "BCA (Bank Central Asia)",
      accountNumber: "8001239847123",
      accountName: "PT TOPREMIT TRANSFER INDONESIA",
    },
    recipient: {
      bankCode: "DBS",
      bankName: "DBS Bank Singapore",
      accountNumber: "0239182391",
      fullName: "Tan Wei Ming",
      transferPurpose: "EDUCATION",
      email: "tan.wm@example.com",
      note: "Semester tuition allowance",
    },
    status: "COMPLETED",
    rating: 5,
    ratingComment: "Cepat sekali, uang sampai dalam hitungan menit!",
    createdAt: "2026-11-10T08:30:00.000Z",
    updatedAt: "2026-11-10T08:45:00.000Z",
  },
  {
    id: "TRX-20261108-4F9D",
    transactionReference: "TRX-20261108-4F9D",
    destinationCountry: { code: "MY", name: "Malaysia", flagEmoji: "🇲🇾" },
    destinationCurrency: "MYR",
    sendAmount: 1750000,
    receiveAmount: 500,
    exchangeRate: 0.00028571,
    service: "E_WALLET",
    speed: "REGULAR",
    transferFee: 35000,
    totalPayment: 1785000,
    paymentBank: {
      id: "mandiri",
      code: "MANDIRI",
      name: "Bank Mandiri",
      accountNumber: "8890123984123",
      accountName: "PT TOPREMIT TRANSFER INDONESIA",
    },
    recipient: {
      bankCode: "MAYBANK",
      bankName: "Malayan Banking Berhad (Maybank)",
      accountNumber: "512398124912",
      fullName: "Ahmad bin Razak",
      transferPurpose: "FAMILY_SUPPORT",
      note: "Uang belanja bulanan keluarga",
    },
    status: "COMPLETED",
    createdAt: "2026-11-08T14:15:00.000Z",
    updatedAt: "2026-11-09T10:00:00.000Z",
  },
  {
    id: "TRX-20261105-1X7K",
    transactionReference: "TRX-20261105-1X7K",
    destinationCountry: { code: "US", name: "Amerika Serikat", flagEmoji: "🇺🇸" },
    destinationCurrency: "USD",
    sendAmount: 16350000,
    receiveAmount: 1000,
    exchangeRate: 0.00006116,
    service: "BANK_TRANSFER",
    speed: "REGULAR",
    transferFee: 75000,
    totalPayment: 16425000,
    paymentBank: {
      id: "bca",
      code: "BCA",
      name: "BCA (Bank Central Asia)",
      accountNumber: "8001239847123",
      accountName: "PT TOPREMIT TRANSFER INDONESIA",
    },
    recipient: {
      bankCode: "CHASE",
      bankName: "JPMorgan Chase Bank",
      accountNumber: "9982310293",
      fullName: "Robert William Johnson",
      transferPurpose: "BUSINESS_PAYMENT",
      email: "robert.johnson@business.com",
      note: "Invoice INV-2026-004",
    },
    status: "COMPLETED",
    rating: 4,
    createdAt: "2026-11-05T09:00:00.000Z",
    updatedAt: "2026-11-07T16:00:00.000Z",
  },
];

// Attach mock storage to globalThis to survive Next.js module re-evaluations
interface GlobalWithTxStore {
  __TOPREMIT_TRANSACTIONS__?: Transaction[];
}

const globalStore = globalThis as unknown as GlobalWithTxStore;
if (!globalStore.__TOPREMIT_TRANSACTIONS__) {
  globalStore.__TOPREMIT_TRANSACTIONS__ = [...INITIAL_MOCK_TRANSACTIONS];
}

export function generateTransactionReference(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TRX-${dateStr}-${randomSuffix}`;
}

export function createTransaction(payload: CreateTransactionPayload): Transaction {
  const now = new Date().toISOString();
  const ref = generateTransactionReference();

  const tx: Transaction = {
    id: ref,
    transactionReference: ref,
    destinationCountry: payload.destinationCountry,
    destinationCurrency: payload.destinationCurrency,
    sendAmount: payload.sendAmount,
    receiveAmount: payload.receiveAmount,
    exchangeRate: payload.exchangeRate,
    service: payload.service,
    speed: payload.speed,
    transferFee: payload.transferFee,
    totalPayment: payload.totalPayment,
    paymentBank: payload.paymentBank,
    recipient: payload.recipient,
    status: "PROCESSING",
    createdAt: now,
    updatedAt: now,
  };

  globalStore.__TOPREMIT_TRANSACTIONS__?.unshift(tx);
  return tx;
}

export function getTransactionById(id: string): Transaction | undefined {
  return globalStore.__TOPREMIT_TRANSACTIONS__?.find(
    (t) =>
      t.id.toLowerCase() === id.toLowerCase() ||
      t.transactionReference.toLowerCase() === id.toLowerCase()
  );
}

export function getAllTransactions(): Transaction[] {
  return [...(globalStore.__TOPREMIT_TRANSACTIONS__ || [])];
}

export function submitRating(
  id: string,
  rating: number,
  comment?: string
): Transaction | undefined {
  const tx = getTransactionById(id);
  if (!tx) return undefined;

  tx.rating = rating;
  if (comment !== undefined) {
    tx.ratingComment = comment;
  }
  tx.updatedAt = new Date().toISOString();
  return tx;
}
