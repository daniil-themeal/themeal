import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';

export const CHECKBOX_SIZES = ['small', 'large'] as const;

export type CheckboxSize = (typeof CHECKBOX_SIZES)[number];

export const CHECKBOX_SIZE_LABELS: Record<CheckboxSize, string> = {
  small: 'Small',
  large: 'Large',
};

type CheckboxSizeConfig = {
  boxSizePx: number;
  checkMarkSizePx: number;
  fontSize: string;
  gapPx: number;
  borderRadius: string;
};

export const CHECKBOX_SIZE_CONFIG: Record<CheckboxSize, CheckboxSizeConfig> = {
  small: {
    boxSizePx: 16,
    checkMarkSizePx: 10,
    fontSize: FONT_SIZE_TOKENS[12],
    gapPx: 4,
    borderRadius: BORDER_RADIUS_TOKENS[4],
  },

  large: {
    boxSizePx: 20,
    checkMarkSizePx: 12,
    fontSize: FONT_SIZE_TOKENS[16],
    gapPx: 8,
    borderRadius: '5px',
  },
};

export type CheckboxSizeCssVariables = {
  '--checkbox-box-size': string;
  '--checkbox-check-size': string;
  '--checkbox-label-font-size': string;
  '--checkbox-gap': string;
  '--checkbox-border-radius': string;
};

export function getCheckboxSizeStyle(size: CheckboxSize): CheckboxSizeCssVariables {
  const config = CHECKBOX_SIZE_CONFIG[size];

  return {
    '--checkbox-box-size': `${config.boxSizePx}px`,
    '--checkbox-check-size': `${config.checkMarkSizePx}px`,
    '--checkbox-label-font-size': config.fontSize,
    '--checkbox-gap': `${config.gapPx}px`,
    '--checkbox-border-radius': config.borderRadius,
  };
}
