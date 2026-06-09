import { COLOR_TOKENS } from '../colorTokens';
import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type RadioCheckIconProps = {
  size?: IconSize;
  className?: string;
};

export function RadioCheckIcon({ size = 20, className = '' }: RadioCheckIconProps) {
  return (
    <svg
      className={[iconSizeClassName[size], className].filter(Boolean).join(' ')}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M5.5 10.5L8.5 13.5L14.5 7.5"
        stroke={COLOR_TOKENS.base.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}
