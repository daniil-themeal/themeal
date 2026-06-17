import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import {
  formatAed,
  getCheckoutPrice,
  getFinalPeriodPrice,
  getTotalMeals,
} from '../../data/checkoutPricing';
import type { TestAddress } from '../../data/testAddresses';
import { getPromoCodeDiscount } from '../../config/promoCodes';
import { Button } from '../common/Button';
import { CheckoutTodayTotal } from '../common/CheckoutTodayTotal';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Divider } from '../common/Divider';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { MapPinIcon, PackageIcon, SmileIcon, TruckIcon } from '../common/icons';
import {
  PAYMENT_METHODS,
  PaymentMethodSelector,
  type PaymentMethodId,
} from '../common/PaymentMethodSelector';
import {
  getPlanTariffChips,
  getPlanTariffTitle,
} from '../common/planTariffSummaryUtils';
import { PlanTariffSummary } from '../common/PlanTariffSummary';
import { TEXT_TRIM_FIT_CLASS_NAME } from '../common/textTrimTokens';

import type { DeliveryDetailsData } from './deliveryDetailsTypes';
import {
  CHECKOUT_STEP_PAGE_LAYOUT,
  CHECKOUT_STEP_PAGE_VARS,
} from './checkoutStepPageLayoutTokens';
import { CHECKOUT_FONT_CLAMP_16_20 } from './checkoutSpacing';
import { IconTextRow } from '../common/IconTextRow';
import { ICON_TEXT_ROW_LAYOUT } from '../common/iconTextRowLayoutTokens';
import { CheckoutPromoCode } from './CheckoutPromoCode';

const SESSION_SECONDS = 8 * 60 + 59;

type PaymentScreenCssVariables = CSSProperties & {
  '--payment-text': string;
  '--payment-muted': string;
  '--payment-subtle': string;
  '--payment-primary': string;
  '--payment-success': string;
  '--payment-divider': string;
  '--payment-dotted-border': string;
  '--payment-section-title-fs': string;
  '--payment-body-fs': string;
  '--payment-small-fs': string;
};

const paymentScreenStyle: PaymentScreenCssVariables = {
  ...CHECKOUT_STEP_PAGE_VARS,
  '--payment-text': COLOR_TOKENS.neutral[900],
  '--payment-muted': COLOR_TOKENS.neutral[500],
  '--payment-subtle': COLOR_TOKENS.neutral[300],
  '--payment-primary': COLOR_TOKENS.primary[500],
  '--payment-success': COLOR_TOKENS.success[500],
  '--payment-divider': COLOR_TOKENS.neutral[75],
  '--payment-dotted-border': COLOR_TOKENS.neutral[200],
  '--payment-section-title-fs': CHECKOUT_FONT_CLAMP_16_20,
  '--payment-body-fs': FONT_SIZE_TOKENS[16],
  '--payment-small-fs': FONT_SIZE_TOKENS[14],
};

const DELIVERY_DATE_TIME_FALLBACK = '22 April 2026, 3AM-6AM';

function formatDeliveryDateTime(date: Date, timeSlot: string) {
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return timeSlot ? `${formattedDate}, ${timeSlot}` : formattedDate;
}

function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
}) {
  return (
    <div className="flex h-fit items-center justify-between gap-[12px]">
      <p
        className={[
          TEXT_TRIM_FIT_CLASS_NAME,
          'min-w-0 w-full font-sans text-[length:var(--payment-section-title-fs)] font-bold leading-[130%] text-[var(--payment-text)]',
        ].join(' ')}
      >
        {title}
      </p>

      {actionLabel && onAction ? (
        <Button
          type="button"
          variant="neutral"
          outline
          size="x-small"
          onClick={onAction}
          className="shrink-0"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

function PriceRow({
  label,
  value,
  valueVariant = 'default',
}: {
  label: ReactNode;
  value: ReactNode;
  valueVariant?: 'default' | 'success';
}) {
  const valueColorClass =
    valueVariant === 'success' ? 'text-[var(--payment-success)]' : 'text-[var(--payment-text)]';

  return (
    <div className="flex w-full min-w-0 flex-wrap items-end gap-x-[6px] gap-y-[4px]">
      <p
        className={[
          TEXT_TRIM_FIT_CLASS_NAME,
          'min-w-0 self-end font-sans text-[length:var(--payment-body-fs)] font-bold leading-[150%] text-[var(--payment-text)]',
        ].join(' ')}
      >
        {label}
      </p>

      <div className="mb-[0.25em] flex min-w-[24px] flex-1 basis-[24px] items-end">
        <div className="w-full border-b border-dotted border-[var(--payment-dotted-border)]" />
      </div>

      <p
        className={[
          TEXT_TRIM_FIT_CLASS_NAME,
          'shrink-0 self-end text-right font-sans text-[length:var(--payment-body-fs)] font-bold leading-[150%]',
          valueColorClass,
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  );
}

function formatSessionTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

type PaymentScreenProps = {
  plan: Plan;
  days: DayOption;
  duration: Duration;
  ingredients: string[];
  lightMealOption: LightMealOption;
  persons: number;
  selectedAddress: TestAddress | null;
  deliveryDetails: DeliveryDetailsData;
  onEditPlan: () => void;
  onEditDelivery: () => void;
  onPay?: () => void;
  appliedPromoCode?: string;
  onAppliedPromoCodeChange?: (code: string) => void;
};

export function PaymentScreen({
  plan,
  days,
  duration,
  ingredients,
  lightMealOption,
  persons,
  selectedAddress,
  deliveryDetails,
  onEditPlan,
  onEditDelivery,
  onPay,
  appliedPromoCode = '',
  onAppliedPromoCodeChange,
}: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('card');
  const [sessionSeconds, setSessionSeconds] = useState(SESSION_SECONDS);

  const pricing = useMemo(
    () => getCheckoutPrice({ plan, days, duration, persons }),
    [plan, days, duration, persons],
  );
  const mealsCount = useMemo(
    () => getTotalMeals({ plan, days, duration, persons }),
    [plan, days, duration, persons],
  );
  const promoDiscount = useMemo(
    () => (appliedPromoCode ? getPromoCodeDiscount(appliedPromoCode) : null),
    [appliedPromoCode],
  );
  const finalPeriodPrice = useMemo(
    () => getFinalPeriodPrice(pricing.periodPrice, promoDiscount),
    [pricing.periodPrice, promoDiscount],
  );
  const planTariffChips = useMemo(
    () =>
      getPlanTariffChips({
        plan,
        days,
        duration,
        ingredients,
        lightMealOption,
      }),
    [plan, days, duration, ingredients, lightMealOption],
  );

  const addressTitle = selectedAddress?.title ?? 'Delivery address';
  const addressSubtitle = selectedAddress?.subtitle ?? '';
  const apartmentLine = deliveryDetails.apartment
    ? `Apt ${deliveryDetails.apartment}`
    : '';
  const addressLines = [addressTitle, apartmentLine, addressSubtitle].filter(Boolean).join('. ');

  const deliveryInfoItems = useMemo(() => {
    const items: Array<{
      id: string;
      icon: ReactNode;
      title: ReactNode;
      subtitle?: ReactNode;
    }> = [
      {
        id: 'recipient',
        icon: <SmileIcon size={20} />,
        title: deliveryDetails.fullName || 'Rana Naanish',
      },
      {
        id: 'address',
        icon: <MapPinIcon size={20} />,
        title: addressLines || 'Select your delivery address',
        subtitle:
          deliveryDetails.instructions ||
          'Delivery orders involve receiving goods or services at a specified location, typically your home or office',
      },
    ];

    items.push({
      id: 'leave-at-door',
      icon: <PackageIcon size={20} />,
      title: 'Leave the box at the door',
    });

    items.push({
      id: 'delivery-date',
      icon: <TruckIcon size={20} />,
      title: deliveryDetails.selectedTimeSlot.trim()
        ? formatDeliveryDateTime(
            deliveryDetails.selectedDate,
            deliveryDetails.selectedTimeSlot,
          )
        : DELIVERY_DATE_TIME_FALLBACK,
    });

    return items;
  }, [
    addressLines,
    deliveryDetails.fullName,
    deliveryDetails.instructions,
    deliveryDetails.selectedDate,
    deliveryDetails.selectedTimeSlot,
  ]);

  useEffect(() => {
    if (sessionSeconds <= 0) return;

    const timerId = window.setInterval(() => {
      setSessionSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [sessionSeconds]);

  const paymentMethods = PAYMENT_METHODS;

  return (
    <div className={CHECKOUT_STEP_PAGE_LAYOUT.page} style={paymentScreenStyle}>
      <div className={CHECKOUT_STEP_PAGE_LAYOUT.container}>
        <div className={CHECKOUT_STEP_PAGE_LAYOUT.header}>
          <h1 className={CHECKOUT_STEP_PAGE_LAYOUT.headerTitle}>Review and pay</h1>

          <p className={CHECKOUT_STEP_PAGE_LAYOUT.headerSubtitle}>
            Check your order and complete payment
          </p>
        </div>

        <div className={CHECKOUT_STEP_PAGE_LAYOUT.card}>
          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionTop}>
            <PlanTariffSummary
              title={getPlanTariffTitle(plan)}
              chips={planTariffChips}
              actionLabel="Edit"
              onAction={onEditPlan}
            />
          </div>

          <Divider color="var(--payment-divider)" className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionGap16}>
            <SectionHeader title="Delivery information" actionLabel="Edit" onAction={onEditDelivery} />

            <div className={ICON_TEXT_ROW_LAYOUT.list}>
              {deliveryInfoItems.map((item) => (
                <IconTextRow
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
            </div>
          </div>

          <Divider color="var(--payment-divider)" className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionGap12}>
            <SectionHeader title="Payment method" />

            <div className="flex flex-col gap-[8px]">
              {paymentMethods.map((method) => (
                <PaymentMethodSelector
                  key={method}
                  method={method}
                  selected={paymentMethod === method}
                  onSelect={() => setPaymentMethod(method)}
                />
              ))}
            </div>
          </div>

          <Divider color="var(--payment-divider)" className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionGap12}>
            <CheckoutPromoCode
              variant="payment"
              inputId="payment-promo-code"
              appliedCode={appliedPromoCode}
              onAppliedCodeChange={onAppliedPromoCodeChange ?? (() => {})}
            />
          </div>

          <Divider color="var(--payment-divider)" className={CHECKOUT_STEP_PAGE_LAYOUT.divider} />

          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionGap16}>
            <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionInner}>
              <PriceRow
                label={
                  <>
                    Total meals <span className="font-medium">(over {pricing.paidDays} days)</span>
                  </>
                }
                value={mealsCount}
              />

              <PriceRow label="Delivery and pause" value="Free" />

              {appliedPromoCode && promoDiscount !== null ? (
                <PriceRow
                  label={`Promo code ${appliedPromoCode}`}
                  value={`-AED ${formatAed(promoDiscount)}`}
                />
              ) : null}

              <CheckoutTodayTotal
                className="pt-[4px]"
                oldPeriodPrice={pricing.oldPeriodPrice}
                periodPrice={finalPeriodPrice}
                pricePerDay={pricing.pricePerDay}
              />
            </div>
          </div>

          <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardFooter}>
            <div className={CHECKOUT_STEP_PAGE_LAYOUT.cardSectionInner}>
              <Button type="button" variant="primary" size="medium" fullWidth onClick={onPay}>
                Pay AED {formatAed(finalPeriodPrice)}
              </Button>

              <p
                className={[
                  TEXT_TRIM_FIT_CLASS_NAME,
                  'w-full text-left font-sans text-[length:var(--payment-small-fs)] font-medium leading-[140%] text-[var(--payment-muted)]',
                ].join(' ')}
              >
                {paymentMethod === 'tabby'
                  ? 'This is a one-time order via Tabby — to continue your meals, place a new order at the end of this period'
                  : "Your subscription renews automatically — we'll send the upcoming amount 5 days before each charge. Change or cancel anytime."}
              </p>

              <p
                className={[
                  TEXT_TRIM_FIT_CLASS_NAME,
                  'text-center font-sans text-[length:var(--payment-small-fs)] font-semibold leading-[140%] text-[var(--payment-muted)]',
                ].join(' ')}
              >
                Session expires in {formatSessionTime(sessionSeconds)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
