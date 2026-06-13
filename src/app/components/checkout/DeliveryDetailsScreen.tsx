import { useMemo } from 'react';

import type { DayOption, Duration } from '../../data/checkoutPricing';
import type { TestAddress } from '../../data/testAddresses';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Divider } from '../common/Divider';
import { Dropdown } from '../common/Dropdown';
import { getFieldSizeStyle } from '../common/fieldSizeTokens';
import { DeliveryAddressCard } from '../common/DeliveryAddressCard';
import { InfoIcon } from '../common/icons/feather';
import { TextArea } from '../common/TextArea';
import { TextInput } from '../common/TextInput';

import {
  CHECKOUT_STEP_PAGE_LAYOUT,
  CHECKOUT_STEP_PAGE_VARS,
} from './checkoutStepPageLayoutTokens';
import type { DeliveryDetailsData } from './deliveryDetailsTypes';
import { MealCalendar } from './MealCalendar';
import { getUpcomingDeliveryDates } from './mealCalendarUtils';

const TIME_SLOTS = ['07:00 – 11:00', '12:00 – 16:00', '18:00 – 22:00'];

function InfoBox() {
  return (
    <div
      className="flex items-start justify-center gap-[12px] rounded-[12px] p-[16px]"
      style={{ backgroundColor: COLOR_TOKENS.warning[50] }}
    >
      <span className="mt-[1px] shrink-0" style={{ color: COLOR_TOKENS.warning[700] }}>
        <InfoIcon size={20} className="!w-fit !h-fit py-[3px] mb-0" />
      </span>
      <p
        className="font-sans text-[16px] font-semibold leading-[150%]"
        style={{ color: COLOR_TOKENS.warning[800] }}
      >
        To keep your meals fresh in the UAE's hot climate, please place them in the refrigerator
        immediately after delivery.
      </p>
    </div>
  );
}

type DeliveryDetailsScreenProps = {
  selectedAddress: TestAddress | null;
  deliveryDetails: DeliveryDetailsData;
  onDeliveryDetailsChange: (patch: Partial<DeliveryDetailsData>) => void;
  onChangeAddress: () => void;
  days: DayOption;
  duration: Duration;
  onContinue?: () => void;
};

export function DeliveryDetailsScreen({
  selectedAddress,
  deliveryDetails,
  onDeliveryDetailsChange,
  onChangeAddress,
  days,
  duration,
  onContinue,
}: DeliveryDetailsScreenProps) {
  const deliveryDates = useMemo(() => getUpcomingDeliveryDates(60), []);

  const addressTitle = selectedAddress?.title ?? 'Delivery address';
  const addressSub = selectedAddress?.subtitle ?? 'Select your delivery address';

  return (
    <div className={CHECKOUT_STEP_PAGE_LAYOUT.page} style={CHECKOUT_STEP_PAGE_VARS}>
      <div className={CHECKOUT_STEP_PAGE_LAYOUT.container}>
        <div className={CHECKOUT_STEP_PAGE_LAYOUT.header}>
          <h1 className={CHECKOUT_STEP_PAGE_LAYOUT.headerTitle}>Where do we deliver?</h1>
        </div>

        <div className={CHECKOUT_STEP_PAGE_LAYOUT.card}>
          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionTop}>
            <DeliveryAddressCard
              title={addressTitle}
              subtitle={addressSub}
              onClick={onChangeAddress}
            />

            <TextInput
              id="delivery-apartment"
              label="Apartment / villa number *"
              value={deliveryDetails.apartment}
              onChange={(e) => onDeliveryDetailsChange({ apartment: e.target.value })}
              placeholder="67"
            />

            <TextArea
              id="delivery-instructions"
              label="How can the courier find you?"
              value={deliveryDetails.instructions}
              onChange={(e) => onDeliveryDetailsChange({ instructions: e.target.value })}
              placeholder="E.g. Tower B, gate 2 from main road, blue door at end of hallway"
              rows={3}
            />

            <TextInput
              id="delivery-full-name"
              label="Full name *"
              value={deliveryDetails.fullName}
              onChange={(e) => onDeliveryDetailsChange({ fullName: e.target.value })}
              placeholder="Ahmed"
            />

            <TextInput
              id="delivery-email"
              label="E-mail *"
              type="email"
              value={deliveryDetails.email}
              onChange={(e) => onDeliveryDetailsChange({ email: e.target.value })}
              placeholder="email@themeal.menu"
            />
          </div>

          <Divider color={COLOR_TOKENS.neutral[75]} className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSection}>
            <MealCalendar
              duration={duration}
              dayOption={days}
              selectedDate={deliveryDetails.selectedDate}
              onSelectedDateChange={(selectedDate) => onDeliveryDetailsChange({ selectedDate })}
              availableDates={deliveryDates}
            />
          </div>

          <Divider color={COLOR_TOKENS.neutral[75]} className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionBottom}>
            <div
              className="flex flex-col gap-[24px] md:flex-row md:gap-[16px]"
              style={getFieldSizeStyle('large')}
            >
              <Dropdown
                id="delivery-time-slot"
                label="Delivery time"
                options={TIME_SLOTS.map((slot) => ({ value: slot, label: slot }))}
                value={deliveryDetails.selectedTimeSlot}
                onChange={(selectedTimeSlot) => onDeliveryDetailsChange({ selectedTimeSlot })}
                placeholder="Select timeslot"
                containerClassName="min-w-0 flex-1"
              />

              <div className="flex shrink-0 items-center md:mt-[22px] md:h-[length:var(--field-height)]">
                <Checkbox
                  id="leave-at-door"
                  checked={deliveryDetails.leaveAtDoor}
                  onChange={(leaveAtDoor) => onDeliveryDetailsChange({ leaveAtDoor })}
                  label="Leave the bag at the door"
                />
              </div>
            </div>

            <InfoBox />

            <Button type="button" variant="primary" size="medium" fullWidth onClick={onContinue}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
