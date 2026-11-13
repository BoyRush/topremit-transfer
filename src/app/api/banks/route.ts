import { NextResponse } from "next/server";
import { getBanksForCountry, MOCK_DESTINATION_BANKS } from "@/services/bank.service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryCode = searchParams.get("country");

  if (countryCode) {
    const banks = getBanksForCountry(countryCode);
    return NextResponse.json({ success: true, count: banks.length, data: banks });
  }

  return NextResponse.json({
    success: true,
    count: MOCK_DESTINATION_BANKS.length,
    data: MOCK_DESTINATION_BANKS,
  });
}
