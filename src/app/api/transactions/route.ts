import { NextResponse } from "next/server";
import {
  generateTransactionId,
  getAllTransactions,
  saveTransaction,
} from "@/services/transaction.service";
import type { Transaction } from "@/models/transaction";

export const dynamic = "force-dynamic";

export async function GET() {
  const transactions = getAllTransactions();
  return NextResponse.json({
    success: true,
    count: transactions.length,
    data: transactions,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<
      Transaction,
      "id" | "trackingNumber" | "createdAt" | "status"
    >;

    if (!body.recipient || !body.destinationCountry || !body.calculation || !body.paymentBank) {
      return NextResponse.json(
        { success: false, message: "Data transaksi tidak lengkap" },
        { status: 400 }
      );
    }

    const newId = generateTransactionId();
    const newTransaction: Transaction = {
      ...body,
      id: newId,
      trackingNumber: newId,
      createdAt: new Date().toISOString(),
      status: "PROCESSING",
    };

    saveTransaction(newTransaction);

    return NextResponse.json(
      {
        success: true,
        message: "Transaksi simulasi berhasil dibuat",
        data: newTransaction,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memproses transaksi simulasi",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
