import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { TEXT_TRIM_FIT_CLASS_NAME } from '../common/textTrimTokens';

import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_18_20,
  CHECKOUT_FONT_CLAMP_32_48,
  CHECKOUT_HEADER_TO_CARD_GAP_CLAMP,
  CHECKOUT_HEADER_TO_CARD_GAP_MD_CLAMP,
  CHECKOUT_SECTION_GAP_CLAMP,
  CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  CHECKOUT_SELECTOR_CARD_PADDING_CLAMP,
  CHECKOUT_STEP_SECTION_PADDING_CLAMP,
  CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP,
} from './checkoutSpacing';

/** Shared page shell layout for checkout form steps (delivery details, payment, etc.). */
const headerToCardGap =
  'gap-[length:var(--checkout-header-to-card-gap)] md:gap-[length:var(--checkout-header-to-card-gap-md)]';

const cardSectionPx = '';

/** Side inset for named step sections (card padding clamp). */
export const CHECKOUT_STEP_SECTION_PX = 'px-[length:var(--checkout-step-section-padding)]';

/** Side inset for the top card section (address / plan summary). */
const cardSectionTopPx = CHECKOUT_STEP_SECTION_PX;

/** `data-checkout-section` — section id for layout CSS and dev hints. */
export const CHECKOUT_SECTION_ATTR = 'data-checkout-section';

export const CHECKOUT_STEP_SECTION_NAMES = {
  cardSectionTop: 'card-section-top',
  mealCalendarHeading: 'meal-calendar-heading',
  mealCalendarDatePills: 'meal-calendar-date-pills',
  mealCalendarGrid: 'meal-calendar-grid',
  deliveryOptions: 'delivery-options',
  checkoutCta: 'checkout-cta',
} as const;

export function checkoutStepSectionProps(sectionName: string, layoutClassName: string) {
  return {
    [CHECKOUT_SECTION_ATTR]: sectionName,
    className: [`checkout-step-section checkout-step-section--${sectionName}`, layoutClassName]
      .filter(Boolean)
      .join(' '),
  };
}

/** Horizontal inset for checkout section rows (matches scroll edge gutter width). */
export const CHECKOUT_SECTION_INSET = 'px-[length:var(--checkout-card-padding)]';

/** Full-width divider line; on mobile bleeds to card shell edges when shell has horizontal padding. */
export const CHECKOUT_DIVIDER_BLEED =
  'w-full shrink-0 max-md:-mx-[length:var(--checkout-card-padding)] max-md:w-[calc(100%+2*var(--checkout-card-padding))] md:mx-0';

/** Bleed scroll row when parent already has horizontal padding (modal body, float panel). */
export const CHECKOUT_CARD_SECTION_BLEED_FROM_PADDING =
  '-mx-[length:var(--checkout-card-padding)] w-[calc(100%+2*var(--checkout-card-padding))]';

/** Bleed on mobile card shell only; on md sections use md:px so keep scroll in content box + gutters. */
export const CHECKOUT_CARD_SECTION_BLEED =
  'max-md:-mx-[length:var(--checkout-card-padding)] max-md:w-[calc(100%+2*var(--checkout-card-padding))] md:mx-0 md:w-full';

export const CHECKOUT_SCROLL_EDGE_GUTTER_CLASS_NAME =
  'shrink-0 w-[length:var(--checkout-card-padding)]';

export const CHECKOUT_SCROLL_EDGE_FADE_START_POSITION_CLASS_NAME =
  'left-[length:var(--checkout-card-padding)]';

export const CHECKOUT_SCROLL_EDGE_FADE_END_POSITION_CLASS_NAME =
  'right-[length:var(--checkout-card-padding)]';

export const CHECKOUT_STEP_PAGE_LAYOUT = {
  page: 'min-h-full bg-[var(--checkout-step-surface)] md:bg-[var(--checkout-step-page-bg)]',
  /** Space from page title block to white card. */
  headerToCardGap,
  container: `mx-auto flex w-full flex-col md:py-[120px] ${headerToCardGap}`,
  header:
    'mx-auto flex h-fit w-full max-w-[688px] flex-col gap-[12px] bg-[var(--checkout-step-surface)] pt-[length:var(--checkout-step-header-pt)] text-center md:bg-transparent md:pt-0',
  headerTitle: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'font-sans text-[length:var(--checkout-step-title-fs)] font-bold leading-[130%] tracking-[-0.64px] text-[var(--checkout-step-title-color)]',
  ].join(' '),
  headerSubtitle: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'font-sans text-[length:var(--checkout-step-subtitle-fs)] font-medium leading-[140%] text-[var(--checkout-step-title-color)]',
  ].join(' '),
  card: 'mx-auto w-full max-w-[688px] bg-[var(--checkout-step-surface)] md:overflow-hidden md:rounded-[18px] md:pt-[length:var(--checkout-card-padding)]',
  cardSectionTop: `flex flex-col gap-[length:var(--checkout-section-gap)] ${cardSectionTopPx}`,
  cardSection: cardSectionPx,
  cardSectionGap12: `flex w-full flex-col gap-[12px] ${cardSectionPx}`,
  cardSectionGap16: `flex h-fit flex-col gap-[16px] ${cardSectionPx}`,
  cardSectionBottom: `flex flex-col gap-[length:var(--checkout-section-gap)] pb-[length:var(--checkout-card-padding)] ${cardSectionPx}`,
  cardFooter: `flex flex-col pt-[length:var(--checkout-section-gap)] pb-[length:var(--checkout-card-padding)] ${cardSectionPx}`,
  cardSectionInner: 'flex w-full min-w-0 flex-col gap-[16px] px-[4px]',
  divider: 'w-full shrink-0 my-[length:var(--checkout-section-gap)]',
} as const;

export const CHECKOUT_STEP_PAGE_VARS = {
  '--checkout-step-page-bg': COLOR_TOKENS.base.cream,
  '--checkout-step-surface': COLOR_TOKENS.base.white,
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-step-section-padding': CHECKOUT_STEP_SECTION_PADDING_CLAMP,
  '--checkout-selector-card-padding': CHECKOUT_SELECTOR_CARD_PADDING_CLAMP,
  '--checkout-scroll-edge-fade-width': CHECKOUT_SCROLL_EDGE_FADE_WIDTH_CLAMP,
  '--checkout-section-gap': CHECKOUT_SECTION_GAP_CLAMP,
  '--checkout-header-to-card-gap': CHECKOUT_HEADER_TO_CARD_GAP_CLAMP,
  '--checkout-header-to-card-gap-md': CHECKOUT_HEADER_TO_CARD_GAP_MD_CLAMP,
  '--checkout-step-header-pt': CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP,
  '--checkout-step-title-fs': CHECKOUT_FONT_CLAMP_32_48,
  '--checkout-step-title-color': COLOR_TOKENS.neutral[900],
  '--checkout-step-subtitle-fs': CHECKOUT_FONT_CLAMP_18_20,
} as CSSProperties;
