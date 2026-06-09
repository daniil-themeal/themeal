import { TEXT_TRIM_FIT_CLASS_NAME } from '../common/textTrimTokens';

import { CHECKOUT_STEP_PAGE_LAYOUT } from './checkoutStepPageLayoutTokens';

/** Layout and typography classes for icon + text row blocks. */
export const ICON_TEXT_ROW_LAYOUT = {
  section: CHECKOUT_STEP_PAGE_LAYOUT.cardSectionGap16,
  list: 'flex h-fit w-full flex-col gap-[16px]',
  row: 'flex h-fit w-full items-center gap-[12px] [&>*:first-child]:block [&>*:first-child]:shrink-0 [&>*:first-child]:leading-none [&>*:first-child]:text-[var(--payment-muted)]',
  content: 'flex h-fit min-w-0 flex-1 flex-col gap-[8px]',
  title: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'align-middle w-full font-sans text-[length:var(--payment-body-fs)] font-semibold leading-[140%] text-[var(--payment-text)]',
  ].join(' '),
  subtitle: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'w-full font-sans text-[length:var(--payment-small-fs)] font-medium leading-[140%] text-[var(--payment-muted)]',
  ].join(' '),
} as const;
