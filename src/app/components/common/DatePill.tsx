import { forwardRef } from 'react';
import type { CSSProperties } from 'react';

import { MONTH_ABBR } from './dateFormatTokens';
import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { COLOR_TOKENS } from './colorTokens';

type DatePillCssVariables = CSSProperties & {
  '--date-pill-bg': string;
  '--date-pill-bg-hover': string;
  '--date-pill-border': string;
  '--date-pill-border-hover': string;
};

export const DATE_PILL_SELECTED_STYLE: DatePillCssVariables = {
  '--date-pill-bg': COLOR_TOKENS.primary[50],
  '--date-pill-bg-hover': COLOR_TOKENS.primary[75],
  '--date-pill-border': COLOR_TOKENS.primary[500],
  '--date-pill-border-hover': COLOR_TOKENS.primary[600],
};

export const DATE_PILL_DEFAULT_STYLE: DatePillCssVariables = {
  '--date-pill-bg': COLOR_TOKENS.base.white,
  '--date-pill-bg-hover': COLOR_TOKENS.neutral[50],
  '--date-pill-border': COLOR_TOKENS.neutral[100],
  '--date-pill-border-hover': COLOR_TOKENS.neutral[300],
};

export type DatePillProps = {
  date: Date;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export const DatePill = forwardRef<HTMLButtonElement, DatePillProps>(function DatePill(
  { date, selected = false, onClick, className = '' },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={[
        'flex h-[64px] w-[56px] shrink-0 cursor-pointer flex-col items-center justify-center',
        'border border-[length:1px] border-[var(--date-pill-border)] bg-[var(--date-pill-bg)]',
        'transition-colors',
        'hover:enabled:border-[var(--date-pill-border-hover)] hover:enabled:bg-[var(--date-pill-bg-hover)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        borderRadius: BORDER_RADIUS_TOKENS[12],
        ...(selected ? DATE_PILL_SELECTED_STYLE : DATE_PILL_DEFAULT_STYLE),
      }}
    >
      <span
        className="font-sans text-[18px] font-bold leading-none"
        style={{ color: COLOR_TOKENS.neutral[900] }}
      >
        {date.getDate()}
      </span>
      <span
        className="mt-[4px] font-sans text-[12px] font-semibold leading-none"
        style={{ color: COLOR_TOKENS.neutral[900] }}
      >
        {MONTH_ABBR[date.getMonth()]}
      </span>
    </button>
  );
});
