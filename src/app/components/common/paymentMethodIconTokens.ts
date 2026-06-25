import { COLOR_TOKENS } from './colorTokens';
import paymentMethodCard48 from './icons/payment-method-card-48x48.png';
import paymentMethodCardPrimary48 from './icons/payment-method-card-primary-48x48.png';
import paymentMethodMastercard48 from './icons/payment-method-mastercard-48x48.png';
import paymentMethodVisa48 from './icons/payment-method-visa-48x48.png';
import applePayColoredSvg from './icons/svg/payment-method/apple-pay-48x20-colored.svg?raw';
import applePayMonoSvg from './icons/svg/payment-method/apple-pay-48x20-mono.svg?raw';
import googlePayColoredSvg from './icons/svg/payment-method/google-pay-48x21-colored.svg?raw';
import googlePayMonoSvg from './icons/svg/payment-method/google-pay-48x21-mono.svg?raw';
import tabbyColoredSvg from './icons/svg/payment-method/tabby-48x20-colored.svg?raw';
import tabbyMonoSvg from './icons/svg/payment-method/tabby-48x20-mono.svg?raw';

export const PAYMENT_METHOD_ICON_IDS = [
  'card',
  'apple-pay',
  'google-pay',
  'tabby',
] as const;

export type PaymentMethodIconId = (typeof PAYMENT_METHOD_ICON_IDS)[number];

export const PAYMENT_METHOD_BRAND_ICON_IDS = ['visa', 'mastercard'] as const;

export type PaymentMethodBrandIconId =
  (typeof PAYMENT_METHOD_BRAND_ICON_IDS)[number];

export type PaymentMethodIconTokenId =
  | PaymentMethodIconId
  | PaymentMethodBrandIconId;

export const PAYMENT_METHOD_ICON_TILE_SIZE_PX = 48;
export const PAYMENT_METHOD_ICON_BRAND_BADGE_SIZE_PX = 32;
export const PAYMENT_METHOD_ICON_SLOT_SIZE_PX = 56;

export const PAYMENT_METHOD_CARD_ICON_VARIANTS = ['neutral', 'primary'] as const;

export type PaymentMethodCardIconVariant =
  (typeof PAYMENT_METHOD_CARD_ICON_VARIANTS)[number];

/** Neutral fill/stripe shades and their primary counterparts at the same steps. */
export const PAYMENT_METHOD_CARD_ICON_SHADE_MAP = {
  neutral: {
    fill: COLOR_TOKENS.neutral[100],
    stripe: COLOR_TOKENS.neutral[300],
  },
  primary: {
    fill: COLOR_TOKENS.primary[100],
    stripe: COLOR_TOKENS.primary[300],
  },
} as const satisfies Record<
  PaymentMethodCardIconVariant,
  { fill: string; stripe: string }
>;

export const PAYMENT_METHOD_CARD_ICON_FILE_NAMES: Record<
  PaymentMethodCardIconVariant,
  string
> = {
  neutral: 'payment-method-card-48x48.png',
  primary: 'payment-method-card-primary-48x48.png',
};

export const PAYMENT_METHOD_CARD_ICON_ASSETS: Record<
  PaymentMethodCardIconVariant,
  string
> = {
  neutral: paymentMethodCard48,
  primary: paymentMethodCardPrimary48,
};

export const PAYMENT_METHOD_ICON_LABELS: Record<PaymentMethodIconTokenId, string> = {
  card: 'Debit/Credit Card',
  'apple-pay': 'Apple Pay',
  'google-pay': 'Google Pay',
  tabby: 'Tabby',
  visa: 'Visa',
  mastercard: 'Mastercard',
};

export const PAYMENT_METHOD_ICON_FILE_NAMES: Record<
  PaymentMethodIconTokenId,
  string
> = {
  card: 'payment-method-card-48x48.png',
  'apple-pay': 'svg/payment-method/apple-pay-48x20-colored.svg',
  'google-pay': 'svg/payment-method/google-pay-48x21-colored.svg',
  tabby: 'svg/payment-method/tabby-48x20-colored.svg',
  visa: 'payment-method-visa-48x48.png',
  mastercard: 'payment-method-mastercard-48x48.png',
};

/**
 * Raster-only assets that PaymentMethodIconTile still renders via <img>.
 * Apple Pay / Google Pay / Tabby live as raw SVG strings in
 * {@link PAYMENT_METHOD_SVG_ASSETS} and are rendered via PaymentBrandLogo.
 */
export const PAYMENT_METHOD_RASTER_ASSETS: Record<
  Extract<PaymentMethodIconTokenId, 'card' | 'visa' | 'mastercard'>,
  string
> = {
  card: paymentMethodCard48,
  visa: paymentMethodVisa48,
  mastercard: paymentMethodMastercard48,
};

export function getPaymentMethodRasterAsset(
  id: Extract<PaymentMethodIconTokenId, 'card' | 'visa' | 'mastercard'>,
) {
  return PAYMENT_METHOD_RASTER_ASSETS[id];
}

export const PAYMENT_METHOD_SVG_VARIANTS = ['colored', 'mono'] as const;

export type PaymentMethodSvgVariant =
  (typeof PAYMENT_METHOD_SVG_VARIANTS)[number];

export const PAYMENT_METHOD_SVG_IDS = [
  'apple-pay',
  'google-pay',
  'tabby',
] as const;

export type PaymentMethodSvgId = (typeof PAYMENT_METHOD_SVG_IDS)[number];

/**
 * Native artwork dimensions for each SVG payment-method logo. Used by
 * PaymentBrandLogo to preserve aspect ratio when scaled to a target height.
 */
export const PAYMENT_METHOD_SVG_NATIVE_SIZE: Record<
  PaymentMethodSvgId,
  { width: number; height: number }
> = {
  'apple-pay': { width: 48, height: 20 },
  'google-pay': { width: 48, height: 21 },
  tabby: { width: 48, height: 20 },
};

export const PAYMENT_METHOD_SVG_ASSETS: Record<
  PaymentMethodSvgId,
  Record<PaymentMethodSvgVariant, string>
> = {
  'apple-pay': { colored: applePayColoredSvg, mono: applePayMonoSvg },
  'google-pay': { colored: googlePayColoredSvg, mono: googlePayMonoSvg },
  tabby: { colored: tabbyColoredSvg, mono: tabbyMonoSvg },
};

export function getPaymentMethodSvgAsset(
  id: PaymentMethodSvgId,
  variant: PaymentMethodSvgVariant = 'colored',
) {
  return PAYMENT_METHOD_SVG_ASSETS[id][variant];
}

export function getPaymentMethodCardIconAsset(
  variant: PaymentMethodCardIconVariant = 'neutral',
) {
  return PAYMENT_METHOD_CARD_ICON_ASSETS[variant];
}

export function getPaymentMethodIconSizeClassName(
  size: 'tile' | 'brand-badge' = 'tile',
) {
  return size === 'brand-badge'
    ? `size-[${PAYMENT_METHOD_ICON_BRAND_BADGE_SIZE_PX}px]`
    : `size-[${PAYMENT_METHOD_ICON_TILE_SIZE_PX}px]`;
}
