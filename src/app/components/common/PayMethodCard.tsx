import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_FIT_CLASS_NAME } from './textTrimTokens';

type PayMethodCardCssVariables = CSSProperties & {
  '--pay-method-card-bg': string;
  '--pay-method-card-bg-hover': string;
  '--pay-method-card-border': string;
  '--pay-method-card-border-hover': string;
  '--pay-method-card-bg-disabled': string;
  '--pay-method-card-border-disabled': string;
  '--pay-method-card-title-fs': string;
  '--pay-method-card-subtitle-fs': string;
  '--pay-method-card-action-fs': string;
};

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace('#', '');

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red},${green},${blue},${alpha})`;
}

const OUTLINE_NEUTRAL_STYLE: PayMethodCardCssVariables = {
  '--pay-method-card-bg': 'transparent',
  '--pay-method-card-bg-hover': COLOR_TOKENS.neutral[50],
  '--pay-method-card-border': COLOR_TOKENS.neutral[200],
  '--pay-method-card-border-hover': COLOR_TOKENS.neutral[300],
  '--pay-method-card-bg-disabled': 'transparent',
  '--pay-method-card-border-disabled': hexToRgba(COLOR_TOKENS.neutral[200], 0.5),
  '--pay-method-card-title-fs': FONT_SIZE_TOKENS[14],
  '--pay-method-card-subtitle-fs': FONT_SIZE_TOKENS[12],
  '--pay-method-card-action-fs': FONT_SIZE_TOKENS[14],
};

const baseClassName = [
  'flex w-full items-center justify-between gap-[12px]',
  'rounded-[length:var(--pay-method-card-border-radius)]',
  'border border-[length:1px] border-[var(--pay-method-card-border)]',
  'bg-[var(--pay-method-card-bg)] px-[16px] py-[14px]',
  'cursor-pointer text-left transition-colors',
  'hover:enabled:bg-[var(--pay-method-card-bg-hover)] hover:enabled:border-[var(--pay-method-card-border-hover)]',
  'disabled:cursor-not-allowed disabled:border-[var(--pay-method-card-border-disabled)] disabled:bg-[var(--pay-method-card-bg-disabled)] disabled:opacity-60',
  'focus-visible:outline-none focus-visible:border-[var(--pay-method-card-border-hover)]',
].join(' ');

export type PayMethodCardProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  actionLabel?: ReactNode;
  leftIcon?: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function PayMethodCard({
  title,
  subtitle,
  actionLabel = 'Change',
  leftIcon,
  className = '',
  type = 'button',
  style,
  ...buttonProps
}: PayMethodCardProps) {
  return (
    <button
      type={type}
      className={[baseClassName, className].filter(Boolean).join(' ')}
      style={{
        ...OUTLINE_NEUTRAL_STYLE,
        '--pay-method-card-border-radius': BORDER_RADIUS_TOKENS[12],
        ...style,
      }}
      {...buttonProps}
    >
      {leftIcon ? (
        <span className="shrink-0" style={{ color: COLOR_TOKENS.neutral[500] }}>
          {leftIcon}
        </span>
      ) : null}

      <span className="flex min-w-0 flex-1 flex-col gap-[8px] py-[4px]">
        <span
          className={[
            TEXT_TRIM_FIT_CLASS_NAME,
            'min-w-0 font-sans text-[length:var(--pay-method-card-title-fs)] font-bold leading-[130%]',
          ].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          {title}
        </span>

        {subtitle ? (
          <span
            className={[
              TEXT_TRIM_FIT_CLASS_NAME,
              'font-sans text-[length:var(--pay-method-card-subtitle-fs)] font-medium leading-[140%]',
            ].join(' ')}
            style={{ color: COLOR_TOKENS.neutral[500] }}
          >
            {subtitle}
          </span>
        ) : null}
      </span>

      {actionLabel ? (
        <span
          className={[
            TEXT_TRIM_FIT_CLASS_NAME,
            'shrink-0 font-sans text-[length:var(--pay-method-card-action-fs)] font-bold leading-[130%]',
          ].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[500] }}
        >
          {actionLabel}
        </span>
      ) : null}
    </button>
  );
}
