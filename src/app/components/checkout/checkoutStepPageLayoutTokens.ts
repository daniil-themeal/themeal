import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_FIT_CLASS_NAME } from '../common/textTrimTokens';

/** Shared page shell layout for checkout form steps (delivery details, payment, etc.). */
const headerToCardGap = 'gap-[32px]';

export const CHECKOUT_STEP_PAGE_LAYOUT = {
  page: 'min-h-full bg-[var(--checkout-step-surface)] md:bg-[var(--checkout-step-page-bg)]',
  /** Space from page title block to white card. */
  headerToCardGap,
  container: `mx-auto flex w-full flex-col md:px-[32px] md:py-[120px] ${headerToCardGap}`,
  header: 'mx-auto flex h-fit w-full max-w-[688px] flex-col gap-[12px] px-[20px] pt-[24px] text-center md:px-0 md:pt-0',
  headerTitle: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'font-sans text-[length:var(--checkout-step-title-fs)] font-bold leading-[130%] tracking-[-0.64px] text-[var(--checkout-step-title-color)] md:text-[length:var(--checkout-step-title-fs-md)]',
  ].join(' '),
  headerSubtitle: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'font-sans text-[length:var(--checkout-step-subtitle-fs)] font-medium leading-[140%] text-[var(--checkout-step-title-color)]',
  ].join(' '),
  card: 'mx-auto w-full max-w-[688px] bg-[var(--checkout-step-surface)] md:overflow-hidden md:rounded-[18px] md:pt-[32px] md:pb-[32px]',
  cardSectionTop: 'flex flex-col gap-[32px] px-[20px] md:px-[32px]',
  cardSection: 'px-[20px] md:px-[32px]',
  cardSectionGap12: 'flex w-full flex-col gap-[12px] px-[20px] md:px-[32px]',
  cardSectionGap16: 'flex h-fit flex-col gap-[16px] px-[20px] md:px-[32px]',
  cardSectionBottom: 'flex flex-col gap-[32px] px-[20px] md:px-[32px]',
  cardFooter: 'flex flex-col px-[20px] pt-[32px] md:px-[32px]',
  cardSectionInner: 'flex w-full flex-col gap-[16px] px-[4px]',
  divider: 'my-[32px]',
} as const;

export const CHECKOUT_STEP_PAGE_VARS = {
  '--checkout-step-page-bg': COLOR_TOKENS.neutral[50],
  '--checkout-step-surface': COLOR_TOKENS.base.white,
  '--checkout-step-title-fs': FONT_SIZE_TOKENS[32],
  '--checkout-step-title-fs-md': FONT_SIZE_TOKENS[48],
  '--checkout-step-title-color': COLOR_TOKENS.neutral[900],
  '--checkout-step-subtitle-fs': FONT_SIZE_TOKENS[20],
} as CSSProperties;
