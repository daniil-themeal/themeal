import { COLOR_TOKENS } from './colorTokens';
import paymentMethodApplePay48 from './icons/payment-method-apple-pay-48x48.png';
import paymentMethodCard48 from './icons/payment-method-card-48x48.png';
import paymentMethodCardPrimary48 from './icons/payment-method-card-primary-48x48.png';
import paymentMethodGooglePay48 from './icons/payment-method-google-pay-48x48.png';
import paymentMethodMastercard48 from './icons/payment-method-mastercard-48x48.png';
import paymentMethodTabby48 from './icons/payment-method-tabby-48x48.png';
import paymentMethodVisa48 from './icons/payment-method-visa-48x48.png';

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
  'apple-pay': 'payment-method-apple-pay-48x48.png',
  'google-pay': 'payment-method-google-pay-48x48.png',
  tabby: 'payment-method-tabby-48x48.png',
  visa: 'payment-method-visa-48x48.png',
  mastercard: 'payment-method-mastercard-48x48.png',
};

export const PAYMENT_METHOD_ICON_ASSETS: Record<PaymentMethodIconTokenId, string> =
  {
    card: paymentMethodCard48,
    'apple-pay': paymentMethodApplePay48,
    'google-pay': paymentMethodGooglePay48,
    tabby: paymentMethodTabby48,
    visa: paymentMethodVisa48,
    mastercard: paymentMethodMastercard48,
  };

export function getPaymentMethodIconAsset(id: PaymentMethodIconTokenId) {
  return PAYMENT_METHOD_ICON_ASSETS[id];
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
