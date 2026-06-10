import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import {
  getRadioSizeStyle,
  type RadioSize,
} from './checkboxSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

type RadioCssVariables = CSSProperties & {
  '--radio-box-bg': string;
  '--radio-dot-color': string;
  '--radio-label-color': string;
};

const RADIO_STYLES: Record<
  'unchecked' | 'checked' | 'disabled-unchecked' | 'disabled-checked',
  RadioCssVariables
> = {
  unchecked: {
    '--radio-box-bg': COLOR_TOKENS.neutral[75],
    '--radio-dot-color': COLOR_TOKENS.base.white,
    '--radio-label-color': COLOR_TOKENS.neutral[900],
  },
  checked: {
    '--radio-box-bg': COLOR_TOKENS.primary[500],
    '--radio-dot-color': COLOR_TOKENS.base.white,
    '--radio-label-color': COLOR_TOKENS.neutral[900],
  },
  'disabled-unchecked': {
    '--radio-box-bg': COLOR_TOKENS.neutral[75],
    '--radio-dot-color': COLOR_TOKENS.neutral[200],
    '--radio-label-color': COLOR_TOKENS.neutral[200],
  },
  'disabled-checked': {
    '--radio-box-bg': COLOR_TOKENS.neutral[75],
    '--radio-dot-color': COLOR_TOKENS.neutral[200],
    '--radio-label-color': COLOR_TOKENS.neutral[200],
  },
};

type RadioProps = {
  checked: boolean;
  onChange: () => void;
  label?: ReactNode;
  size?: RadioSize;
  id?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
};

export function Radio({
  checked,
  onChange,
  label,
  size = 'medium',
  id,
  name,
  value,
  disabled = false,
  className = '',
}: RadioProps) {
  const styleKey = disabled
    ? checked
      ? 'disabled-checked'
      : 'disabled-unchecked'
    : checked
      ? 'checked'
      : 'unchecked';
  const stateStyle = RADIO_STYLES[styleKey];

  return (
    <label
      htmlFor={id}
      className={[
        'flex select-none items-center gap-[length:var(--radio-gap)]',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...getRadioSizeStyle(size),
        ...stateStyle,
      }}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange()}
        className="sr-only"
      />

      <div
        className="flex h-[length:var(--radio-box-size)] w-[length:var(--radio-box-size)] shrink-0 items-center justify-center rounded-full transition-colors"
        style={{ backgroundColor: 'var(--radio-box-bg)' }}
      >
        {checked ? (
          <span
            className="rounded-full"
            style={{
              width: 'var(--radio-dot-size)',
              height: 'var(--radio-dot-size)',
              backgroundColor: 'var(--radio-dot-color)',
            }}
            aria-hidden
          />
        ) : null}
      </div>

      {label ? (
        <span
          className={[
            TEXT_TRIM_CLASS_NAME,
            'min-w-0 font-sans text-[length:var(--radio-label-font-size)] font-semibold leading-[130%]',
          ].join(' ')}
          style={{ color: 'var(--radio-label-color)' }}
        >
          {label}
        </span>
      ) : null}
    </label>
  );
}

type RadioGroupOption = {
  value: string;
  label: ReactNode;
  id?: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioGroupOption[];
  size?: RadioSize;
  className?: string;
};

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  size = 'medium',
  className = '',
}: RadioGroupProps) {
  return (
    <div className={['flex flex-col gap-[12px]', className].filter(Boolean).join(' ')}>
      {options.map((option) => (
        <Radio
          key={option.value}
          id={option.id ?? `${name}-${option.value}`}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          label={option.label}
          size={size}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
}

export type { RadioSize };
