"use client";

import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "@/models/transaction";

interface TransactionApiResponse {
  success: boolean;
  data?: Transaction;
  message?: string;
}

async function fetchTransactionById(id: string): Promise<Transaction> {
  const res = await fetch(`/api/transactions/${encodeURIComponent(id)}`);
  if (res.status === 404) {
    throw new Error("TRANSACTION_NOT_FOUND");
  }
  if (!res.ok) {
    throw new Error(`Failed to load transaction: ${res.statusText}`);
  }
  const json = (await res.json()) as TransactionApiResponse;
  if (!json.success || !json.data) {
    throw new Error(json.message || "Failed to load transaction details");
  }
  return json.data;
}

export function useTransactionDetails(id: string | undefined | null) {
  const query = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransactionById(id!),
    enabled: Boolean(id && id.trim().length > 0),
    staleTime: 15 * 1000,
  });

  const isNotFound =
    query.error instanceof Error && query.error.message === "TRANSACTION_NOT_FOUND";

  return {
    transaction: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isNotFound,
    error: query.error,
    refetch: query.refetch,
  };
}
