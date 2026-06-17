import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';

import {
  BUTTON_BORDER_RADIUS,
  BUTTON_VISUAL_CLASS_NAME,
  getButtonStyles,
  getIconSlotClassName,
  ICON_BUTTON_SIZE_CLASS_NAMES,
  LOADER_ICON_SIZE,
  type ButtonSize,
  type ButtonVariant,
} from './Button';
import { COLOR_TOKENS } from './colorTokens';
import { LoaderIcon } from './icons/feather/LoaderIcon';

type IconButtonCssVariables = CSSProperties & {
  '--button-bg': string;
  '--button-bg-hover': string;
  '--button-text': string;
  '--button-bg-disabled': string;
  '--button-text-disabled': string;
  '--button-border': string;
  '--button-border-hover': string;
  '--button-border-disabled': string;
  '--button-shadow': string;
  '--button-shadow-hover': string;
};

const GHOST_BUTTON_STYLES: Omit<IconButtonCssVariables, '--button-border-radius'> = {
  '--button-bg': 'transparent',
  '--button-bg-hover': COLOR_TOKENS.neutral[50],
  '--button-text': COLOR_TOKENS.neutral[500],
  '--button-bg-disabled': 'transparent',
  '--button-text-disabled': COLOR_TOKENS.neutral[300],
  '--button-border': 'transparent',
  '--button-border-hover': 'transparent',
  '--button-border-disabled': 'transparent',
  '--button-shadow': 'none',
  '--button-shadow-hover': 'none',
};

type IconButtonProps = {
  icon: ReactNode;
  'aria-label': string;
  variant?: ButtonVariant;
  outline?: boolean;
  ghost?: boolean;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children'>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    icon,
    'aria-label': ariaLabel,
    variant = 'primary',
    outline = false,
    ghost = false,
    size = 'medium',
    loading = false,
    className = '',
    type = 'button',
    style,
    disabled,
    ...buttonProps
  },
  ref,
) {
  const iconSlotClassName = getIconSlotClassName(size);
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      style={{
        ...(ghost ? GHOST_BUTTON_STYLES : getButtonStyles(variant, outline)),
        '--button-border-radius': BUTTON_BORDER_RADIUS[size],
        ...style,
      }}
      className={[
        BUTTON_VISUAL_CLASS_NAME,
        'shrink-0',
        ICON_BUTTON_SIZE_CLASS_NAMES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...buttonProps}
    >
      <span className={[iconSlotClassName, loading ? 'invisible' : ''].filter(Boolean).join(' ')}>
        {icon}
      </span>

      {loading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <LoaderIcon size={LOADER_ICON_SIZE[size]} className="animate-spin" />
        </span>
      ) : null}
    </button>
  );
});
