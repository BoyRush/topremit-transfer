"use client";

import { useQuery } from "@tanstack/react-query";
import type { Country } from "@/models/country";
import { DEFAULT_COUNTRIES } from "@/services/country.service";

async function fetchCountries(): Promise<Country[]> {
  const res = await fetch("/api/countries");
  if (!res.ok) {
    throw new Error(`Failed to load countries: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data || DEFAULT_COUNTRIES;
}

export function useCountries() {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    placeholderData: DEFAULT_COUNTRIES,
  });

  return {
    countries: query.data ?? DEFAULT_COUNTRIES,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
