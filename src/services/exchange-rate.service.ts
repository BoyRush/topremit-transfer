import type { ExchangeRateData } from "@/models/exchange-rate";

/**
 * Curated fallback baseline rates against 1 IDR.
 * Used when network is offline or API fails.
 */
export const FALLBACK_IDR_RATES: Record<string, number> = {
  USD: 0.00006116, // 1 USD ≈ 16,350 IDR
  SGD: 0.00008333, // 1 SGD ≈ 12,000 IDR
  MYR: 0.00028571, // 1 MYR ≈ 3,500 IDR
  AUD: 0.00009524, // 1 AUD ≈ 10,500 IDR
  GBP: 0.00004831, // 1 GBP ≈ 20,700 IDR
  EUR: 0.00005714, // 1 EUR ≈ 17,500 IDR
  JPY: 0.00952381, // 1 JPY ≈ 105 IDR
  SAR: 0.00022936, // 1 SAR ≈ 4,360 IDR
  PHP: 0.00357143, // 1 PHP ≈ 280 IDR
  THB: 0.00222222, // 1 THB ≈ 450 IDR
  KRW: 0.08695652, // 1 KRW ≈ 11.5 IDR
  CAD: 0.00008696, // 1 CAD ≈ 11,500 IDR
  NZD: 0.00010526, // 1 NZD ≈ 9,500 IDR
  HKD: 0.00047619, // 1 HKD ≈ 2,100 IDR
  INR: 0.00526316, // 1 INR ≈ 190 IDR
  CNY: 0.00044444, // 1 CNY ≈ 2,250 IDR
  ZAR: 0.00111111, // 1 ZAR ≈ 900 IDR
};

/**
 * Fetches latest exchange rates against base currency IDR.
 */
export async function fetchIdrExchangeRates(): Promise<Record<string, number>> {
  try {
    const res = await fetch("/api/rates");
    if (!res.ok) {
      throw new Error(`Rates API responded with status ${res.status}`);
    }
    const data = await res.json();
    return data.rates || FALLBACK_IDR_RATES;
  } catch (err) {
    console.warn("Failed to fetch live exchange rates, using fallback rates:", err);
    return FALLBACK_IDR_RATES;
  }
}

/**
 * Normalizes exchange rate data for a specific currency pair (IDR -> targetCurrency).
 */
export function getExchangeRateForCurrency(
  rates: Record<string, number>,
  targetCurrency: string,
  lastUpdatedDate = new Date().toISOString()
): ExchangeRateData {
  const code = targetCurrency.toUpperCase();
  const rate = rates[code] || FALLBACK_IDR_RATES[code] || 0;
  const isAvailable = rate > 0;
  const inverseRate = isAvailable ? 1 / rate : 0;

  return {
    baseCurrency: "IDR",
    targetCurrency: code,
    rate,
    inverseRate,
    lastUpdated: lastUpdatedDate,
    isAvailable,
  };
}
