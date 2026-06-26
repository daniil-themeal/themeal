import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from './colorTokens';

export type FieldClearCssVariables = CSSProperties & {
  '--field-clear-bg': string;
  '--field-clear-bg-hover': string;
  '--field-clear-icon': string;
};

export const FIELD_CLEAR_NEUTRAL_STYLES: FieldClearCssVariables = {
  '--field-clear-bg': COLOR_TOKENS.neutral[75],
  '--field-clear-bg-hover': COLOR_TOKENS.neutral[100],
  '--field-clear-icon': COLOR_TOKENS.neutral[500],
};

export const FIELD_CLEAR_SUCCESS_STYLES: FieldClearCssVariables = {
  '--field-clear-bg': COLOR_TOKENS.success[600],
  '--field-clear-bg-hover': COLOR_TOKENS.success[700],
  '--field-clear-icon': COLOR_TOKENS.base.white,
};

export const FIELD_CLEAR_ERROR_STYLES: FieldClearCssVariables = {
  '--field-clear-bg': COLOR_TOKENS.danger[75],
  '--field-clear-bg-hover': COLOR_TOKENS.danger[100],
  '--field-clear-icon': COLOR_TOKENS.danger[300],
};
