import { useMemo, useState } from 'react';

import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
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

import { CHECKOUT_DELIVERY_SECTION_GAP_CLAMP } from './checkoutSpacing';
import {
  CHECKOUT_STEP_PAGE_LAYOUT,
  CHECKOUT_STEP_PAGE_VARS,
  CHECKOUT_STEP_SECTION_NAMES,
  CHECKOUT_STEP_SECTION_PX,
  checkoutStepSectionProps,
} from './checkoutStepPageLayoutTokens';
import type { DeliveryDetailsData } from './deliveryDetailsTypes';
import {
  validateDeliveryDetails,
  type DeliveryDetailsFieldErrors,
} from './deliveryValidation';
import { MealCalendar } from './MealCalendar';
import { getUpcomingDeliveryDates } from './mealCalendarUtils';

const TIME_SLOTS = ['7AM – 11AM', '12PM – 4PM', '6PM – 10PM'];

const deliveryDetailsPageStyle = {
  ...CHECKOUT_STEP_PAGE_VARS,
  '--checkout-section-gap': CHECKOUT_DELIVERY_SECTION_GAP_CLAMP,
};

function getFirstDeliveryFieldErrorId(errors: DeliveryDetailsFieldErrors) {
  if (errors.apartment) return 'delivery-apartment';
  if (errors.fullName) return 'delivery-full-name';
  if (errors.email) return 'delivery-email';
  if (errors.selectedTimeSlot) return 'delivery-time-slot';

  return null;
}

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
  plan: Plan;
  persons: number;
  extraMealDayKeys: string[];
  onExtraMealDayKeysChange: (keys: string[]) => void;
  onContinue?: () => void;
};

export function DeliveryDetailsScreen({
  selectedAddress,
  deliveryDetails,
  onDeliveryDetailsChange,
  onChangeAddress,
  days,
  duration,
  plan,
  persons,
  extraMealDayKeys,
  onExtraMealDayKeysChange,
  onContinue,
}: DeliveryDetailsScreenProps) {
  const [fieldErrors, setFieldErrors] = useState<DeliveryDetailsFieldErrors>({});
  const deliveryDates = useMemo(() => getUpcomingDeliveryDates(60), []);

  const addressTitle = selectedAddress?.title ?? 'Delivery address';
  const addressSub = selectedAddress?.subtitle ?? 'Select your delivery address';

  const clearFieldError = (field: keyof DeliveryDetailsFieldErrors) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleContinue = () => {
    const validation = validateDeliveryDetails(deliveryDetails);

    if (!validation.isValid) {
      setFieldErrors(validation.errors);

      const firstErrorId = getFirstDeliveryFieldErrorId(validation.errors);

      if (firstErrorId) {
        requestAnimationFrame(() => {
          document.getElementById(firstErrorId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          document.getElementById(firstErrorId)?.focus();
        });
      }

      return;
    }

    setFieldErrors({});
    onContinue?.();
  };

  return (
    <div className={CHECKOUT_STEP_PAGE_LAYOUT.page} style={deliveryDetailsPageStyle}>
      <div className={CHECKOUT_STEP_PAGE_LAYOUT.container}>
        <div className={CHECKOUT_STEP_PAGE_LAYOUT.header}>
          <h1 className={CHECKOUT_STEP_PAGE_LAYOUT.headerTitle}>Where do we deliver?</h1>
        </div>

        <div className={CHECKOUT_STEP_PAGE_LAYOUT.card}>
          <div
            {...checkoutStepSectionProps(
              CHECKOUT_STEP_SECTION_NAMES.cardSectionTop,
              CHECKOUT_STEP_PAGE_LAYOUT.cardSectionTop,
            )}
          >
            <DeliveryAddressCard
              title={addressTitle}
              subtitle={addressSub}
              onClick={onChangeAddress}
            />

            <TextInput
              id="delivery-apartment"
              label="Apartment / villa number *"
              value={deliveryDetails.apartment}
              onChange={(e) => {
                onDeliveryDetailsChange({ apartment: e.target.value });
                clearFieldError('apartment');
              }}
              error={fieldErrors.apartment}
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
              onChange={(e) => {
                onDeliveryDetailsChange({ fullName: e.target.value });
                clearFieldError('fullName');
              }}
              error={fieldErrors.fullName}
              placeholder="Ahmed"
            />

            <TextInput
              id="delivery-email"
              label="E-mail *"
              type="email"
              value={deliveryDetails.email}
              onChange={(e) => {
                onDeliveryDetailsChange({ email: e.target.value });
                clearFieldError('email');
              }}
              error={fieldErrors.email}
              placeholder="email@themeal.menu"
            />
          </div>

          <Divider color={COLOR_TOKENS.neutral[75]} className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <MealCalendar
            duration={duration}
            dayOption={days}
            selectedDate={deliveryDetails.selectedDate}
            onSelectedDateChange={(selectedDate) => onDeliveryDetailsChange({ selectedDate })}
            availableDates={deliveryDates}
            enableAddMealDays
            plan={plan}
            persons={persons}
            extraMealDayKeys={new Set(extraMealDayKeys)}
            onMealDayKeysChange={({ keysToAdd, keysToRemove }) => {
              const next = new Set(extraMealDayKeys);

              for (const key of keysToAdd) {
                next.add(key);
              }

              for (const key of keysToRemove) {
                next.delete(key);
              }

              onExtraMealDayKeysChange([...next]);
            }}
          />

          <Divider color={COLOR_TOKENS.neutral[75]} className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div
            {...checkoutStepSectionProps(
              CHECKOUT_STEP_SECTION_NAMES.deliveryOptions,
              `${CHECKOUT_STEP_PAGE_LAYOUT.cardSectionGap16} ${CHECKOUT_STEP_SECTION_PX}`,
            )}
          >
            <div
              className="flex flex-col gap-[24px] sm:flex-row sm:gap-[16px]"
              style={getFieldSizeStyle('large')}
            >
              <Dropdown
                nativeOnMobile
                id="delivery-time-slot"
                label="Delivery time *"
                options={TIME_SLOTS.map((slot) => ({ value: slot, label: slot }))}
                value={deliveryDetails.selectedTimeSlot}
                onChange={(selectedTimeSlot) => {
                  onDeliveryDetailsChange({ selectedTimeSlot });
                  clearFieldError('selectedTimeSlot');
                }}
                error={fieldErrors.selectedTimeSlot}
                placeholder="Select timeslot"
                containerClassName="min-w-0 flex-1"
              />

              <div className="flex shrink-0 items-center sm:mt-[22px] sm:h-[length:var(--field-height)]">
                <Checkbox
                  id="leave-at-door"
                  checked={deliveryDetails.leaveAtDoor}
                  onChange={(leaveAtDoor) => onDeliveryDetailsChange({ leaveAtDoor })}
                  label="Leave the bag at the door"
                />
              </div>
            </div>

            {deliveryDetails.leaveAtDoor ? <InfoBox /> : null}
          </div>

          <div
            {...checkoutStepSectionProps(
              CHECKOUT_STEP_SECTION_NAMES.checkoutCta,
              `mt-[length:var(--checkout-section-gap)] ${CHECKOUT_STEP_PAGE_LAYOUT.cardSectionBottom} ${CHECKOUT_STEP_SECTION_PX}`,
            )}
          >
            <Button type="button" variant="primary" size="medium" fullWidth onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
