import { COLOR_TOKENS } from '../components/common/colorTokens';
import { TYPOGRAPHY_ROLES, typographyRoleStyle } from '../components/common/typographyTokens';
import { TEXT_TRIM_CLASS_NAME } from '../components/common/textTrimTokens';

export const legalTypographyVars = {
  ...typographyRoleStyle,
  '--typography-link': COLOR_TOKENS.primary[500],
  '--typography-link-hover': COLOR_TOKENS.primary[600],
  '--legal-page-bg': COLOR_TOKENS.base.cream,
  '--legal-divider': COLOR_TOKENS.neutral[100],
} as const;

const sectionTitleBase = TYPOGRAPHY_ROLES.sectionTitle.className;

/** Legal page text roles mapped to design-system typography tokens. */
export const legalText = {
  pageTitle: TYPOGRAPHY_ROLES.pageTitle.className,
  sectionTitle: sectionTitleBase,
  body: [
    TEXT_TRIM_CLASS_NAME,
    'font-sans text-[16px] font-medium leading-[170%] text-[var(--typography-text)]',
  ].join(' '),
  caption: TYPOGRAPHY_ROLES.caption.className,
  breadcrumb: [
    TEXT_TRIM_CLASS_NAME,
    'font-sans text-[14px] font-semibold leading-[140%] text-[var(--typography-muted)]',
  ].join(' '),
  breadcrumbLink:
    'text-[var(--typography-link)] no-underline transition-colors hover:text-[var(--typography-link-hover)]',
  breadcrumbCurrent: 'text-[var(--typography-text)]',
  link: 'font-semibold text-[var(--typography-link)] underline underline-offset-[3px] transition-colors hover:text-[var(--typography-link-hover)]',
} as const;
