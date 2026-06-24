import type { ButtonHTMLAttributes, CSSProperties } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { XIcon } from './icons';
import { iconColorClassName, iconColorStyle, type IconColorTokenName } from './iconColorTokens';
import type { IconSize } from './icons/iconSize';

type CircularCloseButtonCssVariables = CSSProperties & {
  '--circular-close-bg': string;
  '--circular-close-bg-hover': string;
  '--circular-close-size': string;
};

export const CIRCULAR_CLOSE_BUTTON_STYLES: CircularCloseButtonCssVariables = {
  '--circular-close-bg': COLOR_TOKENS.neutral[50],
  '--circular-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--circular-close-size': '36px',
};

type CircularCloseButtonProps = {
  'aria-label': string;
  className?: string;
  circleClassName?: string;
  iconClassName?: string;
  iconSize?: IconSize;
  iconTone?: IconColorTokenName;
  style?: CSSProperties;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'onMouseDown' | 'disabled' | 'type' | 'tabIndex'
>;

export function CircularCloseButton({
  onClick,
  onMouseDown,
  'aria-label': ariaLabel,
  className = '',
  circleClassName = '',
  iconClassName,
  iconSize = 16,
  iconTone = 'emphasis',
  style,
  disabled,
  type = 'button',
  tabIndex,
}: CircularCloseButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={[
        'group flex size-[length:var(--circular-close-hit-area,56px)] shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...CIRCULAR_CLOSE_BUTTON_STYLES, ...style }}
    >
      <span
        className={[
          'flex size-[length:var(--circular-close-size)] items-center justify-center rounded-full',
          'bg-[var(--circular-close-bg)] transition-colors duration-150 group-hover:bg-[var(--circular-close-bg-hover)]',
          disabled ? 'opacity-40' : '',
          circleClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          className={iconClassName ?? iconColorClassName[iconTone]}
          style={iconClassName ? undefined : iconColorStyle[iconTone]}
        >
          <XIcon size={iconSize} />
        </span>
      </span>
    </button>
  );
}
