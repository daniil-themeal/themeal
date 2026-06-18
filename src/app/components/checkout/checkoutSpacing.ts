export const CHECKOUT_CARD_PADDING_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 12 / 448), 32px)';

/** Step page named sections — same ramp as card padding (original delivery/payment layout). */
export const CHECKOUT_STEP_SECTION_PADDING_CLAMP = CHECKOUT_CARD_PADDING_CLAMP;

/** Horizontal scroll edge fade width — same ramp as card padding so fade covers only the gutter. */
export const CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP = CHECKOUT_CARD_PADDING_CLAMP;

export const CHECKOUT_SELECTOR_CARD_PADDING_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 24px)';

export const CHECKOUT_SECTION_GAP_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 24px)';

/** Vertical gap between major sections on delivery details card (variant B). */
export const CHECKOUT_DELIVERY_SECTION_GAP_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 8 / 448), 32px)';

export const CHECKOUT_HEADER_TO_CARD_GAP_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 12 / 448), 36px)';

export const CHECKOUT_HEADER_TO_CARD_GAP_MD_CLAMP =
  'clamp(32px, calc(32px + (100vw - 48rem) * 16 / 448), 48px)';

export const CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 32 / 448), 56px)';

export const CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_CLAMP =
  'clamp(72px, calc(72px + (100vw - 48rem) * 48 / 448), 120px)';

export const FULL_MENU_MEAL_CARD_WIDTH_CLAMP =
  'clamp(150px, calc(150px + (100vw - 20rem) * 75 / 448), 225px)';

export const FULL_MENU_MEAL_CARD_WIDTH_MD_CLAMP =
  'clamp(160px, calc(160px + (100vw - 48rem) * 80 / 448), 240px)';

export const FULL_MENU_MEAL_GAP_CLAMP =
  'clamp(20px, calc(20px + (100vw - 48rem) * 4 / 448), 24px)';

export const FULL_MENU_MODAL_MAX_WIDTH_CLAMP =
  'clamp(780px, calc(780px + (100vw - 48rem) * 304 / 448), 1084px)';

export const MEAL_DETAIL_MODAL_MAX_WIDTH_CLAMP =
  'clamp(480px, calc(480px + (100vw - 48rem) * 80 / 448), 560px)';

export const MEAL_DETAIL_CONTENT_PADDING_CLAMP =
  'clamp(32px, calc(32px + (100vw - 20rem) * 8 / 448), 40px)';

export const MEAL_DETAIL_MODAL_BODY_PADDING_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 8 / 448), 32px)';

export const MEAL_DETAIL_IMAGE_PADDING_CLAMP = MEAL_DETAIL_CONTENT_PADDING_CLAMP;

export const MEAL_DETAIL_IMAGE_PADDING_TOP_CLAMP =
  'clamp(40px, calc(40px + (100vw - 20rem) * 8 / 448), 48px)';

export const MEAL_DETAIL_IMAGE_PADDING_BOTTOM_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 8 / 448), 32px)';

export const MEAL_DETAIL_CONTENT_PADDING_X_CLAMP = MEAL_DETAIL_CONTENT_PADDING_CLAMP;

export const MEAL_DETAIL_CONTENT_PADDING_TOP_CLAMP = MEAL_DETAIL_CONTENT_PADDING_CLAMP;

export const MEAL_DETAIL_CONTENT_PADDING_BOTTOM_CLAMP = MEAL_DETAIL_CONTENT_PADDING_CLAMP;

export {
  FONT_SIZE_CLAMP_12_14 as CHECKOUT_FONT_CLAMP_12_14,
  FONT_SIZE_CLAMP_14_16 as CHECKOUT_FONT_CLAMP_14_16,
  FONT_SIZE_CLAMP_16_20 as CHECKOUT_FONT_CLAMP_16_20,
  FONT_SIZE_CLAMP_18_20 as CHECKOUT_FONT_CLAMP_18_20,
  FONT_SIZE_CLAMP_20_25 as CHECKOUT_FONT_CLAMP_20_25,
  FONT_SIZE_CLAMP_25_31 as CHECKOUT_FONT_CLAMP_25_31,
  FONT_SIZE_CLAMP_28_32 as CHECKOUT_FONT_CLAMP_28_32,
  FONT_SIZE_CLAMP_32_40 as CHECKOUT_FONT_CLAMP_32_40,
  FONT_SIZE_CLAMP_32_48 as CHECKOUT_FONT_CLAMP_32_48,
  FONT_SIZE_CLAMP_25_40_WIDE as CHECKOUT_FONT_CLAMP_25_40,
} from '../common/fontSizeClampTokens';
