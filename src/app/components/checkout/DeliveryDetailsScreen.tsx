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
  getDeliveryEmailFieldError,
  getDeliveryFieldError,
  validateDeliveryDetails,
  type DeliveryDetailsFieldErrors,
  type DeliveryDetailsFieldKey,
} from './deliveryValidation';
import { MealCalendar } from './MealCalendar';
import { getUpcomingDeliveryDates } from './mealCalendarUtils';
import { DeliverySkipButton } from './DeliverySkipButton';

const TIME_SLOTS = ['7AM – 11AM', '12PM – 4PM', '6PM – 10PM'];

type DeliveryTextField = 'apartment' | 'fullName' | 'email';

const DELIVERY_TEXT_FIELDS: DeliveryTextField[] = ['apartment', 'fullName', 'email'];

/** Temporarily hidden — set to true to re-enable add-meal-day controls on the calendar. */
const ENABLE_ADD_MEAL_DAYS = false;

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

function getDeliveryTextInputState({
  field,
  deliveryDetails,
  touchedFields,
  error,
}: {
  field: DeliveryTextField;
  deliveryDetails: DeliveryDetailsData;
  touchedFields: Set<DeliveryTextField>;
  error?: string;
}) {
  if (error) return undefined;
  if (!touchedFields.has(field)) return undefined;
  if (!getDeliveryFieldError(field, deliveryDetails)) return 'success' as const;

  return undefined;
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
  onSkip?: () => void;
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
  onSkip,
}: DeliveryDetailsScreenProps) {
  const [fieldErrors, setFieldErrors] = useState<DeliveryDetailsFieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<DeliveryTextField>>(() => new Set());
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const deliveryDates = useMemo(() => getUpcomingDeliveryDates(60, days), [days]);

  const addressTitle = selectedAddress?.title ?? 'Delivery address';
  const addressSub = selectedAddress?.subtitle ?? 'Select your delivery address';

  const syncFieldError = (field: DeliveryDetailsFieldKey, details: DeliveryDetailsData) => {
    const message = getDeliveryFieldError(field, details);

    setFieldErrors((current) => {
      if (message) {
        if (current[field] === message) return current;

        return { ...current, [field]: message };
      }

      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const syncEmailFieldError = (email: string, requireValue = submitAttempted) => {
    const message = getDeliveryEmailFieldError(email, { requireValue });

    setFieldErrors((current) => {
      if (message) {
        if (current.email === message) return current;

        return { ...current, email: message };
      }

      if (!current.email) return current;

      const next = { ...current };
      delete next.email;
      return next;
    });
  };

  const markFieldTouched = (field: DeliveryTextField) => {
    setTouchedFields((current) => {
      if (current.has(field)) return current;

      const next = new Set(current);
      next.add(field);
      return next;
    });
  };

  const markAllTextFieldsTouched = () => {
    setTouchedFields(new Set(DELIVERY_TEXT_FIELDS));
  };

  const handleTextFieldChange = (field: DeliveryTextField, value: string) => {
    onDeliveryDetailsChange({ [field]: value });

    if (field === 'email') {
      setFieldErrors((current) => {
        if (!submitAttempted && !current.email) return current;

        const message = getDeliveryEmailFieldError(value, { requireValue: submitAttempted });

        if (message) {
          if (current.email === message) return current;

          return { ...current, email: message };
        }

        if (!current.email) return current;

        const next = { ...current };
        delete next.email;
        return next;
      });

      return;
    }

    if (submitAttempted) {
      syncFieldError(field, { ...deliveryDetails, [field]: value });
    }
  };

  const handleTextFieldBlur = (field: DeliveryTextField) => {
    markFieldTouched(field);

    if (field === 'email') {
      syncEmailFieldError(deliveryDetails.email);
      return;
    }

    if (submitAttempted) {
      syncFieldError(field, deliveryDetails);
    }
  };

  const handleSkip = () => {
    setFieldErrors({});
    setSubmitAttempted(false);
    onSkip?.();
  };

  const handleContinue = () => {
    markAllTextFieldsTouched();
    setSubmitAttempted(true);

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
    setSubmitAttempted(false);
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
              onChange={(e) => handleTextFieldChange('apartment', e.target.value)}
              onBlur={() => handleTextFieldBlur('apartment')}
              state={getDeliveryTextInputState({
                field: 'apartment',
                deliveryDetails,
                touchedFields,
                error: fieldErrors.apartment,
              })}
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
              onChange={(e) => handleTextFieldChange('fullName', e.target.value)}
              onBlur={() => handleTextFieldBlur('fullName')}
              state={getDeliveryTextInputState({
                field: 'fullName',
                deliveryDetails,
                touchedFields,
                error: fieldErrors.fullName,
              })}
              error={fieldErrors.fullName}
              placeholder="Ahmed"
            />

            <TextInput
              id="delivery-email"
              label="E-mail *"
              type="email"
              value={deliveryDetails.email}
              onChange={(e) => handleTextFieldChange('email', e.target.value)}
              onBlur={() => handleTextFieldBlur('email')}
              state={getDeliveryTextInputState({
                field: 'email',
                deliveryDetails,
                touchedFields,
                error: fieldErrors.email,
              })}
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
            {...(ENABLE_ADD_MEAL_DAYS
              ? {
                  enableAddMealDays: true,
                  plan,
                  persons,
                  extraMealDayKeys: new Set(extraMealDayKeys),
                  onMealDayKeysChange: ({
                    keysToAdd,
                    keysToRemove,
                  }: {
                    keysToAdd: string[];
                    keysToRemove: string[];
                  }) => {
                    const next = new Set(extraMealDayKeys);

                    for (const key of keysToAdd) {
                      next.add(key);
                    }

                    for (const key of keysToRemove) {
                      next.delete(key);
                    }

                    onExtraMealDayKeysChange([...next]);
                  },
                }
              : {})}
          />

          <Divider color={COLOR_TOKENS.neutral[75]} className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div
            {...checkoutStepSectionProps(
              CHECKOUT_STEP_SECTION_NAMES.deliveryOptions,
              `${CHECKOUT_STEP_PAGE_LAYOUT.cardSectionGap16} ${CHECKOUT_STEP_SECTION_PX}`,
            )}
          >
            <div
              className="flex flex-col gap-[24px] sm:flex-row"
              style={getFieldSizeStyle('large')}
            >
              <Dropdown
                nativeOnMobile
                id="delivery-time-slot"
                label="Delivery time *"
                options={TIME_SLOTS.map((slot) => ({ value: slot, label: slot }))}
                value={deliveryDetails.selectedTimeSlot}
                onChange={(selectedTimeSlot) => {
                  const nextDetails = { ...deliveryDetails, selectedTimeSlot };
                  onDeliveryDetailsChange({ selectedTimeSlot });

                  if (submitAttempted) {
                    syncFieldError('selectedTimeSlot', nextDetails);
                  }
                }}
                error={fieldErrors.selectedTimeSlot}
                placeholder="Select timeslot"
                containerClassName="min-w-0 flex-1 sm:max-w-[240px] sm:flex-none"
              />

              <div className="flex shrink-0 items-center sm:mt-[22px] sm:h-[length:var(--field-height)]">
                <Checkbox
                  id="leave-at-door"
                  checked={deliveryDetails.leaveAtDoor}
                  onChange={(leaveAtDoor) => onDeliveryDetailsChange({ leaveAtDoor })}
                  label="Leave the box at the door"
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
              Continue to payment
            </Button>

            {onSkip ? <DeliverySkipButton onSkip={handleSkip} className="mt-[16px]" /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
