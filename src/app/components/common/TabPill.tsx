import { forwardRef } from 'react';

import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { DATE_PILL_DEFAULT_STYLE, DATE_PILL_SELECTED_STYLE } from './DatePill';

export type TabPillProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export const TabPill = forwardRef<HTMLButtonElement, TabPillProps>(function TabPill(
  { label, selected = false, onClick, className = '' },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={[
        'flex w-full cursor-pointer items-center justify-center px-[16px] py-[12px]',
        'border border-[length:1px] border-[var(--date-pill-border)] bg-[var(--date-pill-bg)]',
        'transition-colors duration-150',
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
        className={[
          'w-full text-center font-quicksand-semibold font-black text-[16px] leading-[1.3] transition-colors duration-150',
          selected ? 'text-[#9a38ef]' : 'text-[#383e48]',
        ].join(' ')}
      >
        {label}
      </span>
    </button>
  );
});
