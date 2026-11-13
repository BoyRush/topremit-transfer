export type TransactionStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface TransactionCountry {
  code: string;
  name: string;
  flagEmoji: string;
}

export interface TransactionRecipient {
  bankCode: string;
  bankName: string;
  accountNumber: string;
  fullName: string;
  transferPurpose: string;
  email?: string;
  note?: string;
}

export interface TransactionPaymentBank {
  id: string;
  code: string;
  name: string;
  accountNumber: string;
  accountName: string;
}

export interface Transaction {
  id: string;
  transactionReference: string;
  destinationCountry: TransactionCountry;
  destinationCurrency: string;
  sendAmount: number; // in IDR
  receiveAmount: number; // in destination currency
  exchangeRate: number; // 1 IDR = X FX
  service: "BANK_TRANSFER" | "E_WALLET";
  speed: "REGULAR" | "INSTANT";
  transferFee: number;
  totalPayment: number;
  paymentBank: TransactionPaymentBank;
  recipient: TransactionRecipient;
  status: TransactionStatus;
  rating?: number;
  ratingComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionPayload {
  destinationCountry: TransactionCountry;
  destinationCurrency: string;
  sendAmount: number;
  receiveAmount: number;
  exchangeRate: number;
  service: "BANK_TRANSFER" | "E_WALLET";
  speed: "REGULAR" | "INSTANT";
  transferFee: number;
  totalPayment: number;
  paymentBank: TransactionPaymentBank;
  recipient: TransactionRecipient;
}
