import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { typographyRoleStyle } from '../common/typographyTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_12_14,
  CHECKOUT_FONT_CLAMP_20_25,
  MEAL_DETAIL_CONTENT_PADDING_CLAMP,
} from '../checkout/checkoutSpacing';

export const QUIZ_MODAL_PANEL_CLASSNAME = [
  'relative flex w-full max-w-none flex-col overflow-hidden rounded-t-[20px] bg-[var(--quiz-modal-bg)] pb-[env(safe-area-inset-bottom)] shadow-2xl max-h-[min(90dvh,720px)]',
  'sm:mx-[24px] sm:max-w-[480px] sm:rounded-[20px]',
].join(' ');

export const QUIZ_MODAL_INNER_CLASSNAME =
  'flex min-h-0 max-h-full flex-col overflow-hidden bg-[var(--quiz-modal-bg)] sm:rounded-[20px]';

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
  '--quiz-body-font-size': string;
  '--quiz-caption-font-size': string;
  '--quiz-option-font-size': string;
  '--quiz-card-padding': string;
  '--quiz-danger': string;
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
  '--quiz-slider-track': COLOR_TOKENS.neutral[100],
  '--quiz-slider-range': COLOR_TOKENS.primary[500],
  '--quiz-slider-thumb-border': COLOR_TOKENS.primary[500],
  '--quiz-title-font-size': CHECKOUT_FONT_CLAMP_20_25,
  '--quiz-body-font-size': FONT_SIZE_TOKENS[16],
  '--quiz-caption-font-size': CHECKOUT_FONT_CLAMP_12_14,
  '--quiz-option-font-size': FONT_SIZE_TOKENS[16],
  '--quiz-card-padding': '20px',
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--meal-detail-content-p': MEAL_DETAIL_CONTENT_PADDING_CLAMP,
  '--quiz-danger': COLOR_TOKENS.danger[500],
};

export const QUIZ_SLIDER_PILL_CLASSNAME = [
  'rounded-full bg-[var(--quiz-surface)] px-[16px] py-[12px]',
].join(' ');

export const QUIZ_SLIDER_CLASSNAME = [
  'min-h-[44px] items-center',
  '[&_[data-slot=slider-track]]:h-[6px]',
  '[&_[data-slot=slider-track]]:rounded-full',
  '[&_[data-slot=slider-track]]:bg-[var(--quiz-border)]',
  '[&_[data-slot=slider-range]]:rounded-full',
  '[&_[data-slot=slider-range]]:bg-[var(--quiz-slider-range)]',
  '[&_[data-slot=slider-thumb]]:relative',
  '[&_[data-slot=slider-thumb]]:size-[20px]',
  '[&_[data-slot=slider-thumb]]:border-[length:2px]',
  '[&_[data-slot=slider-thumb]]:border-[var(--quiz-slider-thumb-border)]',
  '[&_[data-slot=slider-thumb]]:bg-white',
  '[&_[data-slot=slider-thumb]]:shadow-[0_2px_8px_rgba(154,56,239,0.2)]',
  '[&_[data-slot=slider-thumb]]:transition-transform',
  '[&_[data-slot=slider-thumb]]:hover:scale-[1.08]',
  '[&_[data-slot=slider-thumb]]:focus-visible:scale-[1.08]',
  '[&_[data-slot=slider-thumb]]:focus-visible:ring-4',
  '[&_[data-slot=slider-thumb]]:focus-visible:ring-[var(--quiz-card-hover-border)]',
  '[&_[data-slot=slider-thumb]]:after:absolute',
  '[&_[data-slot=slider-thumb]]:after:-inset-[13px]',
  '[&_[data-slot=slider-thumb]]:after:rounded-full',
  '[&_[data-slot=slider-thumb]]:after:content-[""]',
].join(' ');
