import * as SelectPrimitive from '@radix-ui/react-select';
import { useEffect, useState } from 'react';

import { DELIVERY_TIME_SLOTS } from '../../../components/checkout/deliveryTimeSlots';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Divider } from '../../../components/common/Divider';
import { DropdownSelectMenu } from '../../../components/common/Dropdown';
import { ChevronDownIcon } from '../../../components/common/icons/feather/ChevronDownIcon';
import { ClockIcon } from '../../../components/common/icons/feather/ClockIcon';
import { CornerUpRightIcon } from '../../../components/common/icons/feather/CornerUpRightIcon';
import type { DeliveryDetailData } from '../../types/account.types';
import { useInlineSuccessNotice } from '../../hooks/useInlineSuccessNotice';
import { shouldShowProductionFixationBadge } from '../../utils/productionFixationBadge';
import { DeliveryAddressRow } from '../shared/DeliveryAddressRow';
import { DeliveryLeaveAtDoorRow } from '../shared/DeliveryLeaveAtDoorRow';
import { InlineSuccessNotice } from '../shared/InlineSuccessNotice';

const TIME_SLOT_OPTIONS = DELIVERY_TIME_SLOTS.map((slot) => ({ value: slot, label: slot }));

type DeliveryDetailLogisticsProps = {
  detail: DeliveryDetailData;
  onReschedule?: () => void;
  onAddressClick?: () => void;
};

export function DeliveryDetailLogistics({
  detail,
  onReschedule,
  onAddressClick,
}: DeliveryDetailLogisticsProps) {
  const [leaveAtDoor, setLeaveAtDoor] = useState(detail.leaveAtDoor);
  const [timeSlot, setTimeSlot] = useState(detail.timeSlot);
  const {
    phase: timeSlotSuccessPhase,
    show: showTimeSlotSuccess,
    reset: resetTimeSlotSuccess,
  } = useInlineSuccessNotice();
  const {
    phase: leaveAtDoorSuccessPhase,
    show: showLeaveAtDoorSuccess,
    reset: resetLeaveAtDoorSuccess,
  } = useInlineSuccessNotice();
  const showProductionFixation = shouldShowProductionFixationBadge(detail.dateIso);
  const canEdit = detail.canEditLogistics;

  const handleTimeSlotChange = (next: string) => {
    if (next !== timeSlot) {
      showTimeSlotSuccess();
    }

    setTimeSlot(next);
  };

  const handleLeaveAtDoorChange = (next: boolean) => {
    if (next !== leaveAtDoor) {
      showLeaveAtDoorSuccess();
    }

    setLeaveAtDoor(next);
  };

  useEffect(() => {
    setTimeSlot(detail.timeSlot);
    setLeaveAtDoor(detail.leaveAtDoor);
    resetTimeSlotSuccess();
    resetLeaveAtDoorSuccess();
  }, [
    detail.dateIso,
    detail.leaveAtDoor,
    detail.timeSlot,
    resetLeaveAtDoorSuccess,
    resetTimeSlotSuccess,
  ]);

  const timeSlotRowClassName = [
    'account-delivery-sheet__row-btn account-delivery-sheet__row-btn--time-slot',
    !canEdit ? 'account-delivery-sheet__row-btn--static' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className="account-delivery-sheet__logistics" aria-label="Delivery details">
      {canEdit ? (
        <div className="account-delivery-sheet__label-row">
          <span className="account-delivery-sheet__label">
            Delivery: {detail.deliveryIndex}/{detail.deliveryTotal}
          </span>
          {showProductionFixation ? (
            <Badge variant="production-fixation" className="account-delivery-sheet__badge" />
          ) : null}
        </div>
      ) : null}

      <div className="account-delivery-sheet__date-row">
        <div className="account-delivery-sheet__date-copy">
          <p className="account-delivery-sheet__date-main">
            <span>{detail.day}</span>
            <span>{detail.month}</span>
          </p>
          <p className="account-delivery-sheet__weekday">{detail.weekday}</p>
        </div>

        {canEdit && onReschedule ? (
          <Button
            type="button"
            variant="neutral"
            outline
            size="small"
            leftIcon={<CornerUpRightIcon size={16} />}
            className="account-delivery-sheet__reschedule-btn"
            onClick={onReschedule}
          >
            Reschedule
          </Button>
        ) : null}

        {!canEdit ? (
          <Button
            type="button"
            variant="neutral"
            outline
            size="small"
            className="account-delivery-sheet__rate-delivery-btn"
          >
            Rate delivery service
          </Button>
        ) : null}
      </div>

      <Divider className="account-delivery-sheet__divider" />

      <div className="account-delivery-sheet__time-slot-row">
        <div className="account-delivery-sheet__time-slot-menu">
          {canEdit ? (
            <DropdownSelectMenu
              value={timeSlot}
              onChange={handleTimeSlotChange}
              options={TIME_SLOT_OPTIONS}
            >
              <button
                type="button"
                className={`${timeSlotRowClassName} group`}
                aria-label="Change delivery time"
              >
                <ClockIcon size={20} className="account-delivery-sheet__row-icon" />
                <span className="account-delivery-sheet__row-text">{timeSlot}</span>
                <SelectPrimitive.Icon asChild>
                  <ChevronDownIcon
                    size={16}
                    className="account-delivery-sheet__row-chevron transition-transform duration-150 group-data-[state=open]:rotate-180"
                  />
                </SelectPrimitive.Icon>
              </button>
            </DropdownSelectMenu>
          ) : (
            <div className={timeSlotRowClassName}>
              <ClockIcon size={20} className="account-delivery-sheet__row-icon" />
              <span className="account-delivery-sheet__row-text">{detail.timeSlot}</span>
            </div>
          )}
        </div>

        {canEdit && timeSlotSuccessPhase !== 'hidden' ? (
          <InlineSuccessNotice phase={timeSlotSuccessPhase}>Updated</InlineSuccessNotice>
        ) : null}
      </div>

      <Divider className="account-delivery-sheet__divider" />

      <DeliveryAddressRow
        address={detail.address}
        addressNote={detail.addressNote}
        canEdit={canEdit}
        onClick={onAddressClick}
      />

      <DeliveryLeaveAtDoorRow
        checked={leaveAtDoor}
        onChange={handleLeaveAtDoorChange}
        disabled={!canEdit}
        successPhase={leaveAtDoorSuccessPhase}
      />
    </section>
  );
}
