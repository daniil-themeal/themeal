import * as SelectPrimitive from '@radix-ui/react-select';
import { useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import {
  FIELD_SIZE_CONFIG,
  getFieldSizeStyle,
  type FieldSize,
} from './fieldSizeTokens';
import { FormLabel } from './FormLabel';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const DROPDOWN_STATES = ['default', 'focus', 'success', 'error'] as const;
export type DropdownState = (typeof DROPDOWN_STATES)[number];

type DropdownCssVariables = CSSProperties & {
  '--dropdown-bg': string;
  '--dropdown-border': string;
  '--dropdown-open-border': string;
  '--dropdown-text': string;
  '--dropdown-placeholder': string;
  '--dropdown-icon': string;
};

const FIELD_STATE_STYLES: Record<DropdownState, DropdownCssVariables> = {
  default: {
    '--dropdown-bg': COLOR_TOKENS.neutral[50],
    '--dropdown-border': 'transparent',
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
  },
  focus: {
    '--dropdown-bg': COLOR_TOKENS.neutral[50],
    '--dropdown-border': COLOR_TOKENS.neutral[300],
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
  },
  success: {
    '--dropdown-bg': COLOR_TOKENS.success[50],
    '--dropdown-border': 'transparent',
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
  },
  error: {
    '--dropdown-bg': COLOR_TOKENS.danger[50],
    '--dropdown-border': 'transparent',
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
  },
};

function ChevronIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="transition-transform duration-150 group-data-[state=open]:rotate-180"
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8l3.5 3.5 6.5-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconSlotClassName = [
  'flex w-[length:var(--field-icon-slot-width)] shrink-0 self-stretch items-center justify-center',
  '[&>svg]:h-[length:var(--field-icon-size)] [&>svg]:w-[length:var(--field-icon-size)] [&>svg]:shrink-0',
].join(' ');

const MOBILE_MAX_WIDTH_MQ = '(max-width: 767px)';

function subscribeMaxMd(onStoreChange: () => void) {
  const mq = window.matchMedia(MOBILE_MAX_WIDTH_MQ);
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function useMaxMdViewport() {
  return useSyncExternalStore(
    subscribeMaxMd,
    () => window.matchMedia(MOBILE_MAX_WIDTH_MQ).matches,
    () => false,
  );
}

type DropdownFieldProps = {
  id?: string;
  descriptionId?: string;
  hasError: boolean;
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: DropdownOption[];
  leftIcon?: ReactNode;
  chevronSize: number;
  checkIconSize: number;
  size: FieldSize;
  fieldClassName: string;
};

function NativeSelectField({
  id,
  descriptionId,
  hasError,
  disabled,
  value,
  onChange,
  placeholder,
  options,
  leftIcon,
  chevronSize,
  fieldClassName,
}: DropdownFieldProps) {
  return (
    <div
      className={[
        'relative flex w-full items-stretch rounded-[length:var(--field-border-radius)] border',
        'border-[var(--dropdown-border)] bg-[var(--dropdown-bg)]',
        fieldClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {leftIcon ? (
        <span className={iconSlotClassName} style={{ color: 'var(--dropdown-icon)' }}>
          {leftIcon}
        </span>
      ) : null}

      <select
        id={id}
        aria-describedby={descriptionId}
        aria-invalid={hasError || undefined}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={[
          TEXT_TRIM_CLASS_NAME,
          'h-[length:var(--field-height)] min-w-0 flex-1 appearance-none bg-transparent outline-none',
          'font-sans text-[length:var(--field-font-size)] font-semibold leading-[130%]',
          value ? 'text-[var(--dropdown-text)]' : 'text-[var(--dropdown-placeholder)]',
          leftIcon
            ? 'pr-[length:var(--field-horizontal-padding)]'
            : 'pl-[length:var(--field-horizontal-padding)]',
          'pr-[length:var(--field-icon-slot-width)]',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        ].join(' ')}
      >
        <option value="" disabled={Boolean(value)}>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      <span
        className={[iconSlotClassName, 'pointer-events-none absolute right-0 top-0'].join(' ')}
        style={{ color: 'var(--dropdown-icon)' }}
        aria-hidden
      >
        <ChevronIcon size={chevronSize} />
      </span>
    </div>
  );
}

function RadixSelectField({
  id,
  descriptionId,
  hasError,
  disabled,
  value,
  onChange,
  placeholder,
  options,
  leftIcon,
  chevronSize,
  checkIconSize,
  size,
  fieldClassName,
}: DropdownFieldProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        id={id}
        aria-describedby={descriptionId}
        aria-invalid={hasError || undefined}
        className={[
          'group flex w-full items-stretch rounded-[length:var(--field-border-radius)] border outline-none',
          'border-[var(--dropdown-border)] bg-[var(--dropdown-bg)]',
          'transition-colors',
          'data-[state=open]:border-[var(--dropdown-open-border)]',
          'focus-visible:border-[var(--dropdown-open-border)]',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          fieldClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {leftIcon ? (
          <span className={iconSlotClassName} style={{ color: 'var(--dropdown-icon)' }}>
            {leftIcon}
          </span>
        ) : null}

        <span
          className={[
            TEXT_TRIM_CLASS_NAME,
            'flex h-[length:var(--field-height)] min-w-0 flex-1 items-center text-left font-sans text-[length:var(--field-font-size)] font-semibold leading-[130%]',
            leftIcon
              ? 'pr-[length:var(--field-horizontal-padding)]'
              : 'pl-[length:var(--field-horizontal-padding)]',
          ].join(' ')}
          style={{
            color: value ? 'var(--dropdown-text)' : 'var(--dropdown-placeholder)',
          }}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
        </span>

        <SelectPrimitive.Icon asChild>
          <span
            className={[iconSlotClassName, 'pointer-events-none'].join(' ')}
            style={{ color: 'var(--dropdown-icon)' }}
          >
            <ChevronIcon size={chevronSize} />
          </span>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className="z-[300] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[length:var(--field-border-radius)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          style={{
            ...getFieldSizeStyle(size),
            backgroundColor: COLOR_TOKENS.base.white,
            boxShadow: '0 12px 32px rgba(47,56,70,0.16)',
          }}
        >
          <SelectPrimitive.Viewport>
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="flex h-[length:var(--field-height)] w-full cursor-pointer select-none items-center justify-between px-[length:var(--field-horizontal-padding)] outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-[var(--item-hover-bg)] data-[disabled]:opacity-40"
                style={
                  {
                    '--item-hover-bg': COLOR_TOKENS.neutral[50],
                    color: COLOR_TOKENS.neutral[900],
                  } as CSSProperties
                }
              >
                <SelectPrimitive.ItemText>
                  <span
                    className={[
                      TEXT_TRIM_CLASS_NAME,
                      'font-sans text-[length:var(--field-font-size)] font-semibold leading-[130%]',
                    ].join(' ')}
                  >
                    {opt.label}
                  </span>
                </SelectPrimitive.ItemText>

                <SelectPrimitive.ItemIndicator>
                  <span style={{ color: COLOR_TOKENS.primary[500] }}>
                    <CheckIcon size={checkIconSize} />
                  </span>
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

type DropdownProps = {
  label: ReactNode;
  size?: FieldSize;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  leftIcon?: ReactNode;
  state?: DropdownState;
  hint?: ReactNode;
  error?: ReactNode;
  id?: string;
  disabled?: boolean;
  /** Use the OS-native picker on viewports below the md breakpoint (768px). */
  nativeOnMobile?: boolean;
  containerClassName?: string;
  fieldClassName?: string;
};

export function Dropdown({
  label,
  size = 'large',
  options,
  value,
  onChange,
  placeholder = 'Select…',
  leftIcon,
  state: explicitState,
  hint,
  error,
  id,
  disabled = false,
  nativeOnMobile = false,
  containerClassName = '',
  fieldClassName = '',
}: DropdownProps) {
  const hasError = Boolean(error);
  const fieldState = hasError ? 'error' : (explicitState ?? 'default');
  const fieldVars = FIELD_STATE_STYLES[fieldState];
  const descriptionId = id && (error || hint) ? `${id}-description` : undefined;
  const sizeConfig = FIELD_SIZE_CONFIG[size];
  const chevronSize = sizeConfig.iconSizePx;
  const checkIconSize = Math.min(sizeConfig.iconSizePx, 20);
  const isMaxMd = useMaxMdViewport();
  const useNativeSelect = nativeOnMobile && isMaxMd && !leftIcon;

  const fieldProps: DropdownFieldProps = {
    id,
    descriptionId,
    hasError: hasError,
    disabled,
    value,
    onChange,
    placeholder,
    options,
    leftIcon,
    chevronSize,
    checkIconSize,
    size,
    fieldClassName,
  };

  return (
    <div
      className={['flex w-full flex-col gap-[8px]', containerClassName].filter(Boolean).join(' ')}
      style={{
        ...getFieldSizeStyle(size),
        ...fieldVars,
      }}
    >
      <FormLabel as="label" htmlFor={id} className="px-[2px]">
        {label}
      </FormLabel>

      {useNativeSelect ? (
        <NativeSelectField {...fieldProps} />
      ) : (
        <RadixSelectField {...fieldProps} />
      )}

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
