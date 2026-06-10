import { COLOR_TOKENS } from './colorTokens';

/** Semantic icon colors — applied on wrappers/containers, not inside icon components. */
export const ICON_COLOR_TOKENS = {
  catalog: COLOR_TOKENS.neutral[900],
  inline: COLOR_TOKENS.neutral[500],
  emphasis: COLOR_TOKENS.neutral[900],
} as const;

export type IconColorTokenName = keyof typeof ICON_COLOR_TOKENS;

export const ICON_COLOR_CSS_VARS = {
  catalog: '--icon-color-catalog',
  inline: '--icon-color-inline',
  emphasis: '--icon-color-emphasis',
} as const;

export const iconColorClassName = {
  catalog: 'text-[var(--icon-color-catalog)]',
  inline: 'text-[var(--icon-color-inline)]',
  emphasis: 'text-[var(--icon-color-emphasis)]',
} as const;

export const iconColorStyle = {
  catalog: { [ICON_COLOR_CSS_VARS.catalog]: ICON_COLOR_TOKENS.catalog },
  inline: { [ICON_COLOR_CSS_VARS.inline]: ICON_COLOR_TOKENS.inline },
  emphasis: { [ICON_COLOR_CSS_VARS.emphasis]: ICON_COLOR_TOKENS.emphasis },
} as const;
