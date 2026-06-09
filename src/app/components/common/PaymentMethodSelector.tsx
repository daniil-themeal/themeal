import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { PaymentMethodIcon } from './icons/PaymentMethodIcons';
import { RadioCheckIcon } from './icons/RadioCheckIcon';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export const PAYMENT_METHODS = ['card', 'apple-pay', 'google-pay', 'tabby'] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number];

type PaymentMethodSelectorCssVariables = CSSProperties & {
  '--payment-method-bg': string;
  '--payment-method-bg-hover': string;
  '--payment-method-border': string;
  '--payment-method-border-hover': string;
  '--payment-method-title': string;
  '--payment-method-subtitle': string;
  '--payment-method-title-fs': string;
  '--payment-method-subtitle-fs': string;
};

const paymentMethodSelectorStyle: PaymentMethodSelectorCssVariables = {
  '--payment-method-title-fs': FONT_SIZE_TOKENS[16],
  '--payment-method-subtitle-fs': FONT_SIZE_TOKENS[12],
};

const PAYMENT_METHOD_LABELS: Record<PaymentMethodId, string> = {
  card: 'Debit/Credit Card',
  'apple-pay': 'Apple Pay',
  'google-pay': 'Google Pay',
  tabby: 'Tabby',
};

const PAYMENT_METHOD_SUBTITLES: Partial<Record<PaymentMethodId, string>> = {
  tabby: '4 payments, 0% interest',
};

type PaymentMethodSelectorProps = {
  method: PaymentMethodId;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
};

export function PaymentMethodSelector({
  method,
  selected,
  onSelect,
  disabled = false,
}: PaymentMethodSelectorProps) {
  const subtitle = PAYMENT_METHOD_SUBTITLES[method];

  const selectorStateStyle: PaymentMethodSelectorCssVariables = disabled
    ? {
        ...paymentMethodSelectorStyle,
        '--payment-method-bg': COLOR_TOKENS.neutral[50],
        '--payment-method-bg-hover': COLOR_TOKENS.neutral[50],
        '--payment-method-border': COLOR_TOKENS.neutral[200],
        '--payment-method-border-hover': COLOR_TOKENS.neutral[200],
        '--payment-method-title': COLOR_TOKENS.neutral[500],
        '--payment-method-subtitle': COLOR_TOKENS.neutral[500],
      }
    : selected
    ? {
        ...paymentMethodSelectorStyle,
        '--payment-method-bg': COLOR_TOKENS.primary[50],
        '--payment-method-bg-hover': COLOR_TOKENS.primary[50],
        '--payment-method-border': COLOR_TOKENS.primary[100],
        '--payment-method-border-hover': COLOR_TOKENS.primary[100],
        '--payment-method-title': COLOR_TOKENS.primary[500],
        '--payment-method-subtitle': COLOR_TOKENS.neutral[500],
      }
    : {
        ...paymentMethodSelectorStyle,
        '--payment-method-bg': COLOR_TOKENS.base.white,
        '--payment-method-bg-hover': COLOR_TOKENS.neutral[50],
        '--payment-method-border': COLOR_TOKENS.neutral[200],
        '--payment-method-border-hover': COLOR_TOKENS.neutral[300],
        '--payment-method-title': COLOR_TOKENS.neutral[900],
        '--payment-method-subtitle': COLOR_TOKENS.neutral[500],
      };

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      aria-disabled={disabled}
      className={[
        'group relative isolate flex min-h-[56px] w-full items-center gap-[8px]',
        'rounded-[12px] pl-[12px] pr-[20px] transition-colors',
        'bg-[var(--payment-method-bg)]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        selected || disabled ? '' : 'hover:bg-[var(--payment-method-bg-hover)]',
      ].join(' ')}
      style={selectorStateStyle}
    >
      <div
        aria-hidden
        className={[
          'pointer-events-none absolute inset-0 rounded-[12px] border border-solid transition-colors',
          'border-[var(--payment-method-border)]',
          selected || disabled ? '' : 'group-hover:border-[var(--payment-method-border-hover)]',
        ].join(' ')}
      />

      <PaymentMethodIcon
        method={method}
        cardVariant={method === 'card' && selected && !disabled ? 'primary' : 'neutral'}
        className="relative z-[3]"
      />

      <div className="relative z-[2] flex min-w-0 flex-1 flex-col items-start gap-[8px] py-[8px]">
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'w-full text-left font-sans text-[length:var(--payment-method-title-fs)] font-semibold leading-[130%]',
            'text-[var(--payment-method-title)]',
          ].join(' ')}
        >
          {PAYMENT_METHOD_LABELS[method]}
        </p>

        {subtitle ? (
          <p
            className={[
              TEXT_TRIM_CLASS_NAME,
              'w-full text-left font-sans text-[length:var(--payment-method-subtitle-fs)] font-medium leading-[140%]',
              'text-[var(--payment-method-subtitle)]',
            ].join(' ')}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="relative z-[1] flex shrink-0 items-center py-[16px]">
        <span
          className={['shrink-0 transition-opacity', selected ? 'opacity-100' : 'opacity-0'].join(' ')}
          style={{ color: disabled ? COLOR_TOKENS.neutral[500] : COLOR_TOKENS.primary[500] }}
        >
          <RadioCheckIcon size={20} />
        </span>
      </div>
    </button>
  );
}
