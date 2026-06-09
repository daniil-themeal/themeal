export const FONT_SIZE_TOKENS = {
  12: '12px',
  14: '14px',
  16: '16px',
  20: '20px',
  25: '25px',
  32: '32px',
  40: '40px',
  48: '48px',
} as const;

export type FontSizeTokenName = keyof typeof FONT_SIZE_TOKENS;