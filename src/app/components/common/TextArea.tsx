import { useState } from 'react';
import type { ChangeEvent, ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import {
  FIELD_CLEAR_ERROR_STYLES,
  FIELD_CLEAR_NEUTRAL_STYLES,
  FIELD_CLEAR_SUCCESS_STYLES,
  type FieldClearCssVariables,
} from './fieldClearTokens';
import {
  FIELD_SIZE_CONFIG,
  getFieldSizeStyle,
  type FieldSize,
} from './fieldSizeTokens';
import { FormLabel } from './FormLabel';
import { InputCheckIndicator } from './InputCheckIndicator';
import { InputClearButton } from './InputClearButton';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export const TEXT_AREA_STATES = ['default', 'focus', 'success', 'error'] as const;

export type TextAreaState = (typeof TEXT_AREA_STATES)[number];

type TextAreaProps = {
  label: ReactNode;
  size?: FieldSize;
  error?: ReactNode;
  hint?: ReactNode;
  counter?: ReactNode;
  state?: TextAreaState;
  clearable?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'className'>;

type TextAreaCssVariables = CSSProperties &
  FieldClearCssVariables & {
    '--text-area-bg': string;
    '--text-area-border': string;
    '--text-area-focus-border': string;
    '--text-area-text': string;
    '--text-area-placeholder': string;
  };

const TEXT_AREA_LINE_HEIGHT_RATIO = 1.3;
const TEXT_AREA_DEFAULT_ROWS = 4;

const FIELD_STATE_STYLES: Record<TextAreaState, TextAreaCssVariables> = {
  default: {
    ...FIELD_CLEAR_NEUTRAL_STYLES,
    '--text-area-bg': COLOR_TOKENS.neutral[50],
    '--text-area-border': 'transparent',
    '--text-area-focus-border': COLOR_TOKENS.neutral[300],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.neutral[200],
  },

  focus: {
    ...FIELD_CLEAR_NEUTRAL_STYLES,
    '--text-area-bg': COLOR_TOKENS.neutral[50],
    '--text-area-border': COLOR_TOKENS.neutral[300],
    '--text-area-focus-border': COLOR_TOKENS.neutral[300],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.neutral[200],
  },

  success: {
    ...FIELD_CLEAR_SUCCESS_STYLES,
    '--text-area-bg': COLOR_TOKENS.neutral[50],
    '--text-area-border': 'transparent',
    '--text-area-focus-border': COLOR_TOKENS.neutral[300],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.neutral[200],
  },

  error: {
    ...FIELD_CLEAR_ERROR_STYLES,
    '--text-area-bg': COLOR_TOKENS.danger[50],
    '--text-area-border': 'transparent',
    '--text-area-focus-border': COLOR_TOKENS.danger[200],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.danger[200],
  },
};

const fieldBaseClassName = [
  'relative w-full rounded-[length:var(--field-border-radius)] border',
  'border-[var(--text-area-border)] bg-[var(--text-area-bg)]',
  'transition-colors',
  'focus-within:border-[var(--text-area-focus-border)]',
].join(' ');

const textareaBaseClassName = [
  TEXT_TRIM_CLASS_NAME,
  "w-full resize-none bg-transparent px-[length:var(--field-horizontal-padding)] py-[length:var(--field-textarea-vertical-padding)] font-sans",
  'text-[length:var(--field-font-size)] font-semibold leading-[130%] text-[var(--text-area-text)]',
  'outline-none placeholder:text-[var(--text-area-placeholder)]',
  'disabled:cursor-not-allowed',
].join(' ');

function getMinHeightForRows(size: FieldSize, rows: number) {
  const config = FIELD_SIZE_CONFIG[size];
  const lineHeightPx = config.fontSizePx * TEXT_AREA_LINE_HEIGHT_RATIO;

  return rows * lineHeightPx + config.textareaVerticalPaddingPx * 2;
}

function getSafeRows(rows: ComponentPropsWithoutRef<'textarea'>['rows']) {
  if (typeof rows !== 'number' || Number.isNaN(rows)) {
    return TEXT_AREA_DEFAULT_ROWS;
  }

  return Math.max(1, Math.floor(rows));
}

function getFieldState({
  explicitState,
  hasError,
  hasValue,
  isFocused,
}: {
  explicitState?: TextAreaState;
  hasError: boolean;
  hasValue: boolean;
  isFocused: boolean;
}) {
  if (hasError) {
    return 'error';
  }

  if (explicitState === 'success' && hasValue && !isFocused) {
    return 'success';
  }

  if (explicitState === 'success' && isFocused) {
    return 'default';
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

export function TextArea({
  label,
  size = 'large',
  error,
  hint,
  counter,
  clearable = true,
  state: explicitState,
  containerClassName = '',
  labelClassName = '',
  fieldClassName = '',
  className = '',
  id,
  disabled,
  rows = TEXT_AREA_DEFAULT_ROWS,
  style,
  value,
  onChange,
  onFocus,
  onBlur,
  ...textareaProps
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(error);
  const descriptionId = id && (error || hint) ? `${id}-description` : undefined;
  const safeRows = getSafeRows(rows);
  const stringValue = value == null ? '' : String(value);
  const hasValue = stringValue.length > 0;
  const fieldState = getFieldState({
    explicitState,
    hasError,
    hasValue,
    isFocused,
  });
  const showClearButton = clearable && hasValue && !disabled && isFocused;
  const showSuccessIcon =
    explicitState === 'success' &&
    hasValue &&
    !isFocused &&
    !disabled &&
    !hasError;

  const handleClear = () => {
    if (!onChange) return;

    onChange({
      target: { value: '' },
      currentTarget: { value: '' },
    } as ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <div
      className={['flex w-full flex-col gap-[8px]', containerClassName]
        .filter(Boolean)
        .join(' ')}
      style={getFieldSizeStyle(size)}
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
            className="shrink-0 font-sans text-[length:var(--field-supporting-font-size)] font-semibold leading-[120%] tracking-[0.12px]"
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
        <textarea
          id={id}
          disabled={disabled}
          rows={safeRows}
          value={value}
          onChange={onChange}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          aria-invalid={hasError || undefined}
          aria-describedby={descriptionId}
          className={[
            textareaBaseClassName,
            showClearButton || showSuccessIcon ? 'pr-[length:var(--field-icon-slot-width)]' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            minHeight: getMinHeightForRows(size, safeRows),
            ...style,
          }}
          {...textareaProps}
        />

        {showClearButton ? (
          <InputClearButton onClick={handleClear} placement="corner" />
        ) : showSuccessIcon ? (
          <InputCheckIndicator placement="corner" />
        ) : null}
      </div>

      {error || hint ? (
        <p
          id={descriptionId}
          className={[
            TEXT_TRIM_CLASS_NAME,
            'px-[2px] font-sans text-[length:var(--field-supporting-font-size)] font-semibold leading-[150%]',
          ].join(' ')}
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
