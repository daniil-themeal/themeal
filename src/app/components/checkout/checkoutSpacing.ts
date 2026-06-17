function checkoutFontSizeClamp(
  minPx: number,
  maxPx: number,
  viewportRangePx = 448,
  viewportMin = '20rem',
) {
  const delta = maxPx - minPx;

  return `clamp(${minPx}px, calc(${minPx}px + (100vw - ${viewportMin}) * ${delta} / ${viewportRangePx}), ${maxPx}px)`;
}

export const CHECKOUT_CARD_PADDING_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 12 / 448), 32px)';

export const CHECKOUT_SECTION_GAP_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 24px)';

export const CHECKOUT_PROMO_ACTIVATE_BUTTON_WIDTH_CLAMP =
  'clamp(140px, calc(140px + (100vw - 25rem) * 20 / 448), 160px)';

export const CHECKOUT_HEADER_TO_CARD_GAP_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 12 / 448), 36px)';

export const CHECKOUT_HEADER_TO_CARD_GAP_MD_CLAMP =
  'clamp(32px, calc(32px + (100vw - 48rem) * 16 / 448), 48px)';

export const CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 32 / 448), 56px)';

export const CHECKOUT_FONT_CLAMP_12_14 = checkoutFontSizeClamp(12, 14);
export const CHECKOUT_FONT_CLAMP_14_16 = checkoutFontSizeClamp(14, 16);
export const CHECKOUT_FONT_CLAMP_16_20 = checkoutFontSizeClamp(16, 20);
export const CHECKOUT_FONT_CLAMP_18_20 = checkoutFontSizeClamp(18, 20);
export const CHECKOUT_FONT_CLAMP_20_25 = checkoutFontSizeClamp(20, 25);
export const CHECKOUT_FONT_CLAMP_25_31 = checkoutFontSizeClamp(25, 31);
export const CHECKOUT_FONT_CLAMP_28_32 = checkoutFontSizeClamp(28, 32);
export const CHECKOUT_FONT_CLAMP_32_40 = checkoutFontSizeClamp(32, 40);
export const CHECKOUT_FONT_CLAMP_32_48 = checkoutFontSizeClamp(32, 48);
export const CHECKOUT_FONT_CLAMP_25_40 = checkoutFontSizeClamp(25, 40, 704);
