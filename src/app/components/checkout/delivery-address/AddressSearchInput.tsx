import type { CSSProperties, KeyboardEvent } from 'react';

import { COLOR_TOKENS } from '../../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../../common/fontSizeTokens';

import { ClearIcon } from './addressIcons';

type AddressSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
};

type AddressSearchInputCssVariables = CSSProperties & {
  '--address-search-bg': string;
  '--address-search-ring': string;
  '--address-search-focus-ring': string;
  '--address-search-text': string;
  '--address-search-placeholder': string;
  '--address-search-font-size': string;
};

const addressSearchInputStyle: AddressSearchInputCssVariables = {
  '--address-search-bg': COLOR_TOKENS.neutral[50],
  '--address-search-ring': COLOR_TOKENS.neutral[200],
  '--address-search-focus-ring': COLOR_TOKENS.primary[500],
  '--address-search-text': COLOR_TOKENS.neutral[900],
  '--address-search-placeholder': COLOR_TOKENS.neutral[200],
  '--address-search-font-size': FONT_SIZE_TOKENS[16],
};

export function AddressSearchInput({
  value,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  autoFocus = false,
  placeholder = 'Type your address',
}: AddressSearchInputProps) {
  return (
    <div
      className="flex h-[48px] items-center rounded-[8px] bg-[var(--address-search-bg)] px-[16px] ring-1 ring-[var(--address-search-ring)] focus-within:ring-2 focus-within:ring-[var(--address-search-focus-ring)]"
      style={addressSearchInputStyle}
    >
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent font-['Quicksand:SemiBold',sans-serif] text-[length:var(--address-search-font-size)] leading-[1.4] text-[var(--address-search-text)] outline-none placeholder:text-[var(--address-search-placeholder)]"
      />

      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="ml-[12px] flex size-[24px] shrink-0 cursor-pointer items-center justify-center"
          aria-label="Clear address"
        >
          <ClearIcon />
        </button>
      ) : null}
    </div>
  );
}
