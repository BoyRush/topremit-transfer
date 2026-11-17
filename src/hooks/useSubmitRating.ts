"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Transaction } from "@/models/transaction";

interface SubmitRatingParams {
  transactionId: string;
  rating: number;
  comment?: string;
}

interface RatingApiResponse {
  success: boolean;
  message?: string;
  data?: Transaction;
}

async function postTransactionRating({
  transactionId,
  rating,
  comment,
}: SubmitRatingParams): Promise<Transaction> {
  const res = await fetch(`/api/transactions/${encodeURIComponent(transactionId)}/rating`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, comment }),
  });

  const json = (await res.json()) as RatingApiResponse;
  if (!res.ok || !json.success || !json.data) {
    throw new Error(json.message || "Gagal menyimpan rating transaksi");
  }

  return json.data;
}

export function useSubmitRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTransactionRating,
    onSuccess: (data, variables) => {
      // Invalidate both the single transaction query and the list
      queryClient.setQueryData(["transaction", variables.transactionId], data);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
