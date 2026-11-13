import type { Country } from "./country";
import type {
  RecipientDraft,
  TransferServiceType,
  TransferSpeedType,
} from "@/store/transfer-store";
import type { PaymentBank } from "./payment-bank";

export type TransactionStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export interface TransactionCalculation {
  sendAmountIdr: number;
  receiveAmountFx: number;
  exchangeRate: number;
  inverseRate: number;
  serviceType: TransferServiceType;
  speed: TransferSpeedType;
  transferFeeIdr: number;
  discountIdr: number;
  totalPaymentIdr: number;
  estimatedArrival: string;
}

export interface Transaction {
  id: string; // e.g. TRX-20261113-ABC123
  trackingNumber: string;
  createdAt: string;
  status: TransactionStatus;
  destinationCountry: Country;
  recipient: RecipientDraft;
  calculation: TransactionCalculation;
  paymentBank: PaymentBank;
  rating?: number;
  ratingComment?: string;
}
