import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type SuccessIconProps = {
  size?: IconSize;
  className?: string;
};

export function SuccessIcon({ size = 24, className = '' }: SuccessIconProps) {
  return (
    <svg
      className={[iconSizeClassName[size], className].filter(Boolean).join(' ')}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 19 14"
      aria-hidden="true"
    >
      <path
        d="M17.5 1.5L6.5 12.5L1.5 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}