import { createFontSizeClamp, FONT_SIZE_CLAMP_20_25 } from '../common/fontSizeClampTokens';

/** Desktop top inset for trial plan-step columns. */
export const CHECKOUT_PLAN_COLUMN_PT_MD = '64px';

/** Desktop top inset for subscription plan-step left column. */
export const CHECKOUT_PLAN_SUBSCRIPTION_LEFT_COLUMN_PT_MD = '56px';

/** Estimated desktop top inset for summary — matches PlanSelector header + Light card stack. */
export const CHECKOUT_PLAN_SUMMARY_TOP_MD_ESTIMATE = `calc(${CHECKOUT_PLAN_SUBSCRIPTION_LEFT_COLUMN_PT_MD} + 20px + (${FONT_SIZE_CLAMP_20_25} * 1.3))`;

/** Fallback desktop top inset for subscription summary until layout is measured. */
export const CHECKOUT_PLAN_SUMMARY_TOP_MD_FALLBACK = CHECKOUT_PLAN_SUMMARY_TOP_MD_ESTIMATE;

/** Desktop left inset for plan-step left column content. */
export const CHECKOUT_PLAN_LEFT_COLUMN_PL = '12px';

export const CHECKOUT_CARD_PADDING_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 12 / 448), 32px)';

/** Order summary section horizontal inset — 25% narrower than card padding, multiples of 4px. */
export const CHECKOUT_ORDER_SUMMARY_SECTION_PADDING_CLAMP =
  'clamp(16px, calc(16px + (100vw - 20rem) * 8 / 448), 24px)';

/** Order summary card vertical inset — 25% less than 28px / 16px mobile, multiples of 4px. */
export const CHECKOUT_ORDER_SUMMARY_CARD_PADDING_Y_CLAMP = '24px';

export const CHECKOUT_ORDER_SUMMARY_CARD_PADDING_Y_MOBILE_CLAMP = '12px';

/** Order summary divider / section vertical gap — 25% less than CHECKOUT_SECTION_GAP_CLAMP. */
export const CHECKOUT_ORDER_SUMMARY_SECTION_GAP_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 20px)';

export const CHECKOUT_ORDER_SUMMARY_INNER_GAP_MD_CLAMP = '12px';

export const CHECKOUT_ORDER_SUMMARY_INNER_GAP_SM_CLAMP = '4px';

/** Step page named sections — same ramp as card padding (original delivery/payment layout). */
export const CHECKOUT_STEP_SECTION_PADDING_CLAMP = CHECKOUT_CARD_PADDING_CLAMP;

/** Horizontal scroll edge fade width — same ramp as card padding so fade covers only the gutter. */
export const CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP = CHECKOUT_CARD_PADDING_CLAMP;

export const CHECKOUT_SELECTOR_CARD_PADDING_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 24px)';

export const CHECKOUT_SECTION_GAP_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 8 / 448), 32px)';

/** Quiz step body — vertical gap between header, sliders, and options. */
export const QUIZ_STEP_BODY_GAP_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 8 / 448), 32px)';

/** Promo Activate button horizontal padding — scales with InputButtonRow @container width (12px at 260px → 16px at 400px). */
export const PROMO_ACTIVATE_BUTTON_PADDING_X_CLAMP =
  'clamp(12px, calc(12px + (100cqw - 260px) * 4 / 140), 16px)';

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

/** Order summary in single-column layout — bottom inset below card to screen edge. */
export const CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_MOBILE_CLAMP =
  'clamp(40px, calc(40px + (100vw - 20rem) * 8 / 448), 48px)';

export const FULL_MENU_MEAL_CARD_WIDTH_CLAMP =
  'clamp(150px, calc(150px + (100vw - 20rem) * 45 / 448), 195px)';

export const FULL_MENU_MEAL_CARD_WIDTH_MD_CLAMP =
  'clamp(160px, calc(160px + (100vw - 48rem) * 48 / 448), 208px)';

export const FULL_MENU_MEAL_GAP_CLAMP =
  'clamp(20px, calc(20px + (100vw - 48rem) * 6 / 448), 26px)';

/** Embedded Full Menu — meal row scales with panel @container, not viewport. */
export const FULL_MENU_MEAL_CARD_WIDTH_CONTAINER_CLAMP =
  'clamp(150px, calc(150px + (100cqw - 20rem) * 45 / 448), 195px)';

export const FULL_MENU_MEAL_CARD_WIDTH_MD_CONTAINER_CLAMP =
  'clamp(160px, calc(160px + (100cqw - 48rem) * 48 / 448), 208px)';

export const FULL_MENU_MEAL_GAP_CONTAINER_CLAMP =
  'clamp(20px, calc(20px + (100cqw - 48rem) * 6 / 448), 26px)';

export const FULL_MENU_LIGHT_CONTROLS_SPACING_CLAMP =
  'clamp(4px, calc(4px + (100vw - 20rem) * 4 / 448), 8px)';

export const FULL_MENU_LIGHT_OPTION_GAP_CLAMP = FULL_MENU_LIGHT_CONTROLS_SPACING_CLAMP;

/** Symmetric gap before/after the Light options divider (4px → 24px). */
export const FULL_MENU_PLAN_LIGHT_DIVIDER_GAP_CLAMP =
  'clamp(4px, calc(4px + (100vw - 20rem) * 20 / 448), 24px)';

/** Max width of a single Light option pill. */
export const FULL_MENU_LIGHT_OPTION_MAX_WIDTH_CLAMP =
  'clamp(120px, calc(120px + (100vw - 20rem) * 60 / 448), 180px)';

export const FULL_MENU_LIGHT_OPTION_PADDING_X_CLAMP = FULL_MENU_LIGHT_CONTROLS_SPACING_CLAMP;

/** Light sub-tab label font size (10px → 14px), scales from md breakpoint. */
export const FULL_MENU_LIGHT_OPTION_FONT_SIZE_CLAMP = createFontSizeClamp(10, 14, 448, '48rem');

/** Gap between word segments inside a light sub-tab pill (2px → 4px). */
export const FULL_MENU_LIGHT_OPTION_TEXT_GAP_CLAMP =
  'clamp(2px, calc(2px + (100vw - 48rem) * 2 / 448), 4px)';

/** Full Menu meal carousel side inset and fade width (20px → 24px). */
export const FULL_MENU_MEAL_CAROUSEL_INSET_CLAMP =
  'clamp(20px, calc(20px + (100vw - 20rem) * 4 / 448), 24px)';

/** Bottom float meal carousel padding-bottom (4px → 8px). */
export const FULL_MENU_MEAL_CAROUSEL_PADDING_BOTTOM_FLOAT_CLAMP =
  FULL_MENU_LIGHT_CONTROLS_SPACING_CLAMP;

/** Plus plan — widest meal row in Full Menu. */
export const FULL_MENU_MAX_MEAL_COUNT = 4;

/** Modal width on md+ — cards, all flex gaps (gutter–card–…–gutter), and insets. */
export function getFullMenuModalWidthForMealCount(mealCount: number): string {
  const count = Math.max(1, mealCount);

  return `calc(${count} * var(--full-menu-meal-card-width-md) + ${count + 1} * var(--full-menu-meal-gap) + 2 * var(--full-menu-meal-carousel-inset))`;
}

export const MEAL_DETAIL_MODAL_MAX_WIDTH_CLAMP =
  'clamp(480px, calc(480px + (100vw - 48rem) * 80 / 448), 560px)';

export const MEAL_DETAIL_CONTENT_PADDING_CLAMP =
  'clamp(32px, calc(32px + (100vw - 20rem) * 8 / 448), 32px)';

export const MEAL_DETAIL_MODAL_BODY_PADDING_CLAMP =
  'clamp(24px, calc(24px + (100vw - 20rem) * 8 / 448), 32px)';

export const MEAL_DETAIL_IMAGE_PADDING_CLAMP = MEAL_DETAIL_CONTENT_PADDING_CLAMP;

export const MEAL_DETAIL_IMAGE_PADDING_TOP_CLAMP =
  'clamp(32px, calc(32px + (100vw - 20rem) * 16 / 448), 48px)';

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
