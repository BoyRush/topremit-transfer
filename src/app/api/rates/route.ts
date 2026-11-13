import { NextResponse } from "next/server";
import { FALLBACK_IDR_RATES } from "@/services/exchange-rate.service";
import type { ExchangeRateApiResponse } from "@/models/exchange-rate";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    const response = await fetch("https://open.er-api.com/v6/latest/IDR", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      next: { revalidate: 600 }, // Cache 10 minutes
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = (await response.json()) as ExchangeRateApiResponse;
      if (data.result === "success" && data.rates) {
        return NextResponse.json({
          source: "open.er-api.com",
          base: "IDR",
          lastUpdated: data.time_last_update_utc,
          rates: data.rates,
        });
      }
    }
  } catch (error) {
    console.warn("Public exchange rate API unreachable, using fallback rates:", error);
  }

  // Graceful fallback to verified rate matrix
  return NextResponse.json({
    source: "fallback_rates",
    base: "IDR",
    lastUpdated: new Date().toUTCString(),
    rates: FALLBACK_IDR_RATES,
  });
}
