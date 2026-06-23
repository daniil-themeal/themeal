import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  MEAL_DETAIL_CONTENT_PADDING_CLAMP,
} from '../checkout/checkoutSpacing';

export const MODAL_CLOSE_HIT_AREA = '56px';
export const MODAL_CLOSE_CIRCLE = '36px';
export const MODAL_HEADER_HEIGHT = '56px';

export type ModalTokensCssVariables = CSSProperties & {
  '--modal-bg': string;
  '--modal-border': string;
  '--modal-title': string;
  '--modal-muted': string;
  '--modal-close-bg': string;
  '--modal-close-bg-hover': string;
  '--circular-close-bg': string;
  '--circular-close-bg-hover': string;
  '--modal-content-padding': string;
  '--modal-content-padding-md': string;
  '--checkout-card-padding': string;
  '--meal-detail-content-p': string;
};

export const modalTokensStyle: ModalTokensCssVariables = {
  '--modal-bg': COLOR_TOKENS.base.white,
  '--modal-border': COLOR_TOKENS.neutral[100],
  '--modal-title': COLOR_TOKENS.neutral[900],
  '--modal-muted': COLOR_TOKENS.neutral[500],
  '--modal-close-bg': COLOR_TOKENS.neutral[50],
  '--modal-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--circular-close-bg': COLOR_TOKENS.neutral[50],
  '--circular-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--modal-content-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--modal-content-padding-md': MEAL_DETAIL_CONTENT_PADDING_CLAMP,
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--meal-detail-content-p': MEAL_DETAIL_CONTENT_PADDING_CLAMP,
};

export const MODAL_PANEL_CLASSNAME = [
  'relative flex w-full max-w-none flex-col overflow-hidden rounded-t-[20px] bg-[var(--modal-bg)] pb-[env(safe-area-inset-bottom)] shadow-2xl',
  'sm:mx-[24px] sm:max-w-[clamp(496px,calc(496px+(100vw-48rem)*80/448),576px)] sm:rounded-[20px]',
].join(' ');

export const MODAL_INNER_CLASSNAME =
  'flex min-h-0 max-h-full flex-col overflow-hidden bg-[var(--modal-bg)] sm:rounded-[20px]';
