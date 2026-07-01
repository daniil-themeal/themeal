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
      className="flex w-full flex-col items-start gap-[16px] px-[4px]"
      style={trialPlanHeaderStyle}
    >
      <h1 className="w-full font-sans text-[length:var(--trial-header-title-font-size)] font-bold leading-[120%] text-[var(--trial-header-title-color)]">
        Try TheMeal for 3 days
      </h1>

      <EyebrowPill variant="warning" icon={<StarIcon size={16} />}>
        Your trial offer
      </EyebrowPill>
    </div>
  );
}
