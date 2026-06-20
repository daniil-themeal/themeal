import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { UaeFlag } from './UaeFlag';

type PhoneInputCssVariables = CSSProperties & {
  '--phone-input-bg': string;
  '--phone-input-border': string;
  '--phone-input-focus-border': string;
  '--phone-input-text': string;
  '--phone-input-placeholder': string;
  '--phone-input-error': string;
  '--phone-input-font-size': string;
};

const phoneInputStyle: PhoneInputCssVariables = {
  '--phone-input-bg': COLOR_TOKENS.neutral[50],
  '--phone-input-border': COLOR_TOKENS.neutral[200],
  '--phone-input-focus-border': COLOR_TOKENS.neutral[300],
  '--phone-input-text': COLOR_TOKENS.neutral[900],
  '--phone-input-placeholder': COLOR_TOKENS.neutral[300],
  '--phone-input-error': COLOR_TOKENS.danger[400],
  '--phone-input-font-size': FONT_SIZE_TOKENS[20],
};

type PhoneInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  error?: ReactNode;
  invalid?: boolean;
  placeholder?: string;
  className?: string;
};

export function PhoneInput({
  id,
  value,
  onChange,
  error,
  invalid = false,
  placeholder = 'Type your phone',
  className = '',
}: PhoneInputProps) {
  const hasError = Boolean(error) || invalid;
  const descriptionId = id && error ? `${id}-error` : undefined;

  return (
    <div className={['flex flex-col gap-[8px]', className].filter(Boolean).join(' ')} style={phoneInputStyle}>
      <div className="flex items-center gap-[12px]">
        <div className="flex h-[48px] shrink-0 items-center overflow-hidden rounded-[8px] border border-[var(--phone-input-border)] bg-[var(--phone-input-bg)]">
          <div className="flex size-[48px] items-center justify-center">
            <UaeFlag />
          </div>
          <p className="pr-[16px] font-sans text-[length:var(--phone-input-font-size)] font-semibold leading-[130%] text-[var(--phone-input-text)]">
            +971
          </p>
        </div>

        <div
          className={[
            'flex h-[48px] flex-1 items-center rounded-[8px] border bg-[var(--phone-input-bg)] px-[16px]',
            'transition-colors',
            hasError
              ? 'border-[var(--phone-input-error)]'
              : 'border-[var(--phone-input-border)] focus-within:border-[var(--phone-input-focus-border)]',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <input
            id={id}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            aria-invalid={hasError}
            aria-describedby={descriptionId}
            className="w-full bg-transparent font-sans text-[length:var(--phone-input-font-size)] font-semibold text-[var(--phone-input-text)] outline-none placeholder:text-[var(--phone-input-placeholder)]"
          />
        </div>
      </div>

      {error ? (
        <p
          id={descriptionId}
          className="font-sans text-[12px] font-medium leading-[140%] text-[var(--phone-input-error)]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
