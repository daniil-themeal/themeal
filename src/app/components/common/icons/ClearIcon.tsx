import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type ClearIconProps = {
  size?: IconSize;
  className?: string;
};

export function ClearIcon({ size = 24, className = '' }: ClearIconProps) {
  return (
    <svg
      className={[iconSizeClassName[size], className].filter(Boolean).join(' ')}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 14.5 14.5"
      aria-hidden="true"
    >
      <path
        d="M13.25 1.25L1.25 13.25M1.25 1.25L13.25 13.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}