import { useState } from 'react';
import type { ChangeEvent, ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import {
  FIELD_CLEAR_ERROR_STYLES,
  FIELD_CLEAR_NEUTRAL_STYLES,
  FIELD_CLEAR_SUCCESS_STYLES,
  type FieldClearCssVariables,
} from './fieldClearTokens';
import { getFieldSizeStyle, type FieldSize } from './fieldSizeTokens';
import { FormLabel } from './FormLabel';
import { InputCheckIndicator } from './InputCheckIndicator';
import { InputClearButton } from './InputClearButton';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export const TEXT_INPUT_STATES = ['default', 'focus', 'success', 'error'] as const;

export type TextInputState = (typeof TEXT_INPUT_STATES)[number];

type TextInputBaseProps = {
  label: ReactNode;
  size?: FieldSize;
  error?: ReactNode;
  hint?: ReactNode;
  counter?: ReactNode;
  state?: TextInputState;
  clearable?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  className?: string;
};

type TextInputIconProps =
  | { leftIcon?: ReactNode; rightIcon?: never }
  | { leftIcon?: never; rightIcon?: ReactNode }
  | { leftIcon?: never; rightIcon?: never };

type TextInputProps = TextInputBaseProps &
  TextInputIconProps &
  Omit<ComponentPropsWithoutRef<'input'>, 'className'>;

type TextInputCssVariables = CSSProperties &
  FieldClearCssVariables & {
    '--text-input-bg': string;
    '--text-input-border': string;
    '--text-input-focus-border': string;
    '--text-input-text': string;
    '--text-input-placeholder': string;
  };

const FIELD_STATE_STYLES: Record<TextInputState, TextInputCssVariables> = {
  default: {
    ...FIELD_CLEAR_NEUTRAL_STYLES,
    '--text-input-bg': COLOR_TOKENS.neutral[50],
    '--text-input-border': 'transparent',
    '--text-input-focus-border': COLOR_TOKENS.neutral[300],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.neutral[200],
  },

  focus: {
    ...FIELD_CLEAR_NEUTRAL_STYLES,
    '--text-input-bg': COLOR_TOKENS.neutral[50],
    '--text-input-border': COLOR_TOKENS.neutral[300],
    '--text-input-focus-border': COLOR_TOKENS.neutral[300],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.neutral[200],
  },

  success: {
    ...FIELD_CLEAR_SUCCESS_STYLES,
    '--text-input-bg': COLOR_TOKENS.neutral[50],
    '--text-input-border': 'transparent',
    '--text-input-focus-border': COLOR_TOKENS.neutral[300],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.neutral[200],
  },

  error: {
    ...FIELD_CLEAR_ERROR_STYLES,
    '--text-input-bg': COLOR_TOKENS.danger[50],
    '--text-input-border': 'transparent',
    '--text-input-focus-border': COLOR_TOKENS.danger[200],
    '--text-input-text': COLOR_TOKENS.neutral[900],
    '--text-input-placeholder': COLOR_TOKENS.danger[200],
  },
};

const fieldBaseClassName = [
  'box-border flex h-[length:var(--field-height)] w-full items-stretch rounded-[length:var(--field-border-radius)] border',
  'border-[var(--text-input-border)] bg-[var(--text-input-bg)]',
  'transition-colors',
  'focus-within:border-[var(--text-input-focus-border)]',
].join(' ');

const inputBaseClassName = [
  'h-full min-h-0 min-w-0 flex-1 bg-transparent font-sans',
  'text-[length:var(--field-font-size)] font-semibold leading-normal text-[var(--text-input-text)]',
  'outline-none placeholder:text-[var(--text-input-placeholder)]',
  'disabled:cursor-not-allowed',
].join(' ');

function getInputPaddingClassName({
  leftIcon,
  rightIcon,
}: {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}) {
  if (leftIcon && rightIcon) {
    return '';
  }

  if (leftIcon) {
    return 'pr-[length:var(--field-horizontal-padding)]';
  }

  if (rightIcon) {
    return 'pl-[length:var(--field-horizontal-padding)]';
  }

  return 'px-[length:var(--field-horizontal-padding)]';
}

const iconSlotClassName = [
  'flex w-[length:var(--field-icon-slot-width)] shrink-0 self-stretch items-center justify-center',
  '[&>svg]:h-[length:var(--field-icon-size)] [&>svg]:w-[length:var(--field-icon-size)] [&>svg]:shrink-0',
  '[&>img]:h-[length:var(--field-icon-size)] [&>img]:w-[length:var(--field-icon-size)] [&>img]:shrink-0',
].join(' ');

function getFieldState({
  explicitState,
  hasError,
  hasValue,
  isFocused,
}: {
  explicitState?: TextInputState;
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

export function TextInput({
  label,
  size = 'large',
  error,
  hint,
  counter,
  leftIcon,
  rightIcon,
  clearable = true,
  state: explicitState,
  containerClassName = '',
  labelClassName = '',
  fieldClassName = '',
  className = '',
  id,
  disabled,
  style,
  value,
  onChange,
  type,
  onFocus,
  onBlur,
  ...inputProps
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(error);
  const descriptionId = id && (error || hint) ? `${id}-description` : undefined;
  const showLabelRow = Boolean(label) || Boolean(counter);
  const stringValue = value == null ? '' : String(value);
  const hasValue = stringValue.length > 0;
  const fieldState = getFieldState({
    explicitState,
    hasError,
    hasValue,
    isFocused,
  });
  const isClearableType = type !== 'tel' && type !== 'password';
  const showClearButton =
    clearable && hasValue && !disabled && isClearableType && isFocused;
  const showSuccessIcon =
    explicitState === 'success' &&
    hasValue &&
    !isFocused &&
    !disabled &&
    !hasError &&
    !rightIcon;

  const handleClear = () => {
    if (!onChange) return;

    onChange({
      target: { value: '' },
      currentTarget: { value: '' },
    } as ChangeEvent<HTMLInputElement>);
  };

  const trailingSlot = showClearButton ? (
    <InputClearButton onClick={handleClear} />
  ) : showSuccessIcon ? (
    <InputCheckIndicator />
  ) : (
    rightIcon
  );

  return (
    <div
      className={[
        'flex w-full flex-col',
        showLabelRow ? 'gap-[8px]' : '',
        containerClassName,
      ]
        .filter(Boolean)
        .join(' ')}
      style={getFieldSizeStyle(size)}
    >
      {showLabelRow ? (
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
      ) : null}

      <div
        className={getFieldClassName({
          disabled,
          fieldClassName,
        })}
        style={FIELD_STATE_STYLES[fieldState]}
      >
        {leftIcon ? (
          <span
            className={iconSlotClassName}
            style={{ color: COLOR_TOKENS.neutral[500] }}
          >
            {leftIcon}
          </span>
        ) : null}

        <input
          id={id}
          disabled={disabled}
          type={type}
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
            inputBaseClassName,
            getInputPaddingClassName({ leftIcon, rightIcon: trailingSlot }),
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          style={style}
          {...inputProps}
        />

        {showClearButton ? (
          <InputClearButton onClick={handleClear} />
        ) : showSuccessIcon ? (
          <InputCheckIndicator />
        ) : rightIcon ? (
          <span
            className={iconSlotClassName}
            style={{ color: COLOR_TOKENS.neutral[500] }}
          >
            {rightIcon}
          </span>
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
