import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export const CHIP_VARIANTS = ['default', 'selected'] as const;

export type ChipVariant = (typeof CHIP_VARIANTS)[number];

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
};

type ChipCssVariables = CSSProperties & {
  '--chip-font-size': string;
  '--chip-border': string;
  '--chip-text': string;
};

const CHIP_VARIANT_STYLES: Record<ChipVariant, ChipCssVariables> = {
  default: {
    '--chip-font-size': FONT_SIZE_TOKENS[12],
    '--chip-border': COLOR_TOKENS.neutral[100],
    '--chip-text': COLOR_TOKENS.neutral[700],
  },
  selected: {
    '--chip-font-size': FONT_SIZE_TOKENS[12],
    '--chip-border': COLOR_TOKENS.primary[200],
    '--chip-text': COLOR_TOKENS.primary[500],
  },
};

export function Chip({ children, variant = 'default', className = '' }: ChipProps) {
  return (
    <span
      className={[
        'inline-flex h-fit items-center justify-center rounded-[80px] border border-solid px-[5px] py-[6px]',
        'border-[var(--chip-border)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={CHIP_VARIANT_STYLES[variant]}
    >
      <span
        className={[
          TEXT_TRIM_CLASS_NAME,
          'whitespace-nowrap font-sans text-[length:var(--chip-font-size)] font-normal leading-[130%]',
          'text-[var(--chip-text)]',
        ].join(' ')}
      >
        {children}
      </span>
    </span>
  );
}
