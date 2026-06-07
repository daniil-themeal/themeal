import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';

type CheckboxCssVariables = CSSProperties & {
  '--checkbox-box-bg': string;
  '--checkbox-check-color': string;
  '--checkbox-label-color': string;
  '--checkbox-label-font-size': string;
};

const CHECKBOX_STYLES: Record<'unchecked' | 'checked' | 'disabled-unchecked' | 'disabled-checked', CheckboxCssVariables> = {
  unchecked: {
    '--checkbox-box-bg': COLOR_TOKENS.neutral[75],
    '--checkbox-check-color': COLOR_TOKENS.base.white,
    '--checkbox-label-color': COLOR_TOKENS.neutral[900],
    '--checkbox-label-font-size': FONT_SIZE_TOKENS[16],
  },
  checked: {
    '--checkbox-box-bg': COLOR_TOKENS.primary[500],
    '--checkbox-check-color': COLOR_TOKENS.base.white,
    '--checkbox-label-color': COLOR_TOKENS.neutral[900],
    '--checkbox-label-font-size': FONT_SIZE_TOKENS[16],
  },
  'disabled-unchecked': {
    '--checkbox-box-bg': COLOR_TOKENS.neutral[75],
    '--checkbox-check-color': COLOR_TOKENS.neutral[200],
    '--checkbox-label-color': COLOR_TOKENS.neutral[200],
    '--checkbox-label-font-size': FONT_SIZE_TOKENS[16],
  },
  'disabled-checked': {
    '--checkbox-box-bg': COLOR_TOKENS.neutral[75],
    '--checkbox-check-color': COLOR_TOKENS.neutral[200],
    '--checkbox-label-color': COLOR_TOKENS.neutral[200],
    '--checkbox-label-font-size': FONT_SIZE_TOKENS[16],
  },
};

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
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
  id?: string;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  onChange,
  label,
  id,
  disabled = false,
  className = '',
}: CheckboxProps) {
  const styleKey = disabled
    ? checked ? 'disabled-checked' : 'disabled-unchecked'
    : checked ? 'checked' : 'unchecked';
  const style = CHECKBOX_STYLES[styleKey];

  return (
    <label
      htmlFor={id}
      className={[
        'flex select-none items-center gap-[8px]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Box */}
      <div
        className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] transition-colors"
        style={{ backgroundColor: 'var(--checkbox-box-bg)' }}
      >
        {checked ? <CheckMark /> : null}
      </div>

      {/* Label */}
      {label ? (
        <span
          className="overflow-hidden text-ellipsis font-['Quicksand'] text-[length:var(--checkbox-label-font-size)] font-semibold leading-[130%]"
          style={{ color: 'var(--checkbox-label-color)' }}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
}
