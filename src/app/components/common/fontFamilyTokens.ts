export const FONT_FAMILY_TOKENS = {
  quicksand: 'Quicksand',
  arial: 'Arial',
  sans: 'Quicksand, Arial, sans-serif',
  quicksandMedium: '"Quicksand:Medium", Arial, sans-serif',
  quicksandSemiBold: '"Quicksand:SemiBold", Arial, sans-serif',
  quicksandBold: '"Quicksand:Bold", Arial, sans-serif',
} as const;

export type FontFamilyTokenName = keyof typeof FONT_FAMILY_TOKENS;

/** Tailwind utility classes backed by @theme font tokens in theme.css */
export const FONT_FAMILY_CLASS_NAMES = {
  sans: 'font-sans',
  arial: 'font-arial',
  quicksandMedium: 'font-quicksand-medium',
  quicksandSemiBold: 'font-quicksand-semibold',
  quicksandBold: 'font-quicksand-bold',
} as const;

export function getFontFamilyStyle(
  token: FontFamilyTokenName = 'sans',
): { fontFamily: string } {
  return { fontFamily: FONT_FAMILY_TOKENS[token] };
}
