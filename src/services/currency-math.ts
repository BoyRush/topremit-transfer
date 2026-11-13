/**
 * Currency and financial mathematical utility functions.
 * Designed to prevent floating-point anomalies and ensure consistent rounding.
 */

/**
 * Currency codes that typically do not use fractional sub-units (cents).
 */
const ZERO_DECIMAL_CURRENCIES = new Set(["JPY", "KRW", "VND", "IDR", "CLP", "PYG", "RWF"]);

/**
 * Get standard decimal places for a currency code.
 */
export function getCurrencyDecimalPlaces(currencyCode: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currencyCode.toUpperCase()) ? 0 : 2;
}

/**
 * Parses user input string into a clean numeric string with at most one decimal point.
 */
export function sanitizeCurrencyInput(input: string, maxDecimals = 2): string {
  // Remove all characters except digits and decimal point
  let cleaned = input.replace(/[^0-9.]/g, "");

  // Ensure only the first decimal point is kept
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  // Enforce max decimal places
  if (parts.length === 2 && maxDecimals >= 0) {
    cleaned = parts[0] + (maxDecimals > 0 ? "." + parts[1].slice(0, maxDecimals) : "");
  }

  return cleaned;
}

/**
 * Parses a formatted string (e.g. "1,000,000.50") into a raw JavaScript number.
 */
export function parseFormattedNumber(input: string): number {
  if (!input || input.trim() === "") return 0;
  const sanitized = input.replace(/,/g, "").trim();
  const parsed = parseFloat(sanitized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats a numeric value into a display string with thousands separators.
 * Preserves trailing decimal during active typing if string is passed.
 */
export function formatCurrencyDisplay(
  value: number | string,
  currencyCode: string,
  isTyping = false
): string {
  if (value === "" || value === null || value === undefined) return "";

  if (typeof value === "string") {
    // If the user just typed "100." or "0.", do not strip the decimal point while typing
    if (isTyping && (value.endsWith(".") || value.endsWith(".0"))) {
      const parts = value.split(".");
      const intPart = parseFormattedNumber(parts[0]).toLocaleString("en-US");
      return `${intPart}.${parts[1] ?? ""}`;
    }
  }

  const numericValue = typeof value === "number" ? value : parseFormattedNumber(value);
  const decimals = getCurrencyDecimalPlaces(currencyCode);

  return numericValue.toLocaleString("en-US", {
    minimumFractionDigits: isTyping ? 0 : decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Converts IDR to destination currency:
 * Receive Amount = Send Amount (IDR) * Exchange Rate
 */
export function convertIdrToFx(sendAmountIdr: number, rate: number, currencyCode: string): number {
  if (sendAmountIdr <= 0 || rate <= 0) return 0;
  const decimals = getCurrencyDecimalPlaces(currencyCode);
  const factor = Math.pow(10, decimals);
  const rawFx = sendAmountIdr * rate;
  return Math.round(rawFx * factor) / factor;
}

/**
 * Converts destination currency to IDR:
 * Send Amount (IDR) = Receive Amount (FX) / Exchange Rate
 * Rounded to nearest integer IDR.
 */
export function convertFxToIdr(receiveAmountFx: number, rate: number): number {
  if (receiveAmountFx <= 0 || rate <= 0) return 0;
  const rawIdr = receiveAmountFx / rate;
  return Math.round(rawIdr);
}

/**
 * Calculates total payment:
 * Total = Send Amount (IDR) + Transfer Fee (IDR) - Discount (IDR)
 */
export function calculateTotalPayment(
  sendAmountIdr: number,
  feeIdr: number,
  discountIdr = 0
): number {
  return Math.max(0, Math.round(sendAmountIdr + feeIdr - discountIdr));
}

/**
 * Masks bank account number for privacy and security.
 * e.g. "0192837482" -> "0192 •••• 7482"
 * e.g. "12345" -> "12••5"
 */
export function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber) return "-";
  const trimmed = accountNumber.trim();
  if (trimmed.length <= 4) return trimmed;
  if (trimmed.length <= 7) {
    return trimmed.slice(0, 2) + "•••" + trimmed.slice(-2);
  }
  const prefix = trimmed.slice(0, 4);
  const suffix = trimmed.slice(-4);
  return `${prefix} •••• ${suffix}`;
}
