import { NextResponse } from "next/server";
import { getAllFeeConfigs, getFeeConfig } from "@/services/fee.service";
import type { TransferServiceType, TransferSpeedType } from "@/models/transfer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service") as TransferServiceType | null;
  const speed = searchParams.get("speed") as TransferSpeedType | null;

  if (service && speed) {
    const fee = getFeeConfig(service, speed);
    return NextResponse.json({ success: true, data: fee });
  }

  const allFees = getAllFeeConfigs();
  return NextResponse.json({ success: true, data: allFees });
}
