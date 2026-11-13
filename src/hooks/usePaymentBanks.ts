"use client";

import { useQuery } from "@tanstack/react-query";
import type { PaymentBank } from "@/models/payment-bank";
import { getAllPaymentBanks } from "@/services/payment-bank.service";

async function fetchPaymentBanks(): Promise<PaymentBank[]> {
  const res = await fetch("/api/payment-banks");
  if (!res.ok) {
    return getAllPaymentBanks();
  }
  const json = await res.json();
  return json.data || getAllPaymentBanks();
}

export function usePaymentBanks() {
  const query = useQuery({
    queryKey: ["paymentBanks"],
    queryFn: fetchPaymentBanks,
    staleTime: 60 * 60 * 1000,
    placeholderData: getAllPaymentBanks(),
  });

  return {
    paymentBanks: query.data || getAllPaymentBanks(),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
