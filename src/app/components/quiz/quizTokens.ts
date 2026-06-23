import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { typographyRoleStyle } from '../common/typographyTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_12_14,
  CHECKOUT_FONT_CLAMP_16_20,
  CHECKOUT_FONT_CLAMP_20_25,
} from '../checkout/checkoutSpacing';

export const QUIZ_MODAL_PANEL_CLASSNAME = [
  'relative flex w-full max-w-none flex-col overflow-hidden rounded-t-[20px] bg-[var(--quiz-modal-bg)] pb-[env(safe-area-inset-bottom)] shadow-2xl',
  'sm:mx-[24px] sm:max-h-[min(90dvh,720px)] sm:max-w-[480px] sm:rounded-[20px]',
].join(' ');

export const QUIZ_MODAL_INNER_CLASSNAME =
  'flex max-h-[min(90dvh,720px)] min-h-0 flex-1 flex-col overflow-hidden bg-[var(--quiz-modal-bg)] sm:rounded-[20px]';

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
  '--quiz-close-bg': string;
  '--quiz-close-bg-hover': string;
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
  '--quiz-close-bg': COLOR_TOKENS.neutral[50],
  '--quiz-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--quiz-title-font-size': CHECKOUT_FONT_CLAMP_20_25,
  '--quiz-body-font-size': FONT_SIZE_TOKENS[14],
  '--quiz-caption-font-size': CHECKOUT_FONT_CLAMP_12_14,
  '--quiz-option-font-size': CHECKOUT_FONT_CLAMP_16_20,
  '--quiz-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--quiz-danger': COLOR_TOKENS.danger[500],
};

export const QUIZ_SLIDER_CLASSNAME = [
  '[&_[data-slot=slider-track]]:h-[6px]',
  '[&_[data-slot=slider-track]]:bg-[var(--quiz-slider-track)]',
  '[&_[data-slot=slider-range]]:bg-[var(--quiz-slider-range)]',
  '[&_[data-slot=slider-thumb]]:size-[18px]',
  '[&_[data-slot=slider-thumb]]:border-[length:2px]',
  '[&_[data-slot=slider-thumb]]:border-[var(--quiz-slider-thumb-border)]',
  '[&_[data-slot=slider-thumb]]:bg-white',
  '[&_[data-slot=slider-thumb]]:shadow-none',
].join(' ');
