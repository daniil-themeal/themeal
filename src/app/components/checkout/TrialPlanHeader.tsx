import type { CSSProperties } from 'react';

import { EyebrowPill } from '../common/EyebrowPill';
import { COLOR_TOKENS } from '../common/colorTokens';
import { StarIcon } from '../common/icons';
import { CHECKOUT_FONT_CLAMP_25_31 } from './checkoutSpacing';

type TrialPlanHeaderCssVariables = CSSProperties & {
  '--trial-header-title-font-size': string;
  '--trial-header-title-color': string;
};

const trialPlanHeaderStyle: TrialPlanHeaderCssVariables = {
  '--trial-header-title-font-size': CHECKOUT_FONT_CLAMP_25_31,
  '--trial-header-title-color': COLOR_TOKENS.neutral[900],
};

export function TrialPlanHeader() {
  return (
    <div
      className="mt-[12px] flex w-full flex-col items-start gap-[12px] px-[4px] md:flex-row md:items-center md:justify-between"
      style={trialPlanHeaderStyle}
    >
      <h1 className="min-w-0 font-sans text-[length:var(--trial-header-title-font-size)] font-bold leading-[120%] text-[var(--trial-header-title-color)] md:flex-1">
        Try TheMeal for 3 days
      </h1>

      <EyebrowPill variant="cream" icon={<StarIcon size={16} />} className="shrink-0 md:self-center">
        Your trial offer
      </EyebrowPill>
    </div>
  );
}
