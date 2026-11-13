"use client";

import { useQuery } from "@tanstack/react-query";
import { getExchangeRateForCurrency } from "@/services/exchange-rate.service";
import type { ExchangeRateData } from "@/models/exchange-rate";

interface RatesApiResponse {
  source: string;
  base: string;
  lastUpdated: string;
  rates: Record<string, number>;
}

async function fetchRates(): Promise<RatesApiResponse> {
  const res = await fetch("/api/rates");
  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rates: ${res.statusText}`);
  }
  return res.json();
}

export function useExchangeRate(currencyCode: string): ExchangeRateData & {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const query = useQuery({
    queryKey: ["exchangeRate", "IDR", currencyCode?.toUpperCase()],
    queryFn: fetchRates,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    refetchOnWindowFocus: false,
    enabled: Boolean(currencyCode),
  });

  const ratesData = query.data?.rates || {};
  const lastUpdated = query.data?.lastUpdated || new Date().toUTCString();

  const rateInfo = getExchangeRateForCurrency(ratesData, currencyCode, lastUpdated);

  return {
    ...rateInfo,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as Error) || null,
  };
}
