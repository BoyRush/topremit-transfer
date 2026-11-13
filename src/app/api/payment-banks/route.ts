import { NextResponse } from "next/server";
import { getAllPaymentBanks, getPaymentBankById } from "@/services/payment-bank.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const bank = getPaymentBankById(id);
    if (!bank) {
      return NextResponse.json(
        { success: false, message: "Bank tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: bank });
  }

  const allBanks = getAllPaymentBanks();
  return NextResponse.json({ success: true, count: allBanks.length, data: allBanks });
}
