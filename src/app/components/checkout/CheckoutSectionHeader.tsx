import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';

export const CHECKOUT_SECTION_HEADER_LAYOUT = {
  wrapper: 'flex w-full flex-col px-[4px]',
  gap12: 'gap-[12px]',
  gap2: 'gap-[2px]',
} as const;

type CheckoutSectionHeaderCssVariables = CSSProperties & {
  '--checkout-section-title-font-size': string;
  '--checkout-section-title-font-size-md': string;
  '--checkout-section-subtitle-font-size': string;
  '--checkout-section-subtitle-font-size-md': string;
  '--checkout-section-text': string;
};

const checkoutSectionHeaderStyle: CheckoutSectionHeaderCssVariables = {
  '--checkout-section-title-font-size': FONT_SIZE_TOKENS[20],
  '--checkout-section-title-font-size-md': FONT_SIZE_TOKENS[25],
  '--checkout-section-subtitle-font-size': FONT_SIZE_TOKENS[12],
  '--checkout-section-subtitle-font-size-md': FONT_SIZE_TOKENS[14],
  '--checkout-section-text': COLOR_TOKENS.neutral[900],
};

type CheckoutSectionHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  gap?: 2 | 12;
  className?: string;
};

export function CheckoutSectionHeader({
  title,
  subtitle,
  gap,
  className = '',
}: CheckoutSectionHeaderProps) {
  const gapClass =
    gap === 2
      ? CHECKOUT_SECTION_HEADER_LAYOUT.gap2
      : gap === 12
        ? CHECKOUT_SECTION_HEADER_LAYOUT.gap12
        : '';

  const titleClassName =
    'font-sans text-[length:var(--checkout-section-title-font-size)] font-bold leading-[130%] text-[var(--checkout-section-text)] md:text-[length:var(--checkout-section-title-font-size-md)]';

  return (
    <div
      className={[CHECKOUT_SECTION_HEADER_LAYOUT.wrapper, gapClass, className]
        .filter(Boolean)
        .join(' ')}
      style={checkoutSectionHeaderStyle}
    >
      <p className={titleClassName}>{title}</p>

      {subtitle ? (
        <p className="font-sans text-[length:var(--checkout-section-subtitle-font-size)] font-medium leading-[130%] text-[var(--checkout-section-text)] md:text-[length:var(--checkout-section-subtitle-font-size-md)]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
