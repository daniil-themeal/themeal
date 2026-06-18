import type { CSSProperties } from 'react';

type TempPhoneResetButtonProps = {
  onClick: () => void;
  className?: string;
  style?: CSSProperties;
};

export function TempPhoneResetButton({
  onClick,
  className = '',
  style,
}: TempPhoneResetButtonProps) {
  return (
    <button
      type="button"
      aria-label="Reset phone verification"
      title="Reset (temp)"
      onClick={onClick}
      className={[
        'inline-flex shrink-0 items-center justify-center border-none bg-transparent p-0 text-[#EF4444] cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: 28, height: 28, ...style }}
    >
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M4.5 4.5l9 9M13.5 4.5l-9 9"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
