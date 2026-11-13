"use client";

import { useQuery } from "@tanstack/react-query";
import type { FeeConfig, TransferServiceType, TransferSpeedType } from "@/models/transfer";
import { getFeeConfig, MOCK_TRANSFER_FEES } from "@/services/fee.service";

async function fetchFees(): Promise<FeeConfig[]> {
  const res = await fetch("/api/fees");
  if (!res.ok) {
    throw new Error("Failed to fetch transfer fees");
  }
  const json = await res.json();
  return json.data || MOCK_TRANSFER_FEES;
}

export function useTransferFees(serviceType: TransferServiceType, speed: TransferSpeedType) {
  const query = useQuery({
    queryKey: ["fees"],
    queryFn: fetchFees,
    staleTime: 60 * 60 * 1000, // 1 hour
    placeholderData: MOCK_TRANSFER_FEES,
  });

  const allFees = query.data || MOCK_TRANSFER_FEES;
  const currentFee =
    allFees.find((f) => f.serviceType === serviceType && f.speed === speed) ||
    getFeeConfig(serviceType, speed);

  return {
    feeConfig: currentFee,
    allFees,
    isLoading: query.isLoading,
  };
}
