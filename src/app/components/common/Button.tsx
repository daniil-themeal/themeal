import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { COLOR_TOKENS, type ColorPaletteName } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
  'blue',
] as const;

export const BUTTON_SIZES = ['32', '40', '48', '64', '80'] as const;

export const BUTTON_SIZE_LABELS: Record<(typeof BUTTON_SIZES)[number], string> = {
  '32': 'Small',
  '40': 'Medium',
  '48': 'Large',
  '64': 'Extra large',
  '80': 'Hero',
};

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export type ButtonSize = (typeof BUTTON_SIZES)[number];

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  outline?: boolean;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonIconProps =
  | { leftIcon?: ReactNode; rightIcon?: never }
  | { leftIcon?: never; rightIcon?: ReactNode }
  | { leftIcon?: never; rightIcon?: never };

type ButtonProps = ButtonBaseProps &
  ButtonIconProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonCssVariables = CSSProperties & {
  '--button-bg': string;
  '--button-bg-hover': string;
  '--button-text': string;
  '--button-bg-disabled': string;
  '--button-text-disabled': string;
  '--button-border': string;
  '--button-border-hover': string;
  '--button-border-disabled': string;
  '--button-font-size': string;
  '--button-border-radius': string;
};

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace('#', '');

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red},${green},${blue},${alpha})`;
}

const BUTTON_FILLED_STYLES: Record<ButtonVariant, Omit<ButtonCssVariables, '--button-font-size'>> = {
  primary: {
    '--button-bg': COLOR_TOKENS.primary[500],
    '--button-bg-hover': COLOR_TOKENS.primary[600],
    '--button-text': COLOR_TOKENS.base.white,
    '--button-bg-disabled': hexToRgba(COLOR_TOKENS.primary[500], 0.5),
    '--button-text-disabled': COLOR_TOKENS.base.white,
    '--button-border': COLOR_TOKENS.primary[500],
    '--button-border-hover': COLOR_TOKENS.primary[600],
    '--button-border-disabled': hexToRgba(COLOR_TOKENS.primary[500], 0.5),
  },

  secondary: {
    '--button-bg': COLOR_TOKENS.secondary[500],
    '--button-bg-hover': COLOR_TOKENS.secondary[600],
    '--button-text': COLOR_TOKENS.base.white,
    '--button-bg-disabled': hexToRgba(COLOR_TOKENS.secondary[500], 0.5),
    '--button-text-disabled': COLOR_TOKENS.base.white,
    '--button-border': COLOR_TOKENS.secondary[500],
    '--button-border-hover': COLOR_TOKENS.secondary[600],
    '--button-border-disabled': hexToRgba(COLOR_TOKENS.secondary[500], 0.5),
  },

  neutral: {
    '--button-bg': COLOR_TOKENS.neutral[75],
    '--button-bg-hover': COLOR_TOKENS.neutral[200],
    '--button-text': COLOR_TOKENS.neutral[900],
    '--button-bg-disabled': COLOR_TOKENS.neutral[75],
    '--button-text-disabled': hexToRgba(COLOR_TOKENS.neutral[900], 0.5),
    '--button-border': COLOR_TOKENS.neutral[75],
    '--button-border-hover': COLOR_TOKENS.neutral[200],
    '--button-border-disabled': COLOR_TOKENS.neutral[75],
  },

  success: {
    '--button-bg': COLOR_TOKENS.success[500],
    '--button-bg-hover': COLOR_TOKENS.success[600],
    '--button-text': COLOR_TOKENS.neutral[900],
    '--button-bg-disabled': hexToRgba(COLOR_TOKENS.success[500], 0.5),
    '--button-text-disabled': hexToRgba(COLOR_TOKENS.neutral[900], 0.5),
    '--button-border': COLOR_TOKENS.success[500],
    '--button-border-hover': COLOR_TOKENS.success[600],
    '--button-border-disabled': hexToRgba(COLOR_TOKENS.success[500], 0.5),
  },

  warning: {
    '--button-bg': COLOR_TOKENS.warning[500],
    '--button-bg-hover': COLOR_TOKENS.warning[600],
    '--button-text': COLOR_TOKENS.neutral[900],
    '--button-bg-disabled': hexToRgba(COLOR_TOKENS.warning[500], 0.5),
    '--button-text-disabled': hexToRgba(COLOR_TOKENS.neutral[900], 0.5),
    '--button-border': COLOR_TOKENS.warning[500],
    '--button-border-hover': COLOR_TOKENS.warning[600],
    '--button-border-disabled': hexToRgba(COLOR_TOKENS.warning[500], 0.5),
  },

  danger: {
    '--button-bg': COLOR_TOKENS.danger[500],
    '--button-bg-hover': COLOR_TOKENS.danger[600],
    '--button-text': COLOR_TOKENS.base.white,
    '--button-bg-disabled': hexToRgba(COLOR_TOKENS.danger[500], 0.5),
    '--button-text-disabled': COLOR_TOKENS.base.white,
    '--button-border': COLOR_TOKENS.danger[500],
    '--button-border-hover': COLOR_TOKENS.danger[600],
    '--button-border-disabled': hexToRgba(COLOR_TOKENS.danger[500], 0.5),
  },

  info: {
    '--button-bg': COLOR_TOKENS.info[500],
    '--button-bg-hover': COLOR_TOKENS.info[600],
    '--button-text': COLOR_TOKENS.base.white,
    '--button-bg-disabled': hexToRgba(COLOR_TOKENS.info[500], 0.5),
    '--button-text-disabled': COLOR_TOKENS.base.white,
    '--button-border': COLOR_TOKENS.info[500],
    '--button-border-hover': COLOR_TOKENS.info[600],
    '--button-border-disabled': hexToRgba(COLOR_TOKENS.info[500], 0.5),
  },

  blue: {
    '--button-bg': COLOR_TOKENS.blue[500],
    '--button-bg-hover': COLOR_TOKENS.blue[600],
    '--button-text': COLOR_TOKENS.base.white,
    '--button-bg-disabled': hexToRgba(COLOR_TOKENS.blue[500], 0.5),
    '--button-text-disabled': COLOR_TOKENS.base.white,
    '--button-border': COLOR_TOKENS.blue[500],
    '--button-border-hover': COLOR_TOKENS.blue[600],
    '--button-border-disabled': hexToRgba(COLOR_TOKENS.blue[500], 0.5),
  },
};

function getOutlineStyles(variant: ButtonVariant): Omit<ButtonCssVariables, '--button-font-size'> {
  if (variant === 'neutral') {
    return {
      '--button-bg': 'transparent',
      '--button-bg-hover': COLOR_TOKENS.neutral[50],
      '--button-text': COLOR_TOKENS.neutral[900],
      '--button-bg-disabled': 'transparent',
      '--button-text-disabled': hexToRgba(COLOR_TOKENS.neutral[900], 0.5),
      '--button-border': COLOR_TOKENS.neutral[200],
      '--button-border-hover': COLOR_TOKENS.neutral[300],
      '--button-border-disabled': hexToRgba(COLOR_TOKENS.neutral[200], 0.5),
    };
  }

  const palette = COLOR_TOKENS[variant as ColorPaletteName];
  const outlineText =
    variant === 'success' || variant === 'warning' ? palette[600] : palette[500];

  return {
    '--button-bg': 'transparent',
    '--button-bg-hover': palette[50],
    '--button-text': outlineText,
    '--button-bg-disabled': 'transparent',
    '--button-text-disabled': hexToRgba(palette[500], 0.5),
    '--button-border': palette[500],
    '--button-border-hover': palette[600],
    '--button-border-disabled': hexToRgba(palette[500], 0.5),
  };
}

function getButtonStyles(
  variant: ButtonVariant,
  outline: boolean,
): Omit<ButtonCssVariables, '--button-font-size'> {
  return outline ? getOutlineStyles(variant) : BUTTON_FILLED_STYLES[variant];
}

const BUTTON_BORDER_RADIUS: Record<ButtonSize, string> = {
  '32': BORDER_RADIUS_TOKENS[4],
  '40': BORDER_RADIUS_TOKENS[4],
  '48': BORDER_RADIUS_TOKENS[8],
  '64': BORDER_RADIUS_TOKENS[8],
  '80': BORDER_RADIUS_TOKENS[12],
};

const BUTTON_SIZE_CLASS_NAMES: Record<ButtonSize, string> = {
  '32': 'h-[32px] px-[12px] gap-[6px]',
  '40': 'h-[40px] px-[16px] gap-[8px]',
  '48': 'h-[48px] px-[20px] gap-[8px]',
  '64': 'h-[64px] px-[28px] gap-[10px]',
  '80': 'h-[80px] px-[32px] gap-[12px]',
};

const BUTTON_FONT_SIZE_TOKENS: Record<ButtonSize, string> = {
  '32': FONT_SIZE_TOKENS[12],
  '40': FONT_SIZE_TOKENS[14],
  '48': FONT_SIZE_TOKENS[16],
  '64': FONT_SIZE_TOKENS[20],
  '80': FONT_SIZE_TOKENS[25],
};

const ICON_SIZE_CLASS_NAMES: Record<ButtonSize, string> = {
  '32': '[&>svg]:size-[16px] [&>img]:size-[16px]',
  '40': '[&>svg]:size-[16px] [&>img]:size-[16px]',
  '48': '[&>svg]:size-[24px] [&>img]:size-[24px]',
  '64': '[&>svg]:size-[24px] [&>img]:size-[24px]',
  '80': '[&>svg]:size-[32px] [&>img]:size-[32px]',
};

const baseClassName = [
  'inline-flex items-center justify-center',
  'rounded-[length:var(--button-border-radius)]',
  'border border-[length:1px] border-[var(--button-border)]',
  "font-sans font-bold leading-none text-[length:var(--button-font-size)]",
  'bg-[var(--button-bg)] text-[var(--button-text)]',
  'cursor-pointer transition-colors',
  'hover:enabled:bg-[var(--button-bg-hover)] hover:enabled:border-[var(--button-border-hover)]',
  'disabled:cursor-not-allowed',
  'disabled:bg-[var(--button-bg-disabled)] disabled:text-[var(--button-text-disabled)] disabled:border-[var(--button-border-disabled)]',
  'focus-visible:outline-none',
].join(' ');

function getIconSlotClassName(size: ButtonSize) {
  return [
    'inline-flex shrink-0 items-center justify-center',
    ICON_SIZE_CLASS_NAMES[size],
    '[&>svg]:shrink-0 [&>img]:shrink-0',
  ].join(' ');
}

export function Button({
  children,
  variant = 'primary',
  outline = false,
  size = '48',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  style,
  ...buttonProps
}: ButtonProps) {
  const iconSlotClassName = getIconSlotClassName(size);

  return (
    <button
      type={type}
      style={{
        ...getButtonStyles(variant, outline),
        '--button-font-size': BUTTON_FONT_SIZE_TOKENS[size],
        '--button-border-radius': BUTTON_BORDER_RADIUS[size],
        ...style,
      }}
      className={[
        baseClassName,
        BUTTON_SIZE_CLASS_NAMES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...buttonProps}
    >
      {leftIcon ? <span className={iconSlotClassName}>{leftIcon}</span> : null}
      <span className={[TEXT_TRIM_CLASS_NAME, 'min-w-0'].join(' ')}>{children}</span>
      {rightIcon ? <span className={iconSlotClassName}>{rightIcon}</span> : null}
    </button>
  );
}
