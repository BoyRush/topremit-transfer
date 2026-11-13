"use client";

import { useQuery } from "@tanstack/react-query";
import type { DestinationBank } from "@/models/bank";
import { getBanksForCountry } from "@/services/bank.service";

async function fetchDestinationBanks(countryCode: string): Promise<DestinationBank[]> {
  const res = await fetch(`/api/banks?country=${countryCode}`);
  if (!res.ok) {
    return getBanksForCountry(countryCode);
  }
  const json = await res.json();
  return json.data || getBanksForCountry(countryCode);
}

export function useDestinationBanks(countryCode: string) {
  const query = useQuery({
    queryKey: ["destinationBanks", countryCode?.toUpperCase()],
    queryFn: () => fetchDestinationBanks(countryCode),
    staleTime: 60 * 60 * 1000, // 1 hour cache
    enabled: Boolean(countryCode),
    placeholderData: getBanksForCountry(countryCode || "US"),
  });

  return {
    banks: query.data || getBanksForCountry(countryCode || "US"),
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
