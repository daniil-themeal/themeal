import type { CSSProperties } from 'react';

import { ACCENT_CARD_CREAM_SHADOW, ACCENT_CARD_VARIANTS } from '../common/accentCardTokens';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { typographyRoleStyle } from '../common/typographyTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_12_14,
  CHECKOUT_FONT_CLAMP_16_20,
  CHECKOUT_FONT_CLAMP_20_25,
  CHECKOUT_FONT_CLAMP_32_40,
  MEAL_DETAIL_CONTENT_PADDING_CLAMP,
  QUIZ_STEP_BODY_GAP_CLAMP,
} from '../checkout/checkoutSpacing';

export const QUIZ_MODAL_SHELL_ROOT_CLASSNAME =
  'bg-[var(--quiz-modal-bg)] pb-[env(safe-area-inset-bottom)] sm:p-[24px]';

export const QUIZ_MODAL_SHELL_PANEL_CLASSNAME =
  'w-full bg-[var(--quiz-modal-bg)] sm:max-w-[520px] sm:overflow-hidden sm:rounded-[20px] sm:shadow-2xl';

export const QUIZ_MODAL_SHELL_INNER_CLASSNAME =
  'flex h-full min-h-0 flex-col overflow-hidden bg-[var(--quiz-modal-bg)] sm:h-auto sm:min-h-full sm:overflow-hidden sm:rounded-[20px]';

export const QUIZ_MODAL_BODY_CLASSNAME =
  'flex min-h-0 flex-1 flex-col bg-[var(--quiz-modal-bg)] sm:flex-none';

export const QUIZ_MODAL_SCROLL_CLASSNAME =
  'min-h-0 flex-1 overflow-y-auto scrollbar-hide sm:flex-none sm:overflow-visible';

export const QUIZ_SECTION_PX_CLASSNAME =
  'px-[length:var(--checkout-card-padding)] sm:px-[length:var(--meal-detail-content-p)]';

export const QUIZ_MODAL_FOOTER_CLASSNAME = [
  'shrink-0 border-t border-[var(--quiz-border)] bg-[var(--quiz-modal-bg)]',
  'pt-[12px] pb-[length:var(--checkout-card-padding)]',
  QUIZ_SECTION_PX_CLASSNAME,
  'sm:border-t-0 sm:pt-0',
].join(' ');

export const QUIZ_FOOTER_ACTIONS_CLASSNAME = 'flex w-full gap-[12px]';

export const QUIZ_MOBILE_STICKY_ACTIONS_CLASSNAME = [
  'flex flex-col gap-[12px]',
  'max-sm:sticky max-sm:bottom-0 max-sm:z-[1] max-sm:bg-[var(--quiz-modal-bg)] max-sm:pt-[12px] max-sm:pb-[16px]',
].join(' ');

export const QUIZ_LEAD_EMBEDDED_SHELL_CLASSNAME = [
  'flex flex-col gap-[24px]',
  QUIZ_SECTION_PX_CLASSNAME,
  'border-t border-[var(--quiz-border)] pt-[28px] pb-0',
].join(' ');

export const QUIZ_LEAD_EMBEDDED_BODY_CLASSNAME = 'flex flex-col gap-[12px] pb-[20px]';

export const QUIZ_STEP_BODY_CLASSNAME = [
  'flex flex-col gap-[length:var(--quiz-step-body-gap)]',
  QUIZ_SECTION_PX_CLASSNAME,
  'pb-[40px]',
].join(' ');

export const QUIZ_SECTION_PT_CLASSNAME =
  'pt-[length:var(--checkout-card-padding)] sm:pt-[length:var(--meal-detail-content-p)]';

export const QUIZ_SECTION_PB_CLASSNAME =
  'pb-[length:var(--checkout-card-padding)] sm:pb-[length:var(--meal-detail-content-p)]';

export type QuizTokensCssVariables = CSSProperties & {
  '--quiz-modal-bg': string;
  '--quiz-text': string;
  '--quiz-muted': string;
  '--quiz-active': string;
  '--quiz-border': string;
  '--quiz-surface': string;
  '--quiz-card-bg': string;
  '--quiz-card-selected-bg': string;
  '--quiz-card-selected-border': string;
  '--quiz-card-hover-border': string;
  '--quiz-progress-track': string;
  '--quiz-progress-fill': string;
  '--quiz-slider-track': string;
  '--quiz-slider-range': string;
  '--quiz-slider-thumb-border': string;
  '--quiz-title-font-size': string;
  '--quiz-slider-value-font-size': string;
  '--quiz-body-font-size': string;
  '--quiz-caption-font-size': string;
  '--quiz-option-font-size': string;
  '--quiz-card-padding': string;
  '--quiz-step-body-gap': string;
  '--quiz-danger': string;
  '--sms-code-text': string;
  '--sms-code-muted': string;
  '--sms-code-primary': string;
  '--sms-code-danger': string;
  '--sms-code-digit-bg': string;
  '--sms-code-digit-active-bg': string;
  '--sms-code-digit-success-bg': string;
  '--sms-code-digit-success-text': string;
  '--sms-code-digit-font-size': string;
  '--sms-code-body-font-size': string;
  '--phone-input-bg': string;
  '--phone-input-border': string;
  '--phone-input-focus-border': string;
  '--phone-input-text': string;
  '--phone-input-placeholder': string;
  '--phone-input-error': string;
  '--phone-input-font-size': string;
};

export const quizTokensStyle: QuizTokensCssVariables = {
  ...typographyRoleStyle,
  '--quiz-modal-bg': COLOR_TOKENS.base.white,
  '--quiz-text': COLOR_TOKENS.neutral[900],
  '--quiz-muted': COLOR_TOKENS.neutral[500],
  '--quiz-active': COLOR_TOKENS.primary[500],
  '--quiz-border': COLOR_TOKENS.neutral[100],
  '--quiz-surface': COLOR_TOKENS.neutral[50],
  '--quiz-card-bg': COLOR_TOKENS.base.white,
  '--quiz-card-selected-bg': COLOR_TOKENS.primary[50],
  '--quiz-card-selected-border': COLOR_TOKENS.primary[200],
  '--quiz-card-hover-border': COLOR_TOKENS.primary[200],
  '--quiz-progress-track': COLOR_TOKENS.primary[100],
  '--quiz-progress-fill': COLOR_TOKENS.primary[500],
  '--quiz-slider-track': COLOR_TOKENS.neutral[50],
  '--quiz-slider-range': COLOR_TOKENS.primary[100],
  '--quiz-slider-thumb-border': COLOR_TOKENS.primary[500],
  '--quiz-title-font-size': CHECKOUT_FONT_CLAMP_20_25,
  '--quiz-slider-value-font-size': CHECKOUT_FONT_CLAMP_16_20,
  '--quiz-body-font-size': FONT_SIZE_TOKENS[16],
  '--quiz-caption-font-size': CHECKOUT_FONT_CLAMP_12_14,
  '--quiz-option-font-size': FONT_SIZE_TOKENS[16],
  '--quiz-card-padding': '20px',
  '--quiz-step-body-gap': QUIZ_STEP_BODY_GAP_CLAMP,
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--meal-detail-content-p': MEAL_DETAIL_CONTENT_PADDING_CLAMP,
  '--quiz-danger': COLOR_TOKENS.danger[500],
  '--sms-code-text': COLOR_TOKENS.neutral[900],
  '--sms-code-muted': COLOR_TOKENS.neutral[500],
  '--sms-code-primary': COLOR_TOKENS.primary[500],
  '--sms-code-danger': COLOR_TOKENS.danger[500],
  '--sms-code-digit-bg': COLOR_TOKENS.neutral[50],
  '--sms-code-digit-active-bg': COLOR_TOKENS.neutral[75],
  '--sms-code-digit-success-bg': COLOR_TOKENS.primary[500],
  '--sms-code-digit-success-text': COLOR_TOKENS.base.white,
  '--sms-code-digit-font-size': CHECKOUT_FONT_CLAMP_32_40,
  '--sms-code-body-font-size': FONT_SIZE_TOKENS[16],
  '--phone-input-bg': COLOR_TOKENS.neutral[50],
  '--phone-input-border': COLOR_TOKENS.neutral[100],
  '--phone-input-focus-border': COLOR_TOKENS.neutral[300],
  '--phone-input-text': COLOR_TOKENS.neutral[900],
  '--phone-input-placeholder': COLOR_TOKENS.neutral[300],
  '--phone-input-error': COLOR_TOKENS.danger[400],
  '--phone-input-font-size': FONT_SIZE_TOKENS[20],
};

export type QuizMetricVariant = 'money' | 'time' | 'meals';

export type QuizMetricVariantStyle = {
  background: string;
  boxShadow: string;
  labelColor: string;
  labelOpacity: number;
  valueColor: string;
  valueFontWeightClass: 'font-bold' | 'font-semibold';
};

export const QUIZ_METRIC_VARIANTS: Record<QuizMetricVariant, QuizMetricVariantStyle> = {
  money: {
    background: COLOR_TOKENS.cream[75],
    boxShadow: ACCENT_CARD_CREAM_SHADOW,
    labelColor: COLOR_TOKENS.cream[500],
    labelOpacity: 1,
    valueColor: COLOR_TOKENS.cream[600],
    valueFontWeightClass: 'font-semibold',
  },
  time: {
    ...ACCENT_CARD_VARIANTS.green,
    valueFontWeightClass: 'font-bold',
  },
  meals: {
    ...ACCENT_CARD_VARIANTS.brand,
    valueFontWeightClass: 'font-bold',
  },
};

export const QUIZ_SLIDER_LABELS_CLASSNAME = 'flex flex-col items-center gap-[12px]';

export const QUIZ_SLIDER_CLASSNAME = [
  'h-[24px] min-h-[24px] cursor-pointer items-center',
  '[&_[data-slot=slider-track]]:relative',
  '[&_[data-slot=slider-track]]:h-[24px]',
  '[&_[data-slot=slider-track]]:min-h-[24px]',
  '[&_[data-slot=slider-track]]:cursor-pointer',
  '[&_[data-slot=slider-track]]:bg-transparent',
  '[&_[data-slot=slider-track]]:before:absolute',
  '[&_[data-slot=slider-track]]:before:inset-x-0',
  '[&_[data-slot=slider-track]]:before:top-1/2',
  '[&_[data-slot=slider-track]]:before:h-[8px]',
  '[&_[data-slot=slider-track]]:before:-translate-y-1/2',
  '[&_[data-slot=slider-track]]:before:rounded-full',
  '[&_[data-slot=slider-track]]:before:bg-[var(--quiz-slider-track)]',
  '[&_[data-slot=slider-track]]:before:content-[""]',
  '[&_[data-slot=slider-range]]:absolute',
  '[&_[data-slot=slider-range]]:top-1/2',
  '[&_[data-slot=slider-range]]:h-[8px]',
  '[&_[data-slot=slider-range]]:-translate-y-1/2',
  '[&_[data-slot=slider-range]]:rounded-full',
  '[&_[data-slot=slider-range]]:bg-[var(--quiz-slider-range)]',
  '[&_[data-slot=slider-thumb]]:relative',
  '[&_[data-slot=slider-thumb]]:cursor-pointer',
  '[&_[data-slot=slider-thumb]]:h-[16px]',
  '[&_[data-slot=slider-thumb]]:w-[32px]',
  '[&_[data-slot=slider-thumb]]:shrink-0',
  '[&_[data-slot=slider-thumb]]:rounded-full',
  '[&_[data-slot=slider-thumb]]:border-[length:2px]',
  '[&_[data-slot=slider-thumb]]:border-[var(--quiz-slider-thumb-border)]',
  '[&_[data-slot=slider-thumb]]:bg-[var(--quiz-slider-thumb-border)]',
  '[&_[data-slot=slider-thumb]]:shadow-[0_2px_8px_rgba(154,56,239,0.2)]',
  '[&_[data-slot=slider-thumb]]:ring-transparent',
  '[&_[data-slot=slider-thumb]]:transition-transform',
  '[&_[data-slot=slider-thumb]]:hover:scale-[1.12]',
  '[&_[data-slot=slider-thumb]]:hover:ring-4',
  '[&_[data-slot=slider-thumb]]:hover:ring-[var(--quiz-border)]',
  '[&_[data-slot=slider-thumb]]:focus-visible:scale-[1.12]',
  '[&_[data-slot=slider-thumb]]:focus-visible:ring-4',
  '[&_[data-slot=slider-thumb]]:focus-visible:ring-[var(--quiz-card-hover-border)]',
  '[&_[data-slot=slider-thumb]]:after:absolute',
  '[&_[data-slot=slider-thumb]]:after:-inset-[13px]',
  '[&_[data-slot=slider-thumb]]:after:rounded-full',
  '[&_[data-slot=slider-thumb]]:after:content-[""]',
].join(' ');
