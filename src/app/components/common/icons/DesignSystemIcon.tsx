import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type DesignSystemIconProps = {
  size?: IconSize;
  className?: string;
};

export function DesignSystemIcon({ size = 24, className = '' }: DesignSystemIconProps) {
  return (
    <svg
      className={[iconSizeClassName[size], 'shrink-0', className].filter(Boolean).join(' ')}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}
