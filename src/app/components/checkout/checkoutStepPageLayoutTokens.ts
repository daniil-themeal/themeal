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
  CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP,
} from './checkoutSpacing';

/** Shared page shell layout for checkout form steps (delivery details, payment, etc.). */
const headerToCardGap =
  'gap-[length:var(--checkout-header-to-card-gap)] md:gap-[length:var(--checkout-header-to-card-gap-md)]';

const cardSectionPx = 'md:px-[length:var(--checkout-card-padding)] max-md:px-0';

/** Full-width divider line; on mobile bleeds to card shell edges when shell has horizontal padding. */
export const CHECKOUT_DIVIDER_BLEED =
  'w-full shrink-0 max-md:-mx-[length:var(--checkout-card-padding)] max-md:w-[calc(100%+2*var(--checkout-card-padding))] md:mx-0';

export const CHECKOUT_STEP_PAGE_LAYOUT = {
  page: 'min-h-full bg-[var(--checkout-step-surface)] md:bg-[var(--checkout-step-page-bg)]',
  /** Space from page title block to white card. */
  headerToCardGap,
  container: `mx-auto flex w-full flex-col max-md:px-[length:var(--checkout-card-padding)] md:px-[32px] md:py-[120px] ${headerToCardGap}`,
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
  cardSectionTop: `flex flex-col gap-[length:var(--checkout-section-gap)] ${cardSectionPx}`,
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
  '--checkout-section-gap': CHECKOUT_SECTION_GAP_CLAMP,
  '--checkout-header-to-card-gap': CHECKOUT_HEADER_TO_CARD_GAP_CLAMP,
  '--checkout-header-to-card-gap-md': CHECKOUT_HEADER_TO_CARD_GAP_MD_CLAMP,
  '--checkout-step-header-pt': CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP,
  '--checkout-step-title-fs': CHECKOUT_FONT_CLAMP_32_48,
  '--checkout-step-title-color': COLOR_TOKENS.neutral[900],
  '--checkout-step-subtitle-fs': CHECKOUT_FONT_CLAMP_18_20,
} as CSSProperties;
