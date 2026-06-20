import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';

export const FIELD_SIZES = ['small', 'large'] as const;

export type FieldSize = (typeof FIELD_SIZES)[number];

export const FIELD_SIZE_LABELS: Record<FieldSize, string> = {
  small: 'Small',
  large: 'Large',
};

type FieldSizeConfig = {
  heightPx: number;
  fontSizePx: number;
  fontSize: string;
  supportingFontSize: string;
  borderRadius: string;
  horizontalPaddingPx: number;
  iconSlotWidthPx: number;
  iconSizePx: number;
  textareaVerticalPaddingPx: number;
};

export const FIELD_SIZE_CONFIG: Record<FieldSize, FieldSizeConfig> = {
  small: {
    heightPx: 40,
    fontSizePx: 14,
    fontSize: FONT_SIZE_TOKENS[14],
    supportingFontSize: FONT_SIZE_TOKENS[12],
    borderRadius: BORDER_RADIUS_TOKENS[4],
    horizontalPaddingPx: 12,
    iconSlotWidthPx: 40,
    iconSizePx: 16,
    textareaVerticalPaddingPx: 12,
  },

  large: {
    heightPx: 48,
    fontSizePx: 16,
    fontSize: FONT_SIZE_TOKENS[16],
    supportingFontSize: FONT_SIZE_TOKENS[12],
    borderRadius: BORDER_RADIUS_TOKENS[8],
    horizontalPaddingPx: 16,
    iconSlotWidthPx: 48,
    iconSizePx: 24,
    textareaVerticalPaddingPx: 14,
  },
};

export const FIELD_CLEAR_CIRCLE_SIZE_PX = 36;

function getFieldClearInset(heightPx: number) {
  return Math.max(0, (heightPx - FIELD_CLEAR_CIRCLE_SIZE_PX) / 2);
}

export type FieldSizeCssVariables = {
  '--field-height': string;
  '--field-font-size': string;
  '--field-supporting-font-size': string;
  '--field-border-radius': string;
  '--field-horizontal-padding': string;
  '--field-icon-slot-width': string;
  '--field-icon-size': string;
  '--field-textarea-vertical-padding': string;
  '--field-clear-circle-size': string;
  '--field-clear-inset': string;
  '--field-clear-slot-width': string;
};

export function getFieldSizeStyle(size: FieldSize): FieldSizeCssVariables {
  const config = FIELD_SIZE_CONFIG[size];
  const clearInsetPx = getFieldClearInset(config.heightPx);

  return {
    '--field-height': `${config.heightPx}px`,
    '--field-font-size': config.fontSize,
    '--field-supporting-font-size': config.supportingFontSize,
    '--field-border-radius': config.borderRadius,
    '--field-horizontal-padding': `${config.horizontalPaddingPx}px`,
    '--field-icon-slot-width': `${config.iconSlotWidthPx}px`,
    '--field-icon-size': `${config.iconSizePx}px`,
    '--field-textarea-vertical-padding': `${config.textareaVerticalPaddingPx}px`,
    '--field-clear-circle-size': `${FIELD_CLEAR_CIRCLE_SIZE_PX}px`,
    '--field-clear-inset': `${clearInsetPx}px`,
    '--field-clear-slot-width': `${FIELD_CLEAR_CIRCLE_SIZE_PX + clearInsetPx}px`,
  };
}
