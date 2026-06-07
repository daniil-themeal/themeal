import type { ButtonHTMLAttributes, ReactNode } from 'react';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant = 'ghost' | 'soft';

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'size-[36px]',
  md: 'size-[44px]',
  lg: 'size-[56px]',
};

const variantClasses: Record<IconButtonVariant, string> = {
  ghost: 'hover:bg-[#f3f4f7]',
  soft: 'bg-[#f3f4f7] hover:bg-[#e8ebef] rounded-full',
};

export function IconButton({
  ariaLabel,
  size = 'md',
  variant = 'ghost',
  className = '',
  children,
  ...props
}: {
  ariaLabel: string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`flex items-center justify-center shrink-0 cursor-pointer transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}