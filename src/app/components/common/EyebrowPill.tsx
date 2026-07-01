import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';

export const EYEBROW_PILL_VARIANTS = ['brand', 'warning'] as const;

export type EyebrowPillVariant = (typeof EYEBROW_PILL_VARIANTS)[number];

type EyebrowPillProps = {
  children: ReactNode;
  variant?: EyebrowPillVariant;
  icon?: ReactNode;
  className?: string;
};

type EyebrowPillCssVariables = CSSProperties & {
  '--eyebrow-pill-bg': string;
  '--eyebrow-pill-text': string;
  '--eyebrow-pill-font-size': string;
};

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace('#', '');

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red},${green},${blue},${alpha})`;
}

const EYEBROW_PILL_VARIANT_STYLES: Record<EyebrowPillVariant, EyebrowPillCssVariables> = {
  brand: {
    '--eyebrow-pill-bg': hexToRgba(COLOR_TOKENS.primary[500], 0.12),
    '--eyebrow-pill-text': COLOR_TOKENS.primary[500],
    '--eyebrow-pill-font-size': FONT_SIZE_TOKENS[12],
  },
  warning: {
    '--eyebrow-pill-bg': COLOR_TOKENS.warning[500],
    '--eyebrow-pill-text': COLOR_TOKENS.neutral[900],
    '--eyebrow-pill-font-size': FONT_SIZE_TOKENS[12],
  },
};

const baseClassName = [
  'inline-flex h-[32px] w-fit self-start items-center gap-[8px]',
  'rounded-full px-[14px]',
  'bg-[var(--eyebrow-pill-bg)] text-[var(--eyebrow-pill-text)]',
  'font-sans text-[length:var(--eyebrow-pill-font-size)] font-bold uppercase leading-none tracking-[0.04em] whitespace-nowrap',
].join(' ');

export function EyebrowPill({
  children,
  variant = 'brand',
  icon,
  className = '',
}: EyebrowPillProps) {
  return (
    <span
      style={EYEBROW_PILL_VARIANT_STYLES[variant]}
      className={[baseClassName, className].filter(Boolean).join(' ')}
    >
      {icon ? <span className="inline-flex shrink-0 items-center">{icon}</span> : null}
      {children}
    </span>
  );
}
