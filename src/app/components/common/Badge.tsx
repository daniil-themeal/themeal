import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from './colorTokens';

export const BADGE_VARIANTS = ['most-popular', 'best-value'] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
};

type BadgeCssVariables = CSSProperties & {
  '--badge-bg': string;
  '--badge-text': string;
};

const BADGE_VARIANT_STYLES: Record<BadgeVariant, BadgeCssVariables> = {
  'most-popular': {
    '--badge-bg': COLOR_TOKENS.orange[500],
    '--badge-text': COLOR_TOKENS.base.white,
  },
  'best-value': {
    '--badge-bg': COLOR_TOKENS.success[500],
    '--badge-text': COLOR_TOKENS.base.white,
  },
};

const BADGE_LABELS: Record<BadgeVariant, string> = {
  'most-popular': 'Most Popular',
  'best-value': 'Best Value',
};

const baseClassName = [
  'inline-flex w-fit self-start items-center justify-center',
  'rounded-full px-[4px] py-[2px]',
  "font-sans text-[11px] font-semibold leading-none whitespace-nowrap",
  'bg-[var(--badge-bg)] text-[var(--badge-text)]',
].join(' ');

export function Badge({ variant = 'most-popular', className = '' }: BadgeProps) {
  return (
    <span
      style={BADGE_VARIANT_STYLES[variant]}
      className={[baseClassName, className].filter(Boolean).join(' ')}
    >
      {BADGE_LABELS[variant]}
    </span>
  );
}
