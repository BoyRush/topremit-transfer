import type { PaymentBank } from "@/models/payment-bank";

export const MOCK_PAYMENT_BANKS: PaymentBank[] = [
  {
    id: "bca",
    code: "BCA",
    name: "BCA (Bank Central Asia)",
    accountNumber: "8001239847123",
    accountName: "PT TOPREMIT TRANSFER INDONESIA",
    instructions: "Transfer via ATM, KlikBCA, atau BCA mobile ke nomor Virtual Account di atas.",
    isPopular: true,
  },
  {
    id: "mandiri",
    code: "MANDIRI",
    name: "Bank Mandiri",
    accountNumber: "8890123984123",
    accountName: "PT TOPREMIT TRANSFER INDONESIA",
    instructions: "Pilih Pembayaran / Multipayment via Livin' by Mandiri atau ATM Mandiri.",
    isPopular: true,
  },
  {
    id: "bri",
    code: "BRI",
    name: "BRI (Bank Rakyat Indonesia)",
    accountNumber: "1289012398412",
    accountName: "PT TOPREMIT TRANSFER INDONESIA",
    instructions: "Transfer via BRImo (BRIVA) atau ATM BRI.",
    isPopular: true,
  },
  {
    id: "bni",
    code: "BNI",
    name: "BNI (Bank Negara Indonesia)",
    accountNumber: "9880123984123",
    accountName: "PT TOPREMIT TRANSFER INDONESIA",
    instructions: "Transfer via BNI Mobile Banking atau ATM BNI ke nomor Virtual Account.",
    isPopular: true,
  },
  {
    id: "cimb",
    code: "CIMB",
    name: "CIMB Niaga",
    accountNumber: "2289012398412",
    accountName: "PT TOPREMIT TRANSFER INDONESIA",
    instructions: "Transfer via OCTO Mobile atau OCTO Clicks.",
    isPopular: false,
  },
  {
    id: "permata",
    code: "PERMATA",
    name: "PermataBank",
    accountNumber: "7789012398412",
    accountName: "PT TOPREMIT TRANSFER INDONESIA",
    instructions: "Transfer via PermataMobile X atau ATM Permata.",
    isPopular: false,
  },
];

export function getAllPaymentBanks(): PaymentBank[] {
  return MOCK_PAYMENT_BANKS;
}

export function getPaymentBankById(id: string): PaymentBank | undefined {
  return MOCK_PAYMENT_BANKS.find((b) => b.id.toLowerCase() === id.toLowerCase() || b.code === id);
}
