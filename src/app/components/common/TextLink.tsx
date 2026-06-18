import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { ChevronRightIcon } from './icons';

export const TEXT_LINK_SIZES = ['12', '14'] as const;

export type TextLinkSize = (typeof TEXT_LINK_SIZES)[number];

type TextLinkCssVariables = CSSProperties & {
  '--text-link-color': string;
  '--text-link-color-hover': string;
  '--text-link-font-size': string;
};

const textLinkBaseStyle: Omit<TextLinkCssVariables, '--text-link-font-size'> = {
  '--text-link-color': COLOR_TOKENS.primary[500],
  '--text-link-color-hover': COLOR_TOKENS.primary[600],
};

const TEXT_LINK_SIZE_STYLES: Record<TextLinkSize, Pick<TextLinkCssVariables, '--text-link-font-size'>> = {
  '12': { '--text-link-font-size': FONT_SIZE_TOKENS[12] },
  '14': { '--text-link-font-size': FONT_SIZE_TOKENS[14] },
};

type TextLinkProps = {
  children: ReactNode;
  size?: TextLinkSize;
  showChevron?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function TextLink({
  children,
  size = '12',
  showChevron = true,
  className = '',
  type = 'button',
  ...props
}: TextLinkProps) {
  return (
    <button
      type={type}
      className={[
        'group inline-flex shrink-0 cursor-pointer items-center gap-[4px]',
        'text-[var(--text-link-color)] transition-colors hover:text-[var(--text-link-color-hover)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...textLinkBaseStyle, ...TEXT_LINK_SIZE_STYLES[size] }}
      {...props}
    >
      <span className="font-sans text-[length:var(--text-link-font-size)] font-bold leading-none">
        {children}
      </span>
      {showChevron ? <ChevronRightIcon size={16} /> : null}
    </button>
  );
}
