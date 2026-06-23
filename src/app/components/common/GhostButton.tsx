import type { ButtonHTMLAttributes, ReactNode } from 'react';

import {
  BUTTON_VISUAL_BASE_CLASS_NAMES,
  getGhostButtonStyles,
  type ButtonVariant,
} from './Button';
import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export const GHOST_BUTTON_SIZES = ['small', 'medium', 'large'] as const;

export type GhostButtonSize = (typeof GHOST_BUTTON_SIZES)[number];

const GHOST_BUTTON_SIZE_STYLES: Record<
  GhostButtonSize,
  { fontSize: string; iconClassName: string; paddingClassName: string }
> = {
  small: {
    fontSize: FONT_SIZE_TOKENS[12],
    iconClassName: '[&>svg]:size-[16px] [&>img]:size-[16px]',
    paddingClassName: 'px-[8px] py-[4px]',
  },
  medium: {
    fontSize: FONT_SIZE_TOKENS[14],
    iconClassName: '[&>svg]:size-[20px] [&>img]:size-[20px]',
    paddingClassName: 'px-[10px] py-[6px]',
  },
  large: {
    fontSize: FONT_SIZE_TOKENS[20],
    iconClassName: '[&>svg]:size-[20px] [&>img]:size-[20px]',
    paddingClassName: 'min-h-[48px] px-[12px] py-[10px]',
  },
};

const ghostButtonVisualClassName = [
  ...BUTTON_VISUAL_BASE_CLASS_NAMES,
  'font-sans font-medium leading-[140%]',
].join(' ');

type GhostButtonIconProps =
  | { leftIcon?: ReactNode; rightIcon?: never }
  | { leftIcon?: never; rightIcon?: ReactNode }
  | { leftIcon?: never; rightIcon?: never };

type GhostButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: GhostButtonSize;
  fullWidth?: boolean;
  className?: string;
} & GhostButtonIconProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function GhostButton({
  children,
  variant = 'neutral',
  size = 'small',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  style,
  ...buttonProps
}: GhostButtonProps) {
  const sizeStyles = GHOST_BUTTON_SIZE_STYLES[size];
  const iconSlotClassName = [
    'inline-flex shrink-0 items-center justify-center',
    sizeStyles.iconClassName,
    '[&>svg]:shrink-0 [&>img]:shrink-0',
  ].join(' ');

  return (
    <button
      type={type}
      style={{
        ...getGhostButtonStyles(variant),
        '--button-font-size': sizeStyles.fontSize,
        '--button-border-radius': BORDER_RADIUS_TOKENS[8],
        ...style,
      }}
      className={[
        ghostButtonVisualClassName,
        'ds-ghost-button items-center gap-[4px]',
        fullWidth
          ? 'flex w-full justify-between'
          : 'inline-flex justify-center',
        sizeStyles.paddingClassName,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...buttonProps}
    >
      {leftIcon ? <span className={iconSlotClassName}>{leftIcon}</span> : null}
      <span
        className={[TEXT_TRIM_CLASS_NAME, 'min-w-0 text-[length:var(--button-font-size)]'].join(' ')}
      >
        {children}
      </span>
      {rightIcon ? <span className={iconSlotClassName}>{rightIcon}</span> : null}
    </button>
  );
}
