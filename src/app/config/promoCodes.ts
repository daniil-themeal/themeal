export const VALID_PROMO_CODES = ['MEAL10', 'WELCOME'] as const;

const VALID_PROMO_CODE_SET = new Set<string>(VALID_PROMO_CODES);

export function validatePromoCode(code: string): boolean {
  return VALID_PROMO_CODE_SET.has(code.trim().toUpperCase());
}
