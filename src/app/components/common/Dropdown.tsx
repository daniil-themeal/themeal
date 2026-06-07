import * as SelectPrimitive from '@radix-ui/react-select';
import { Fragment } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { Divider } from './Divider';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { FormLabel } from './FormLabel';

// ─── Types ────────────────────────────────────────────────────────────────────

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export const DROPDOWN_STATES = ['default', 'focus', 'success', 'error'] as const;
export type DropdownState = (typeof DROPDOWN_STATES)[number];

// ─── Tokens ───────────────────────────────────────────────────────────────────

type DropdownCssVariables = CSSProperties & {
  '--dropdown-bg': string;
  '--dropdown-border': string;
  '--dropdown-open-border': string;
  '--dropdown-text': string;
  '--dropdown-placeholder': string;
  '--dropdown-icon': string;
  '--dropdown-font-size': string;
  '--dropdown-supporting-font-size': string;
};

const FIELD_STATE_STYLES: Record<DropdownState, DropdownCssVariables> = {
  default: {
    '--dropdown-bg': COLOR_TOKENS.neutral[50],
    '--dropdown-border': 'transparent',
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
    '--dropdown-font-size': FONT_SIZE_TOKENS[16],
    '--dropdown-supporting-font-size': FONT_SIZE_TOKENS[12],
  },
  focus: {
    '--dropdown-bg': COLOR_TOKENS.neutral[50],
    '--dropdown-border': COLOR_TOKENS.neutral[300],
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
    '--dropdown-font-size': FONT_SIZE_TOKENS[16],
    '--dropdown-supporting-font-size': FONT_SIZE_TOKENS[12],
  },
  success: {
    '--dropdown-bg': COLOR_TOKENS.success[50],
    '--dropdown-border': 'transparent',
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
    '--dropdown-font-size': FONT_SIZE_TOKENS[16],
    '--dropdown-supporting-font-size': FONT_SIZE_TOKENS[12],
  },
  error: {
    '--dropdown-bg': COLOR_TOKENS.danger[50],
    '--dropdown-border': 'transparent',
    '--dropdown-open-border': COLOR_TOKENS.neutral[300],
    '--dropdown-text': COLOR_TOKENS.neutral[900],
    '--dropdown-placeholder': COLOR_TOKENS.neutral[200],
    '--dropdown-icon': COLOR_TOKENS.neutral[400],
    '--dropdown-font-size': FONT_SIZE_TOKENS[16],
    '--dropdown-supporting-font-size': FONT_SIZE_TOKENS[12],
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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

// ─── Icon slot (shared with TextInput proportions) ────────────────────────────

const iconSlotCls =
  'flex w-[48px] shrink-0 self-stretch items-center justify-center [&>svg]:h-[24px] [&>svg]:w-[24px] [&>svg]:shrink-0';

// ─── Props ────────────────────────────────────────────────────────────────────

type DropdownProps = {
  label: ReactNode;
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
  containerClassName?: string;
  fieldClassName?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Dropdown({
  label,
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
  containerClassName = '',
  fieldClassName = '',
}: DropdownProps) {
  const hasError = Boolean(error);
  const fieldState = hasError ? 'error' : (explicitState ?? 'default');
  const fieldVars = FIELD_STATE_STYLES[fieldState];
  const descriptionId = id && (error || hint) ? `${id}-description` : undefined;

  return (
    <div
      className={['flex w-full flex-col gap-[8px]', containerClassName].filter(Boolean).join(' ')}
      style={fieldVars}
    >
      {/* Label */}
      <div className="px-[2px]">
        <FormLabel as="label" htmlFor={id} className="flex-1">
          {label}
        </FormLabel>
      </div>

      {/* Field */}
      <SelectPrimitive.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          id={id}
          aria-describedby={descriptionId}
          aria-invalid={hasError || undefined}
          className={[
            'group flex w-full items-stretch overflow-hidden rounded-[8px] border outline-none',
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
          {/* Left icon */}
          {leftIcon ? (
            <span
              className={iconSlotCls}
              style={{ color: 'var(--dropdown-icon)' }}
            >
              {leftIcon}
            </span>
          ) : null}

          {/* Value / placeholder */}
          <span
            className="flex h-[48px] min-w-0 flex-1 items-center px-[16px] text-left font-['Quicksand'] text-[length:var(--dropdown-font-size)] font-semibold leading-[130%]"
            style={{
              color: value ? 'var(--dropdown-text)' : 'var(--dropdown-placeholder)',
              paddingLeft: leftIcon ? '0' : undefined,
            }}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>

          {/* Chevron */}
          <SelectPrimitive.Icon asChild>
            <span
              className={[iconSlotCls, 'pointer-events-none'].join(' ')}
              style={{ color: 'var(--dropdown-icon)' }}
            >
              <ChevronIcon />
            </span>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        {/* Dropdown content */}
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-[300] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[12px] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
            style={{
              backgroundColor: COLOR_TOKENS.base.white,
              boxShadow: '0 12px 32px rgba(47,56,70,0.16)',
            }}
          >
            <SelectPrimitive.Viewport>
              {options.map((opt, index) => (
                <Fragment key={opt.value}>
                  {index > 0 && (
                    <div aria-hidden>
                      <Divider color={COLOR_TOKENS.neutral[100]} />
                    </div>
                  )}
                  <SelectPrimitive.Item
                    value={opt.value}
                    disabled={opt.disabled}
                    className="flex w-full cursor-pointer select-none items-center justify-between px-[16px] py-[12px] outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-[var(--item-hover-bg)] data-[disabled]:opacity-40"
                    style={
                      {
                        '--item-hover-bg': COLOR_TOKENS.neutral[50],
                        color: COLOR_TOKENS.neutral[900],
                      } as CSSProperties
                    }
                  >
                    <SelectPrimitive.ItemText>
                      <span className="font-['Quicksand'] text-[length:var(--dropdown-font-size)] font-semibold leading-[130%]">
                        {opt.label}
                      </span>
                    </SelectPrimitive.ItemText>

                    <SelectPrimitive.ItemIndicator>
                      <span style={{ color: COLOR_TOKENS.primary[500] }}>
                        <CheckIcon />
                      </span>
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                </Fragment>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {/* Error / hint */}
      {error || hint ? (
        <p
          id={descriptionId}
          className="px-[2px] font-['Quicksand'] text-[length:var(--dropdown-supporting-font-size)] font-semibold leading-[150%]"
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
