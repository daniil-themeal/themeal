import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { FormLabel } from './FormLabel';

export const TEXT_AREA_STATES = ['default', 'focus', 'success', 'error'] as const;

export type TextAreaState = (typeof TEXT_AREA_STATES)[number];

type TextAreaProps = {
  label: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  counter?: ReactNode;
  state?: TextAreaState;
  containerClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'className'>;

type TextAreaCssVariables = CSSProperties & {
  '--text-area-bg': string;
  '--text-area-border': string;
  '--text-area-focus-border': string;
  '--text-area-text': string;
  '--text-area-placeholder': string;
};

type TextAreaTypographyVariables = CSSProperties & {
  '--text-area-font-size': string;
  '--text-area-supporting-font-size': string;
};

const TEXT_AREA_FONT_SIZE_PX = 16;
const TEXT_AREA_LINE_HEIGHT_RATIO = 1.3;
const TEXT_AREA_VERTICAL_PADDING_PX = 14;
const TEXT_AREA_DEFAULT_ROWS = 4;

const textAreaTypographyStyle: TextAreaTypographyVariables = {
  '--text-area-font-size': FONT_SIZE_TOKENS[16],
  '--text-area-supporting-font-size': FONT_SIZE_TOKENS[12],
};

const FIELD_STATE_STYLES: Record<TextAreaState, TextAreaCssVariables> = {
  default: {
    '--text-area-bg': COLOR_TOKENS.neutral[50],
    '--text-area-border': 'transparent',
    '--text-area-focus-border': COLOR_TOKENS.neutral[300],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.neutral[200],
  },

  focus: {
    '--text-area-bg': COLOR_TOKENS.neutral[50],
    '--text-area-border': COLOR_TOKENS.neutral[300],
    '--text-area-focus-border': COLOR_TOKENS.neutral[300],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.neutral[200],
  },

  success: {
    '--text-area-bg': COLOR_TOKENS.success[50],
    '--text-area-border': 'transparent',
    '--text-area-focus-border': COLOR_TOKENS.neutral[300],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.neutral[200],
  },

  error: {
    '--text-area-bg': COLOR_TOKENS.danger[50],
    '--text-area-border': 'transparent',
    '--text-area-focus-border': COLOR_TOKENS.neutral[300],
    '--text-area-text': COLOR_TOKENS.neutral[900],
    '--text-area-placeholder': COLOR_TOKENS.neutral[200],
  },
};

const fieldBaseClassName = [
  'w-full overflow-hidden rounded-[8px] border',
  'border-[var(--text-area-border)] bg-[var(--text-area-bg)]',
  'transition-colors',
  'focus-within:border-[var(--text-area-focus-border)]',
].join(' ');

const textareaBaseClassName = [
  "w-full resize-none bg-transparent px-[16px] py-[14px] font-['Quicksand']",
  'text-[length:var(--text-area-font-size)] font-semibold leading-[130%] text-[var(--text-area-text)]',
  'outline-none placeholder:text-[var(--text-area-placeholder)]',
  'disabled:cursor-not-allowed',
].join(' ');

function getMinHeightForRows(rows: number) {
  const lineHeightPx = TEXT_AREA_FONT_SIZE_PX * TEXT_AREA_LINE_HEIGHT_RATIO;

  return rows * lineHeightPx + TEXT_AREA_VERTICAL_PADDING_PX * 2;
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
}: {
  explicitState?: TextAreaState;
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

export function TextArea({
  label,
  error,
  hint,
  counter,
  state: explicitState,
  containerClassName = '',
  labelClassName = '',
  fieldClassName = '',
  className = '',
  id,
  disabled,
  rows = TEXT_AREA_DEFAULT_ROWS,
  style,
  ...textareaProps
}: TextAreaProps) {
  const hasError = Boolean(error);
  const fieldState = getFieldState({ explicitState, hasError });
  const descriptionId = id && (error || hint) ? `${id}-description` : undefined;
  const safeRows = getSafeRows(rows);

  return (
    <div
      className={['flex w-full flex-col gap-[8px]', containerClassName]
        .filter(Boolean)
        .join(' ')}
      style={textAreaTypographyStyle}
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
            className="font-['Quicksand'] text-[length:var(--text-area-supporting-font-size)] font-semibold leading-[120%] tracking-[0.12px]"
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
          aria-invalid={hasError || undefined}
          aria-describedby={descriptionId}
          className={[textareaBaseClassName, className].filter(Boolean).join(' ')}
          style={{
            minHeight: getMinHeightForRows(safeRows),
            ...style,
          }}
          {...textareaProps}
        />
      </div>

      {error || hint ? (
        <p
          id={descriptionId}
          className="px-[2px] font-['Quicksand'] text-[length:var(--text-area-supporting-font-size)] font-semibold leading-[150%]"
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