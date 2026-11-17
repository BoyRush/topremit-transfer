/**
 * Promo Code Service
 *
 * All promo validation logic is centralised here.
 * Components call validatePromoCode() — no business logic leaks into UI.
 *
 * To add a new promo code, append an entry to PROMO_CONFIGS.
 */

export type PromoDiscountType = "PERCENTAGE" | "FIXED_IDR";

export interface PromoConfig {
  code: string;
  discountType: PromoDiscountType;
  /** For PERCENTAGE: a number 0–100. For FIXED_IDR: amount in IDR. */
  discountValue: number;
  /** Minimum send amount in IDR to be eligible. 0 = always eligible. */
  minSendAmountIdr: number;
  /** Human-readable description of the discount (language-independent template). */
  descriptionEn: string;
  descriptionId: string;
  /** Whether the promo is currently active. */
  active: boolean;
}

export interface PromoValidationResult {
  valid: boolean;
  /** Computed IDR discount amount – always >= 0. */
  discountIdr: number;
  config?: PromoConfig;
  /** Error key – looked up in translation dict by the calling component. */
  errorKey?: "INVALID_CODE" | "INACTIVE_CODE" | "MIN_AMOUNT_NOT_MET";
  /** Used to format error messages that need dynamic values. */
  errorMeta?: Record<string, string | number>;
}

// ---------------------------------------------------------------------------
// Promo registry
// ---------------------------------------------------------------------------
const PROMO_CONFIGS: PromoConfig[] = [
  {
    code: "WELCOME10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    minSendAmountIdr: 0,
    descriptionEn: "10% off the transfer fee",
    descriptionId: "Diskon 10% dari biaya transfer",
    active: true,
  },
  {
    code: "TRANSFER50",
    discountType: "FIXED_IDR",
    discountValue: 50000,
    minSendAmountIdr: 500000,
    descriptionEn: "IDR 50,000 off the transfer fee",
    descriptionId: "Potongan Rp 50.000 dari biaya transfer",
    active: true,
  },
  {
    code: "TOPREMITHEMAT",
    discountType: "FIXED_IDR",
    discountValue: 15000,
    minSendAmountIdr: 0,
    descriptionEn: "IDR 15,000 off the transfer fee",
    descriptionId: "Potongan Rp 15.000 dari biaya transfer",
    active: true,
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Validates a promo code against the registry.
 *
 * @param code            - Raw promo code string entered by user (case-insensitive).
 * @param sendAmountIdr   - Current send amount in IDR.
 * @param transferFeeIdr  - Current transfer fee in IDR (discount cannot exceed this).
 */
export function validatePromoCode(
  code: string,
  sendAmountIdr: number,
  transferFeeIdr: number
): PromoValidationResult {
  const normalised = code.trim().toUpperCase();
  const config = PROMO_CONFIGS.find((p) => p.code === normalised);

  if (!config) {
    return { valid: false, discountIdr: 0, errorKey: "INVALID_CODE" };
  }

  if (!config.active) {
    return { valid: false, discountIdr: 0, errorKey: "INACTIVE_CODE" };
  }

  if (sendAmountIdr < config.minSendAmountIdr) {
    return {
      valid: false,
      discountIdr: 0,
      errorKey: "MIN_AMOUNT_NOT_MET",
      errorMeta: { min: config.minSendAmountIdr },
    };
  }

  let discountIdr = 0;
  if (config.discountType === "PERCENTAGE") {
    discountIdr = Math.round((transferFeeIdr * config.discountValue) / 100);
  } else {
    discountIdr = config.discountValue;
  }

  // Clamp: discount can't exceed the fee itself, and can't be negative.
  discountIdr = Math.max(0, Math.min(discountIdr, transferFeeIdr));

  return { valid: true, discountIdr, config };
}

export function getPromoConfig(code: string): PromoConfig | undefined {
  return PROMO_CONFIGS.find((p) => p.code === code.trim().toUpperCase());
}
