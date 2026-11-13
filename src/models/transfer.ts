export type TransferServiceType = "BANK_TRANSFER" | "E_WALLET";
export type TransferSpeedType = "REGULAR" | "INSTANT";

export interface FeeConfig {
  serviceType: TransferServiceType;
  speed: TransferSpeedType;
  feeIdr: number;
  estimatedArrival: string;
  description: string;
}

export interface CalculationResult {
  sendAmountIdr: number;
  receiveAmountFx: number;
  exchangeRate: number;
  inverseRate: number;
  transferFeeIdr: number;
  discountIdr: number;
  totalPaymentIdr: number;
  estimatedArrival: string;
}

export interface TransferLimits {
  minSendIdr: number;
  maxSendIdr: number;
  minReceiveFx: number;
  maxReceiveFx: number;
}
