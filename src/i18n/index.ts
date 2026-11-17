import en, { type TranslationKey } from "./en";
import id from "./id";

export type Locale = "en" | "id";

const dictionaries: Record<Locale, typeof en> = { en, id };

/**
 * Translates a key into the given locale.
 * Supports simple `{placeholder}` interpolation.
 *
 * Example:
 *   t("review.promo_min_amount", "id", { min: "500,000" })
 *   → "Transfer minimum IDR 500,000 diperlukan untuk promo ini."
 */
export function t(
  key: TranslationKey,
  locale: Locale,
  vars?: Record<string, string | number>
): string {
  const dict = dictionaries[locale] ?? en;
  let str: string = dict[key] ?? en[key] ?? key;

  if (vars) {
    for (const [varName, value] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${varName}\\}`, "g"), String(value));
    }
  }

  return str;
}

export { type TranslationKey };
export { en, id };
