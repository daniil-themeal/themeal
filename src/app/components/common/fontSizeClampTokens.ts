export function createFontSizeClamp(
  minPx: number,
  maxPx: number,
  viewportRangePx = 448,
  viewportMin = '20rem',
) {
  const delta = maxPx - minPx;

  return `clamp(${minPx}px, calc(${minPx}px + (100vw - ${viewportMin}) * ${delta} / ${viewportRangePx}), ${maxPx}px)`;
}

export const FONT_SIZE_CLAMP_12_14 = createFontSizeClamp(12, 14);
export const FONT_SIZE_CLAMP_12_16 = createFontSizeClamp(12, 16);
export const FONT_SIZE_CLAMP_14_16 = createFontSizeClamp(14, 16);
export const FONT_SIZE_CLAMP_16_20 = createFontSizeClamp(16, 20);
export const FONT_SIZE_CLAMP_18_20 = createFontSizeClamp(18, 20);
export const FONT_SIZE_CLAMP_20_25 = createFontSizeClamp(20, 25);
export const FONT_SIZE_CLAMP_20_32 = createFontSizeClamp(20, 32);
export const FONT_SIZE_CLAMP_25_31 = createFontSizeClamp(25, 31);
export const FONT_SIZE_CLAMP_25_40 = createFontSizeClamp(25, 40);
export const FONT_SIZE_CLAMP_25_40_WIDE = createFontSizeClamp(25, 40, 704);
export const FONT_SIZE_CLAMP_28_32 = createFontSizeClamp(28, 32);
export const FONT_SIZE_CLAMP_32_40 = createFontSizeClamp(32, 40);
export const FONT_SIZE_CLAMP_32_48 = createFontSizeClamp(32, 48);
