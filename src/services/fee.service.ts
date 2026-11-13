import type { FeeConfig, TransferServiceType, TransferSpeedType } from "@/models/transfer";

export const MOCK_TRANSFER_FEES: FeeConfig[] = [
  {
    serviceType: "BANK_TRANSFER",
    speed: "REGULAR",
    feeIdr: 75000,
    estimatedArrival: "3 hari kerja bank",
    description: "Kirim uang ke rekening bank penerima via jaringan perbankan lokal.",
  },
  {
    serviceType: "BANK_TRANSFER",
    speed: "INSTANT",
    feeIdr: 100000,
    estimatedArrival: "Tiba dalam 15-60 menit",
    description: "Pengiriman cepat langsung diproses secara instan ke rekening bank penerima.",
  },
  {
    serviceType: "E_WALLET",
    speed: "REGULAR",
    feeIdr: 35000,
    estimatedArrival: "1-2 hari kerja",
    description: "Kirim saldo ke dompet digital (e-wallet) resmi di negara tujuan.",
  },
  {
    serviceType: "E_WALLET",
    speed: "INSTANT",
    feeIdr: 50000,
    estimatedArrival: "Tiba dalam hitungan detik",
    description: "Pengiriman instan ke dompet digital penerima.",
  },
];

export function getFeeConfig(
  serviceType: TransferServiceType,
  speed: TransferSpeedType
): FeeConfig {
  const match = MOCK_TRANSFER_FEES.find(
    (item) => item.serviceType === serviceType && item.speed === speed
  );

  return (
    match || {
      serviceType,
      speed,
      feeIdr: 75000,
      estimatedArrival: "3 hari kerja bank",
      description: "Transfer perbankan internasional standar.",
    }
  );
}

export function getAllFeeConfigs(): FeeConfig[] {
  return MOCK_TRANSFER_FEES;
}
