"use client";

import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "@/models/transaction";

interface TransactionsApiResponse {
  success: boolean;
  count: number;
  data: Transaction[];
  message?: string;
}

async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch("/api/transactions");
  if (!res.ok) {
    throw new Error(`Failed to load transactions: ${res.statusText}`);
  }
  const json = (await res.json()) as TransactionsApiResponse;
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error(json.message || "Invalid transactions payload from server");
  }
  return json.data;
}

export function useTransactions() {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 10 * 1000, // 10 seconds fresh
    refetchOnWindowFocus: true,
  });

  return {
    transactions: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
