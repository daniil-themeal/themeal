import type { CSSProperties } from 'react';
import { COLOR_TOKENS } from './colorTokens';

type DividerProps = {
  color?: string;
  className?: string;
};

export function Divider({ color = COLOR_TOKENS.neutral[100], className = '' }: DividerProps) {
  return (
    <div
      role="separator"
      aria-hidden
      className={['h-px w-full shrink-0', className].filter(Boolean).join(' ')}
      style={{ backgroundColor: color } as CSSProperties}
    />
  );
}
