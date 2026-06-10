import { COLOR_TOKENS } from '../../common/colorTokens';

export function PaymentFailedIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
      <circle cx="28" cy="28" r="28" fill={COLOR_TOKENS.danger[500]} />
      <path
        d="M18 18L38 38M38 18L18 38"
        stroke="white"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
