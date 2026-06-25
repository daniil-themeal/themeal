import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { ChevronRightIcon } from '../common/icons';
import { CHECKOUT_FONT_CLAMP_16_20 } from './checkoutSpacing';

type TrialUpsellBannerCssVariables = CSSProperties & {
  '--trial-upsell-bg': string;
  '--trial-upsell-text': string;
  '--trial-upsell-muted': string;
  '--trial-upsell-active': string;
  '--trial-upsell-active-bg': string;
  '--trial-upsell-hover-border': string;
  '--trial-upsell-indicator-bg': string;
  '--trial-upsell-indicator-fg': string;
  '--trial-upsell-title-fs': string;
  '--trial-upsell-subtitle-fs': string;
};

const trialUpsellBannerStyle: TrialUpsellBannerCssVariables = {
  '--trial-upsell-bg': COLOR_TOKENS.base.white,
  '--trial-upsell-text': COLOR_TOKENS.neutral[900],
  '--trial-upsell-muted': COLOR_TOKENS.neutral[500],
  '--trial-upsell-active': COLOR_TOKENS.primary[500],
  '--trial-upsell-active-bg': COLOR_TOKENS.primary[50],
  '--trial-upsell-hover-border': COLOR_TOKENS.primary[200],
  '--trial-upsell-indicator-bg': COLOR_TOKENS.primary[50],
  '--trial-upsell-indicator-fg': COLOR_TOKENS.primary[500],
  '--trial-upsell-title-fs': CHECKOUT_FONT_CLAMP_16_20,
  '--trial-upsell-subtitle-fs': FONT_SIZE_TOKENS[14],
};

type TrialUpsellBannerProps = {
  onExitTrial: () => void;
};

export function TrialUpsellBanner({ onExitTrial }: TrialUpsellBannerProps) {
  return (
    <button
      type="button"
      onClick={onExitTrial}
      className={[
        'group relative w-full cursor-pointer rounded-[12px] border border-solid border-transparent bg-[var(--trial-upsell-bg)] text-left transition-colors duration-150',
        'hover:border-[var(--trial-upsell-hover-border)] hover:bg-[var(--trial-upsell-active-bg)]',
        'focus-visible:outline-none focus-visible:border-[var(--trial-upsell-hover-border)] focus-visible:bg-[var(--trial-upsell-active-bg)]',
      ].join(' ')}
      style={trialUpsellBannerStyle}
    >
      <div className="flex items-center gap-[12px] p-[var(--checkout-selector-card-padding)]">
        <div className="flex min-w-0 flex-[1_0_0] flex-col gap-[12px]">
          <p className="font-sans text-[length:var(--trial-upsell-title-fs)] font-bold leading-[130%] text-[var(--trial-upsell-text)]">
            Looking for a full plan?
          </p>
          <p className="font-sans text-[length:var(--trial-upsell-subtitle-fs)] font-medium leading-[130%] text-[var(--trial-upsell-muted)]">
            Browse subscription options from AED 999/month
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <span
            className={[
              'flex size-[32px] items-center justify-center rounded-full bg-[var(--trial-upsell-indicator-bg)] text-[var(--trial-upsell-indicator-fg)] transition-transform duration-150',
              'group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]',
            ].join(' ')}
          >
            <ChevronRightIcon size={18} />
          </span>
        </div>
      </div>
    </button>
  );
}
