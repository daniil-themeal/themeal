import { IconButton } from '../common/IconButton';
import { Tooltip } from '../common/Tooltip';
import { InfoIcon } from '../common/icons/feather/InfoIcon';

const PROMO_ESTIMATE_HINT_TEXT =
  'Heads up — this total is an estimate. Certain promo codes (first order, new customers, usage limits) are verified once you sign in, so your final discount may differ at payment.';

export function PromoCodeEstimateHint() {
  return (
    <Tooltip content={PROMO_ESTIMATE_HINT_TEXT} side="top">
      <IconButton
        type="button"
        ghost
        variant="neutral"
        size="small"
        aria-label="About promo code estimate"
        icon={<InfoIcon size={20} />}
      />
    </Tooltip>
  );
}
