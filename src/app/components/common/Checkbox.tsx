import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import {
  CHECKBOX_SIZE_CONFIG,
  getCheckboxSizeStyle,
  type CheckboxSize,
} from './checkboxSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

type CheckboxCssVariables = CSSProperties & {
  '--checkbox-box-bg': string;
  '--checkbox-check-color': string;
  '--checkbox-label-color': string;
};

const CHECKBOX_STYLES: Record<
  'unchecked' | 'checked' | 'disabled-unchecked' | 'disabled-checked',
  CheckboxCssVariables
> = {
  unchecked: {
    '--checkbox-box-bg': COLOR_TOKENS.neutral[75],
    '--checkbox-check-color': COLOR_TOKENS.base.white,
    '--checkbox-label-color': COLOR_TOKENS.neutral[900],
  },
  checked: {
    '--checkbox-box-bg': COLOR_TOKENS.primary[500],
    '--checkbox-check-color': COLOR_TOKENS.base.white,
    '--checkbox-label-color': COLOR_TOKENS.neutral[900],
  },
  'disabled-unchecked': {
    '--checkbox-box-bg': COLOR_TOKENS.neutral[75],
    '--checkbox-check-color': COLOR_TOKENS.neutral[200],
    '--checkbox-label-color': COLOR_TOKENS.neutral[200],
  },
  'disabled-checked': {
    '--checkbox-box-bg': COLOR_TOKENS.neutral[75],
    '--checkbox-check-color': COLOR_TOKENS.neutral[200],
    '--checkbox-label-color': COLOR_TOKENS.neutral[200],
  },
};

function CheckMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2 6l3 3 5-5"
        stroke="var(--checkbox-check-color)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  size?: CheckboxSize;
  id?: string;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  onChange,
  label,
  size = 'medium',
  id,
  disabled = false,
  className = '',
}: CheckboxProps) {
  const styleKey = disabled
    ? checked
      ? 'disabled-checked'
      : 'disabled-unchecked'
    : checked
      ? 'checked'
      : 'unchecked';
  const stateStyle = CHECKBOX_STYLES[styleKey];
  const checkMarkSize = CHECKBOX_SIZE_CONFIG[size].checkMarkSizePx;

  return (
    <label
      htmlFor={id}
      className={[
        'flex select-none items-center gap-[length:var(--checkbox-gap)]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...getCheckboxSizeStyle(size),
        ...stateStyle,
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      <div
        className="flex h-[length:var(--checkbox-box-size)] w-[length:var(--checkbox-box-size)] shrink-0 items-center justify-center rounded-[length:var(--checkbox-border-radius)] transition-colors"
        style={{ backgroundColor: 'var(--checkbox-box-bg)' }}
      >
        {checked ? <CheckMark size={checkMarkSize} /> : null}
      </div>

      {label ? (
        <span
          className={[
            TEXT_TRIM_CLASS_NAME,
            'min-w-0 font-sans text-[length:var(--checkbox-label-font-size)] font-semibold leading-[130%]',
          ].join(' ')}
          style={{ color: 'var(--checkbox-label-color)' }}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
}
