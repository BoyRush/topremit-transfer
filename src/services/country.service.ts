import type { Country, RestCountryApiItem } from "@/models/country";

/**
 * Helper to generate country flag emoji from 2-letter ISO country code.
 */
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * High-quality curated default countries (fallback & initial seed).
 * Matches Topremit primary corridors.
 */
export const DEFAULT_COUNTRIES: Country[] = [
  {
    code: "US",
    name: "Amerika Serikat",
    localName: "United States",
    currency: { code: "USD", name: "US Dollar", symbol: "$" },
    flagEmoji: "🇺🇸",
    isPopular: true,
  },
  {
    code: "SG",
    name: "Singapura",
    localName: "Singapore",
    currency: { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    flagEmoji: "🇸🇬",
    isPopular: true,
  },
  {
    code: "MY",
    name: "Malaysia",
    localName: "Malaysia",
    currency: { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
    flagEmoji: "🇲🇾",
    isPopular: true,
  },
  {
    code: "AU",
    name: "Australia",
    localName: "Australia",
    currency: { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    flagEmoji: "🇦🇺",
    isPopular: true,
  },
  {
    code: "GB",
    name: "Inggris Raya",
    localName: "United Kingdom",
    currency: { code: "GBP", name: "British Pound", symbol: "£" },
    flagEmoji: "🇬🇧",
    isPopular: true,
  },
  {
    code: "JP",
    name: "Jepang",
    localName: "Japan",
    currency: { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    flagEmoji: "🇯🇵",
    isPopular: true,
  },
  {
    code: "DE",
    name: "Jerman",
    localName: "Germany",
    currency: { code: "EUR", name: "Euro", symbol: "€" },
    flagEmoji: "🇩🇪",
    isPopular: true,
  },
  {
    code: "SA",
    name: "Arab Saudi",
    localName: "Saudi Arabia",
    currency: { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
    flagEmoji: "🇸🇦",
    isPopular: true,
  },
  {
    code: "PH",
    name: "Filipina",
    localName: "Philippines",
    currency: { code: "PHP", name: "Philippine Peso", symbol: "₱" },
    flagEmoji: "🇵🇭",
    isPopular: true,
  },
  {
    code: "TH",
    name: "Thailand",
    localName: "Thailand",
    currency: { code: "THB", name: "Thai Baht", symbol: "฿" },
    flagEmoji: "🇹🇭",
    isPopular: true,
  },
  {
    code: "KR",
    name: "Korea Selatan",
    localName: "South Korea",
    currency: { code: "KRW", name: "South Korean Won", symbol: "₩" },
    flagEmoji: "🇰🇷",
    isPopular: false,
  },
  {
    code: "CA",
    name: "Kanada",
    localName: "Canada",
    currency: { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    flagEmoji: "🇨🇦",
    isPopular: false,
  },
  {
    code: "NZ",
    name: "Selandia Baru",
    localName: "New Zealand",
    currency: { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    flagEmoji: "🇳🇿",
    isPopular: false,
  },
  {
    code: "HK",
    name: "Hong Kong",
    localName: "Hong Kong",
    currency: { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    flagEmoji: "🇭🇰",
    isPopular: false,
  },
  {
    code: "IN",
    name: "India",
    localName: "India",
    currency: { code: "INR", name: "Indian Rupee", symbol: "₹" },
    flagEmoji: "🇮🇳",
    isPopular: false,
  },
  {
    code: "CN",
    name: "Tiongkok",
    localName: "China",
    currency: { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    flagEmoji: "🇨🇳",
    isPopular: false,
  },
  {
    code: "ZA",
    name: "Afrika Selatan",
    localName: "South Africa",
    currency: { code: "ZAR", name: "South African Rand", symbol: "R" },
    flagEmoji: "🇿🇦",
    isPopular: false,
  },
  {
    code: "AD",
    name: "Andorra",
    localName: "Andorra",
    currency: { code: "EUR", name: "Euro", symbol: "€" },
    flagEmoji: "🇦🇩",
    isPopular: false,
  },
  {
    code: "AT",
    name: "Austria",
    localName: "Austria",
    currency: { code: "EUR", name: "Euro", symbol: "€" },
    flagEmoji: "🇦🇹",
    isPopular: false,
  },
];

/**
 * Normalizes raw REST Countries API items into clean application Country domain models.
 */
export function normalizeRestCountries(items: RestCountryApiItem[]): Country[] {
  const result: Country[] = [];
  const seenCodes = new Set<string>();

  for (const item of items) {
    const code = item.cca2?.toUpperCase();
    if (!code || seenCodes.has(code) || code === "ID") continue; // Exclude Indonesia as destination

    const currencies = item.currencies;
    if (!currencies || Object.keys(currencies).length === 0) continue;

    // Pick primary currency
    const currencyCode = Object.keys(currencies)[0];
    const currencyInfo = currencies[currencyCode];
    if (!currencyCode || !currencyInfo) continue;

    seenCodes.add(code);
    result.push({
      code,
      name: item.name.common,
      localName: item.name.official,
      currency: {
        code: currencyCode,
        name: currencyInfo.name,
        symbol: currencyInfo.symbol || currencyCode,
      },
      flagUrl: item.flags?.png || item.flags?.svg,
      flagEmoji: getFlagEmoji(code),
      isPopular: ["US", "SG", "MY", "AU", "GB", "JP", "DE", "SA"].includes(code),
    });
  }

  // Sort popular first, then alphabetically
  return result.sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return a.name.localeCompare(b.name);
  });
}
