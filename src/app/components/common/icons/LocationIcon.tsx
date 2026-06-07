import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type LocationIconProps = {
  size?: IconSize;
  className?: string;
};

export function LocationIcon({ size = 24, className = '' }: LocationIconProps) {
  return (
    <svg
      className={[iconSizeClassName[size], className].filter(Boolean).join(' ')}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 18.5 22.0556"
      aria-hidden="true"
    >
      <path
        d="M17.25 9.25C17.25 15.4722 9.25 20.8056 9.25 20.8056C9.25 20.8056 1.25 15.4722 1.25 9.25C1.25 7.12827 2.09285 5.09344 3.59315 3.59315C5.09344 2.09285 7.12827 1.25 9.25 1.25C11.3717 1.25 13.4066 2.09285 14.9069 3.59315C16.4071 5.09344 17.25 7.12827 17.25 9.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <path
        d="M9.25 11.9167C10.7228 11.9167 11.9167 10.7228 11.9167 9.25C11.9167 7.77724 10.7228 6.58333 9.25 6.58333C7.77724 6.58333 6.58333 7.77724 6.58333 9.25C6.58333 10.7228 7.77724 11.9167 9.25 11.9167Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}