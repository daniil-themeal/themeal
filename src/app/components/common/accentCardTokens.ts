import { COLOR_TOKENS } from './colorTokens';

/** Landing `--green` (not yet in COLOR_TOKENS). */
const LANDING_GREEN = '#5BAE27';

export type AccentCardVariant = 'brand' | 'green' | 'plum';

export type AccentCardVariantStyle = {
  background: string;
  boxShadow: string;
  labelColor: string;
  /** Matches landing #how step labels — 0.7 across brand/green/plum. */
  labelOpacity: number;
  valueColor: string;
};

/** Neutral tile shadow — landing `--shadow-why-cream` / quiz money metric. */
export const ACCENT_CARD_CREAM_SHADOW =
  '0 2px 4px rgba(42,34,48,.06), 0 8px 24px rgba(42,34,48,.08)';

/** Shared accent card palette — landing #how section + quiz result metrics. */
export const ACCENT_CARD_VARIANTS: Record<AccentCardVariant, AccentCardVariantStyle> = {
  brand: {
    background: '#FDF3FF',
    boxShadow: '0 2px 4px rgba(154,56,239,.08), 0 8px 24px rgba(154,56,239,.10)',
    labelColor: COLOR_TOKENS.primary[500],
    labelOpacity: 0.7,
    valueColor: COLOR_TOKENS.primary[700],
  },
  green: {
    background: '#F6FBEF',
    boxShadow: '0 2px 4px rgba(91,174,39,.08), 0 8px 24px rgba(91,174,39,.10)',
    labelColor: LANDING_GREEN,
    labelOpacity: 0.7,
    valueColor: COLOR_TOKENS.success[900],
  },
  plum: {
    background: 'rgba(245, 247, 255, 1)',
    boxShadow: '0 2px 4px rgba(65,24,100,.08), 0 8px 24px rgba(65,24,100,.10)',
    labelColor: COLOR_TOKENS.info[500],
    labelOpacity: 0.7,
    valueColor: COLOR_TOKENS.cream[900],
  },
};

/** Display order for landing #how cards: brand → green → plum. */
export const ACCENT_CARD_VARIANT_ORDER: AccentCardVariant[] = ['brand', 'green', 'plum'];
