import { NextResponse } from "next/server";
import { DEFAULT_COUNTRIES, normalizeRestCountries } from "@/services/country.service";
import type { RestCountryApiItem } from "@/models/country";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,currencies,flags",
      {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        next: { revalidate: 86400 }, // Cache 24 hours
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const rawData = (await response.json()) as RestCountryApiItem[];
      const countries = normalizeRestCountries(rawData);
      if (countries.length > 0) {
        return NextResponse.json({
          source: "remote_api",
          count: countries.length,
          data: countries,
        });
      }
    }
  } catch (error) {
    console.warn(
      "REST Countries API unreachable or timed out, returning fallback countries:",
      error
    );
  }

  // Graceful fallback to verified destination corridors
  return NextResponse.json({
    source: "fallback_fixture",
    count: DEFAULT_COUNTRIES.length,
    data: DEFAULT_COUNTRIES,
  });
}
