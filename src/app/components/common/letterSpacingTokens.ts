/** Negative letter-spacing tiers for headings and compact UI text. */
export const LETTER_SPACING_TOKENS = {
  /** Hero h1, largest section headings — was -0.2rem */
  display: '-0.24rem',
  /** Section h2 at md+ — was -0.2rem */
  headingLg: '-0.24rem',
  /** Section h2 mobile — was -0.1rem */
  headingMd: '-0.12rem',
  /** h3 sub-section headings — was -0.01em */
  headingSm: '-0.015em',
  /** .display class — was -0.025em */
  displayEm: '-0.03em',
  /** Extra-large display (404 code) — was -0.05em */
  displayTight: '-0.06em',
  /** Compact h2 override — was -0.05rem */
  headingCompact: '-0.06rem',
  /** ~32px bold titles (checkout, DS demo) — was -0.64px */
  title32: '-0.76px',
  /** ~25–32px card titles — was -0.75px */
  title25: '-0.9px',
  /** Account 25px bold headings — was -0.5px */
  title25Bold: '-0.6px',
  /** Account day number — was -0.25px */
  title25Light: '-0.3px',
  /** ~20px emphasis text — was -0.4px */
  body20: '-0.48px',
  /** ~16px bold UI — was -0.16px */
  label16: '-0.19px',
  /** ~16px medium UI — was -0.32px */
  label16Medium: '-0.38px',
  /** ~14px bold badges — was -0.14px */
  label14: '-0.17px',
  /** ~12px labels — was -0.12px */
  label12: '-0.14px',
  /** ~12px bold — was -0.36px */
  label12Bold: '-0.44px',
} as const;

export type LetterSpacingTokenName = keyof typeof LETTER_SPACING_TOKENS;

export const LETTER_SPACING_TOKEN_NAMES = Object.keys(
  LETTER_SPACING_TOKENS,
) as LetterSpacingTokenName[];

export const LETTER_SPACING_CSS_VARS = Object.fromEntries(
  Object.entries(LETTER_SPACING_TOKENS).map(([name, value]) => [
    `--letter-spacing-${name}`,
    value,
  ]),
) as {
  readonly [K in LetterSpacingTokenName as `--letter-spacing-${K}`]: (typeof LETTER_SPACING_TOKENS)[K];
};
