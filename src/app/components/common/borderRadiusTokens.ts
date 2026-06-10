export const BORDER_RADIUS_TOKENS = {
  2: '2px',
  4: '4px',
  8: '8px',
  12: '12px',
  20: '20px',
  16: '16px',
  24: '24px',
  32: '32px',
  full: '9999px',
} as const;

export type BorderRadiusTokenName = keyof typeof BORDER_RADIUS_TOKENS;
