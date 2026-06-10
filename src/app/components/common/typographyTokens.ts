import { COLOR_TOKENS } from './colorTokens';
import { TEXT_TRIM_CLASS_NAME, TEXT_TRIM_FIT_CLASS_NAME } from './textTrimTokens';

export const TYPOGRAPHY_ROLES = {
  sectionTitle: {
    label: 'Section title',
    usage: 'Checkout step headings, modal titles',
    className: [
      TEXT_TRIM_FIT_CLASS_NAME,
      'font-sans text-[20px] font-bold leading-[130%] text-[var(--typography-text)] md:text-[25px]',
    ].join(' '),
    color: COLOR_TOKENS.neutral[900],
  },
  body: {
    label: 'Body',
    usage: 'Primary row text, form values',
    className: [
      TEXT_TRIM_CLASS_NAME,
      'font-sans text-[16px] font-semibold leading-[140%] text-[var(--typography-text)]',
    ].join(' '),
    color: COLOR_TOKENS.neutral[900],
  },
  caption: {
    label: 'Caption',
    usage: 'Secondary labels, metadata, helper text',
    className: [
      TEXT_TRIM_CLASS_NAME,
      'font-sans text-[12px] font-medium leading-[140%] text-[var(--typography-muted)]',
    ].join(' '),
    color: COLOR_TOKENS.neutral[500],
  },
  price: {
    label: 'Price',
    usage: 'Totals, tariff amounts',
    className: [
      TEXT_TRIM_CLASS_NAME,
      'font-sans text-[25px] font-bold leading-[150%] text-[var(--typography-text)]',
    ].join(' '),
    color: COLOR_TOKENS.neutral[900],
  },
} as const;

export type TypographyRoleName = keyof typeof TYPOGRAPHY_ROLES;

export const TYPOGRAPHY_ROLE_NAMES = Object.keys(TYPOGRAPHY_ROLES) as TypographyRoleName[];

export const typographyRoleStyle = {
  '--typography-text': COLOR_TOKENS.neutral[900],
  '--typography-muted': COLOR_TOKENS.neutral[500],
} as const;
