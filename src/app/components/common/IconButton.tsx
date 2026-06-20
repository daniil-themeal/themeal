import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';

import {
  getButtonStyles,
  getGhostButtonStyles,
  getIconSlotClassName,
  ICON_BUTTON_BORDER_RADIUS,
  ICON_BUTTON_SIZE_CLASS_NAMES,
  ICON_BUTTON_VISUAL_CLASS_NAME,
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

const SOFT_BUTTON_STYLES: Omit<IconButtonCssVariables, '--button-border-radius'> = {
  '--button-bg': COLOR_TOKENS.neutral[50],
  '--button-bg-hover': COLOR_TOKENS.neutral[75],
  '--button-text': COLOR_TOKENS.neutral[900],
  '--button-bg-disabled': COLOR_TOKENS.neutral[50],
  '--button-text-disabled': COLOR_TOKENS.neutral[300],
  '--button-border': 'transparent',
  '--button-border-hover': 'transparent',
  '--button-border-disabled': 'transparent',
  '--button-shadow': 'none',
  '--button-shadow-hover': 'none',
};

function getIconButtonSurfaceStyles({
  ghost,
  soft,
  variant,
  outline,
}: {
  ghost: boolean;
  soft: boolean;
  variant: ButtonVariant;
  outline: boolean;
}): Omit<IconButtonCssVariables, '--button-border-radius'> {
  if (ghost) return getGhostButtonStyles('neutral');
  if (soft) return SOFT_BUTTON_STYLES;
  return getButtonStyles(variant, outline);
}

type IconButtonProps = {
  icon: ReactNode;
  'aria-label': string;
  variant?: ButtonVariant;
  outline?: boolean;
  ghost?: boolean;
  soft?: boolean;
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
    soft = false,
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
        ...getIconButtonSurfaceStyles({ ghost, soft, variant, outline }),
        '--button-border-radius': ICON_BUTTON_BORDER_RADIUS,
        ...style,
      }}
      className={[
        ICON_BUTTON_VISUAL_CLASS_NAME,
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
