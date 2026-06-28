import { useState } from 'react';

import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Checkbox } from '../../../components/common/Checkbox';
import { Divider } from '../../../components/common/Divider';
import { PayMethodCard } from '../../../components/common/PayMethodCard';
import { PlanTariffSummary } from '../../../components/common/PlanTariffSummary';
import { FullMenuPanel } from '../../../components/checkout/FullMenuPanel';
import { ChevronRightIcon } from '../../../components/common/icons/feather/ChevronRightIcon';
import { MapPinIcon } from '../../../components/common/icons/feather/MapPinIcon';
import { CornerUpRightIcon } from '../../../components/common/icons/feather/CornerUpRightIcon';
import type { HomeDelivery, HomeMenuPlanConfig, HomePlan } from '../../types/account.types';
import { shouldShowProductionFixationBadge } from '../../utils/productionFixationBadge';
import type { MenuDay } from '../../../types/meal';

type HomePlanBlockProps = {
  plan: HomePlan;
  delivery: HomeDelivery;
  menuPlan: HomeMenuPlanConfig;
  menuDays: MenuDay[];
  onEditPlan?: () => void;
  onReschedule?: () => void;
  onAddressClick?: () => void;
};

export function HomePlanBlock({
  plan,
  delivery,
  menuPlan,
  menuDays,
  onEditPlan,
  onReschedule,
  onAddressClick,
}: HomePlanBlockProps) {
  const [leaveAtDoor, setLeaveAtDoor] = useState(delivery.leaveAtDoor);
  const showProductionFixation = shouldShowProductionFixationBadge(delivery.dateIso);

  return (
    <article className="account-home-plan">
      <header className="account-home-plan__header">
        <PlanTariffSummary
          title={plan.title}
          chips={plan.chips.map((chip) => chip.label)}
          actionLabel="Edit"
          onAction={onEditPlan ?? (() => undefined)}
        />

        <p className="account-home-plan__active-until">Active before {plan.activeUntil}</p>
      </header>

      <Divider />

      <section className="account-home-plan__delivery" aria-label="Next delivery">
        <div className="account-home-plan__delivery-label">
          <span>Next delivery:</span>
          <span>
            {delivery.index}/{delivery.total}
          </span>
          {showProductionFixation ? (
            <Badge variant="production-fixation" className="account-home-plan__delivery-badge" />
          ) : null}
        </div>

        <div className="account-home-plan__delivery-body">
          <div className="account-home-plan__delivery-date-row">
            <p className="account-home-plan__delivery-day">
              <span className="account-home-plan__delivery-day-row">
                <span>{delivery.day}</span>
                <span>{delivery.month}</span>
              </span>
              <span className="account-home-plan__delivery-weekday">{delivery.weekday}</span>
            </p>

            <Button
              type="button"
              variant="neutral"
              outline
              size="small"
              leftIcon={<CornerUpRightIcon size={16} />}
              className="account-home-plan__reschedule-btn"
              onClick={onReschedule}
            >
              Reschedule
            </Button>
          </div>

          <p className="account-home-plan__time-slot">{delivery.timeSlot}</p>

          <div className="account-home-plan__address-wrap">
            <PayMethodCard
              title={delivery.address}
              leftIcon={<MapPinIcon size={16} />}
              actionLabel={<ChevronRightIcon size={16} />}
              className="account-home-plan__address-card"
              onClick={onAddressClick ?? (() => undefined)}
              aria-label="Change delivery address"
            />
          </div>

          <div className="account-home-plan__leave-at-door">
            <Checkbox
              checked={leaveAtDoor}
              onChange={setLeaveAtDoor}
              label="Leave it by the door"
            />
          </div>
        </div>
      </section>

      <Divider />

      <section className="account-home-plan__menu" aria-label="Menu">
        <FullMenuPanel
          variant="embedded"
          isActive
          plan={menuPlan.plan}
          lightMealOption={menuPlan.lightMealOption}
          days={menuPlan.days}
          duration={menuPlan.duration}
          menuDays={menuDays}
        />
      </section>
    </article>
  );
}
