import { TEXT_TRIM_FIT_CLASS_NAME } from './textTrimTokens';

/** Layout and typography classes for icon + text row blocks. */
export const ICON_TEXT_ROW_LAYOUT = {
  list: 'flex h-fit w-full flex-col gap-[16px]',
  row: 'flex h-fit w-full items-center justify-center gap-[8px] [&>*:first-child]:block [&>*:first-child]:shrink-0 [&>*:first-child]:leading-none [&>*:first-child]:text-[var(--icon-text-row-icon)]',
  content: 'flex h-fit min-w-0 flex-1 flex-col gap-[12px]',
  title: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'align-middle w-full font-sans text-[16px] font-semibold leading-[140%] text-[var(--icon-text-row-text)]',
  ].join(' '),
  subtitle: [
    TEXT_TRIM_FIT_CLASS_NAME,
    'w-full font-sans text-[12px] font-medium leading-[140%] text-[var(--icon-text-row-muted)]',
  ].join(' '),
} as const;
