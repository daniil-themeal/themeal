import type { DayOption, Duration } from '../../data/checkoutPricing';
import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Divider } from '../common/Divider';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';

import {
  CHECKOUT_STEP_PAGE_LAYOUT,
  CHECKOUT_STEP_PAGE_VARS,
  CHECKOUT_STEP_SECTION_PX,
} from './checkoutStepPageLayoutTokens';
import { CHECKOUT_FONT_CLAMP_25_31 } from './checkoutSpacing';
import type { PaymentResultTab } from './PaymentResultHeader';
import { PaymentResultHeader } from './PaymentResultHeader';
import { MealCalendarPreview } from './MealCalendar';
import {
  SuccessContactSection,
  successContactSectionStyle,
} from './success/SuccessContactSection';
import {
  SuccessRuleIcon,
  type SuccessRuleIconKey,
} from './success/SuccessRuleIcons';

type PaymentSuccessScreenProps = {
  days: DayOption;
  duration: Duration;
  startDate: Date;
  onClose: () => void;
  onTabChange: (tab: PaymentResultTab) => void;
  onGoToMain: () => void;
};

type SuccessRule = {
  iconBg: string;
  iconKey: SuccessRuleIconKey;
  title: string;
  description: string;
};

const SUCCESS_RULES: SuccessRule[] = [
  {
    iconBg: COLOR_TOKENS.warning[500],
    iconKey: 'calendar',
    title: 'Fixed Delivery Days',
    description: 'Deliveries are on Wednesdays and Sundays only — days cannot be changed',
  },
  {
    iconBg: COLOR_TOKENS.secondary[400],
    iconKey: 'pause',
    title: 'Delivery Pause',
    description:
      'You can pause for 1–2 weeks for free (depending on the length of your plan). The price of longer pause is 90 AED',
  },
  {
    iconBg: COLOR_TOKENS.orange[500],
    iconKey: 'meal',
    title: 'Set Menu',
    description:
      'Our meal menu is fixed — changing dishes or removing ingredients is not possible. But you can change the format, duration and number of meals per day',
  },
  {
    iconBg: COLOR_TOKENS.primary[400],
    iconKey: 'clock',
    title: 'Order Changes Deadline',
    description:
      'You can only reschedule at least 3 days in advance, and update the delivery time or address at least 2 days before',
  },
  {
    iconBg: COLOR_TOKENS.blue[400],
    iconKey: 'snowflake',
    title: 'Storage Instructions',
    description: 'Meals stay fresh for 6 days. Please refrigerate immediately after delivery',
  },
  {
    iconBg: COLOR_TOKENS.success[300],
    iconKey: 'recycle',
    title: 'Return the Box',
    description:
      'Please return the box with iceblocks by leaving it at your door before next delivery — the courier will pick it up',
  },
];

function PaymentSuccessIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
      <circle cx="28" cy="28" r="28" fill={COLOR_TOKENS.success[500]} />
      <path
        d="M44 18L23 39L12 28"
        stroke="white"
        strokeWidth="5.44"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuccessRuleRow({ iconBg, iconKey, title, description }: SuccessRule) {
  return (
    <div className="flex w-full items-start gap-[20px]">
      <div className="relative size-[48px] shrink-0">
        <svg className="absolute inset-0 block size-full" fill="none" viewBox="0 0 48 48" aria-hidden>
          <circle cx="24" cy="24" fill={iconBg} r="24" />
        </svg>
        <div className="absolute inset-[14.29%]">
          <SuccessRuleIcon iconKey={iconKey} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[12px] py-[4px]">
        <h3
          className={[
            TEXT_TRIM_CLASS_NAME,
            'w-full font-sans text-[20px] font-bold leading-[130%]',
          ].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          {title}
        </h3>
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'w-full font-sans text-[16px] font-medium leading-[130%]',
          ].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export function PaymentSuccessScreen({
  days,
  duration,
  startDate,
  onClose,
  onTabChange,
  onGoToMain,
}: PaymentSuccessScreenProps) {
  return (
    <div
      className={CHECKOUT_STEP_PAGE_LAYOUT.page}
      style={{
        ...CHECKOUT_STEP_PAGE_VARS,
        ...successContactSectionStyle,
        '--checkout-success-rules-title-fs': CHECKOUT_FONT_CLAMP_25_31,
      }}
    >
      <PaymentResultHeader activeTab="success" onTabChange={onTabChange} onClose={onClose} />

      <div className={CHECKOUT_STEP_PAGE_LAYOUT.container}>
        <div className={CHECKOUT_STEP_PAGE_LAYOUT.header}>
          <div className="flex flex-col items-center gap-[24px]">
            <div className="size-[56px] shrink-0">
              <PaymentSuccessIcon />
            </div>

            <div className="flex w-full flex-col items-center gap-[16px] text-center">
              <h1 className={CHECKOUT_STEP_PAGE_LAYOUT.headerTitle}>Payment successful!</h1>
              <p className={CHECKOUT_STEP_PAGE_LAYOUT.headerSubtitle}>
                Thank you for choosing us!
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-[1] mx-auto w-full max-w-[380px]">
          <Button type="button" variant="primary" size="medium" fullWidth onClick={onGoToMain}>
            Go to main page
          </Button>
        </div>

        <div className={`relative z-0 ${CHECKOUT_STEP_PAGE_LAYOUT.card}`}>
          <div className={`${CHECKOUT_STEP_PAGE_LAYOUT.cardSection} ${CHECKOUT_STEP_SECTION_PX}`}>
            <MealCalendarPreview
              startDate={startDate}
              duration={duration}
              dayOption={days}
              className="w-full"
            />
          </div>

          <Divider
            color={COLOR_TOKENS.neutral[75]}
            className={CHECKOUT_STEP_PAGE_LAYOUT.divider}
          />

          <div className={`${CHECKOUT_STEP_PAGE_LAYOUT.cardSectionBottom} ${CHECKOUT_STEP_SECTION_PX}`}>
            <h2
              className={[
                TEXT_TRIM_CLASS_NAME,
                'w-full text-center font-sans text-[length:var(--checkout-success-rules-title-fs)] font-bold leading-[130%]',
              ].join(' ')}
              style={{ color: COLOR_TOKENS.neutral[800] }}
            >
              Please, read our rules
            </h2>

            <div className="flex w-full flex-col gap-[24px]">
              {SUCCESS_RULES.map((rule) => (
                <SuccessRuleRow key={rule.title} {...rule} />
              ))}
            </div>
          </div>
        </div>

        <SuccessContactSection />
      </div>
    </div>
  );
}
