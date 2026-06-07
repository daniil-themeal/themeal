import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { FormLabel } from './FormLabel';

export const TEXT_INPUT_STATES = ['default', 'focus', 'success', 'error'] as const;

export type TextInputState = (typeof TEXT_INPUT_STATES)[number];

type TextInputProps = {
  label: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  counter?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  state?: TextInputState;
  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'className'>;

type TextInputCssVariables = CSSProperties & {
  '--text-input-bg': string;
  '--text-input-border': string;
  '--text-input-focus-border': string;
  '--text-input-text': string;
  '--text-input-placeholder': string;
};

type TextInputTypographyVariables = CSSProperties & {
  '--text-input-font-size': string;
  '--text-input-supporting-font-size': string;
};

const textInputTypographyStyle: TextInputTypographyVariables = {
  '--text-input-font-size': FONT_SIZE_TOKENS[16],
  '--text-input-supporting-font-size': FONT_SIZE_TOKENS[12],
};

const FIELD_STATE_STYLES: Record<TextInputState, TextInputCssVariables> = {
  default: {
    '--text-input-bg': COLOR_TOKENS.neutral[50],
    '--text-input-border': 'transparent',
    '--text-input-focus-border': COLOR_TOKENS.neutral[300],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.neutral[200],
  },

  focus: {
    '--text-input-bg': COLOR_TOKENS.neutral[50],
    '--text-input-border': COLOR_TOKENS.neutral[300],
    '--text-input-focus-border': COLOR_TOKENS.neutral[300],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.neutral[200],
  },

  success: {
    '--text-input-bg': COLOR_TOKENS.success[50],
    '--text-input-border': 'transparent',
    '--text-input-focus-border': COLOR_TOKENS.neutral[300],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.neutral[200],
  },

  error: {
    '--text-input-bg': COLOR_TOKENS.danger[50],
    '--text-input-border': 'transparent',
    '--text-input-focus-border': COLOR_TOKENS.neutral[300],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.neutral[200],
  },
};

const fieldBaseClassName = [
  'flex w-full items-stretch overflow-hidden rounded-[8px] border',
  'border-[var(--text-input-border)] bg-[var(--text-input-bg)]',
  'transition-colors',
  'focus-within:border-[var(--text-input-focus-border)]',
].join(' ');

const inputBaseClassName = [
  "h-[48px] min-w-0 flex-1 bg-transparent px-[16px] font-['Quicksand']",
  'text-[length:var(--text-input-font-size)] font-semibold leading-[130%] text-[var(--text-input-text)]',
  'outline-none placeholder:text-[var(--text-input-placeholder)]',
  'disabled:cursor-not-allowed',
].join(' ');

const iconSlotClassName = [
  'flex w-[48px] shrink-0 self-stretch items-center justify-center',
  '[&>svg]:h-[24px] [&>svg]:w-[24px] [&>svg]:shrink-0',
  '[&>img]:h-[24px] [&>img]:w-[24px] [&>img]:shrink-0',
].join(' ');

function getFieldState({
  explicitState,
  hasError,
}: {
  explicitState?: TextInputState;
  hasError: boolean;
}) {
  if (hasError) {
    return 'error';
  }

  return explicitState ?? 'default';
}

function getFieldClassName({
  disabled,
  fieldClassName,
}: {
  disabled?: boolean;
  fieldClassName?: string;
}) {
  return [fieldBaseClassName, disabled ? 'opacity-60' : '', fieldClassName]
    .filter(Boolean)
    .join(' ');
}

export function TextInput({
  label,
  error,
  hint,
  counter,
  leftIcon,
  rightIcon,
  state: explicitState,
  containerClassName = '',
  labelClassName = '',
  fieldClassName = '',
  className = '',
  id,
  disabled,
  style,
  ...inputProps
}: TextInputProps) {
  const hasError = Boolean(error);
  const fieldState = getFieldState({ explicitState, hasError });
  const descriptionId = id && (error || hint) ? `${id}-description` : undefined;

  return (
    <div
      className={['flex w-full flex-col gap-[8px]', containerClassName]
        .filter(Boolean)
        .join(' ')}
      style={textInputTypographyStyle}
    >
      <div className="flex items-baseline gap-[3px] px-[2px]">
        <FormLabel
          htmlFor={id}
          className={['flex-1', labelClassName].filter(Boolean).join(' ')}
        >
          {label}
        </FormLabel>

        {counter ? (
          <span
            className="font-['Quicksand'] text-[length:var(--text-input-supporting-font-size)] font-semibold leading-[120%] tracking-[0.12px]"
            style={{ color: COLOR_TOKENS.neutral[500] }}
          >
            {counter}
          </span>
        ) : null}
      </div>

      <div
        className={getFieldClassName({
          disabled,
          fieldClassName,
        })}
        style={FIELD_STATE_STYLES[fieldState]}
      >
        {leftIcon ? <span className={iconSlotClassName}>{leftIcon}</span> : null}

        <input
          id={id}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={descriptionId}
          className={[inputBaseClassName, className].filter(Boolean).join(' ')}
          style={style}
          {...inputProps}
        />

        {rightIcon ? <span className={iconSlotClassName}>{rightIcon}</span> : null}
      </div>

      {error || hint ? (
        <p
          id={descriptionId}
          className="px-[2px] font-['Quicksand'] text-[length:var(--text-input-supporting-font-size)] font-semibold leading-[150%]"
          style={{
            color: hasError ? COLOR_TOKENS.danger[400] : COLOR_TOKENS.neutral[500],
          }}
        >
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}