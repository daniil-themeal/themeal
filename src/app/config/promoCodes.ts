export const VALID_PROMO_CODES = ['MEAL10', 'WELCOME'] as const;

export type PromoCode = (typeof VALID_PROMO_CODES)[number];

const VALID_PROMO_CODE_SET = new Set<string>(VALID_PROMO_CODES);

/** Discount amount in AED per promo code (stub until API). */
export const PROMO_CODE_DISCOUNTS: Record<PromoCode, number> = {
  MEAL10: 50,
  WELCOME: 50,
};

export function validatePromoCode(code: string): boolean {
  return VALID_PROMO_CODE_SET.has(code.trim().toUpperCase());
}

export function getPromoCodeDiscount(code: string): number | null {
  const normalized = code.trim().toUpperCase();

  if (!validatePromoCode(normalized)) return null;

  return PROMO_CODE_DISCOUNTS[normalized as PromoCode] ?? null;
}
