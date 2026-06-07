import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { CheckoutHeader } from './CheckoutHeader';
import { PlanSelectorBlock } from './PlanSelectorBlock';
import { IngredientsBlock } from './IngredientsBlock';
import { DaysBlock } from './DaysBlock';
import { DurationBlock } from './DurationBlock';
import { OrderSummary } from './OrderSummary';
import { BottomFloatTotalBlock } from './BottomFloatTotalBlock';
import { FullMenuModal } from './FullMenuModal';
import { SmsCodeScreen } from './SmsCodeScreen';
import { DeliveryAddressScreen } from './DeliveryAddressScreen';
import { DeliveryDetailsScreen } from './DeliveryDetailsScreen';
import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import type { TestAddress } from '../../data/testAddresses';
import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';

type CheckoutStep = 'plan' | 'verification' | 'delivery' | 'payment';
type DeliveryStep = 'address' | 'details';

type CheckoutPageProps = {
  isOpen: boolean;
  onClose: () => void;
  initialCheckoutStep?: CheckoutStep;
  initialDeliveryStep?: DeliveryStep;
};

type CheckoutPageCssVariables = CSSProperties & {
  '--checkout-page-bg': string;
  '--checkout-payment-title-font-size': string;
  '--checkout-payment-title-font-size-md': string;
  '--checkout-payment-description-font-size': string;
};

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace('#', '');

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red},${green},${blue},${alpha})`;
}

const checkoutPageStyle: CheckoutPageCssVariables = {
  '--checkout-page-bg': COLOR_TOKENS.neutral[50],
  '--checkout-payment-title-font-size': FONT_SIZE_TOKENS[32],
  '--checkout-payment-title-font-size-md': FONT_SIZE_TOKENS[40],
  '--checkout-payment-description-font-size': FONT_SIZE_TOKENS[16],
};

const paymentCardStyle: CSSProperties = {
  backgroundColor: COLOR_TOKENS.base.white,
  boxShadow: `0 12px 36px ${hexToRgba(COLOR_TOKENS.neutral[900], 0.08)}`,
};

export function CheckoutPage({
  isOpen,
  onClose,
  initialCheckoutStep = 'plan',
  initialDeliveryStep = 'address',
}: CheckoutPageProps) {
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(initialCheckoutStep);
  const [deliveryStep, setDeliveryStep] = useState<DeliveryStep>(initialDeliveryStep);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [plan, setPlan] = useState<Plan>('base');
  const [lightMealOption, setLightMealOption] = useState<LightMealOption>('lunch-dinner');
  const [days, setDays] = useState<DayOption>('weekdays');
  const [duration, setDuration] = useState<Duration>('monthly');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [persons, setPersons] = useState(1);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<TestAddress | null>(null);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const headerStep =
    checkoutStep === 'plan'
      ? 'plan'
      : checkoutStep === 'payment'
        ? 'payment'
        : 'delivery';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCheckoutStep(initialCheckoutStep);
      setDeliveryStep(initialDeliveryStep);
      setMenuOpen(false);
      setSummaryVisible(initialCheckoutStep !== 'plan');
      return;
    }

    document.body.style.overflow = '';
    setCheckoutStep(initialCheckoutStep);
    setDeliveryStep(initialDeliveryStep);
    setMenuOpen(false);
    setSummaryVisible(false);

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialCheckoutStep, initialDeliveryStep]);

  useEffect(() => {
    if (!isOpen || checkoutStep !== 'plan') return;

    const right = rightRef.current;
    const body = bodyRef.current;

    if (!right || !body) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSummaryVisible(entry.isIntersecting),
      { root: body, threshold: 0.1 },
    );

    observer.observe(right);

    return () => observer.disconnect();
  }, [isOpen, checkoutStep]);

  const toggleIngredient = (key: string) => {
    setIngredients((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const scrollBodyToTop = () => {
    bodyRef.current?.scrollTo({ top: 0 });
  };

  const handleContinueFromPlan = () => {
    setMenuOpen(false);
    setSummaryVisible(true);

    if (isPhoneVerified) {
      setCheckoutStep('delivery');
      setDeliveryStep('address');
      scrollBodyToTop();
      return;
    }

    setCheckoutStep('verification');
    scrollBodyToTop();
  };

  const handleSmsContinue = () => {
    setIsPhoneVerified(true);
    setCheckoutStep('delivery');
    setDeliveryStep('address');
    scrollBodyToTop();
  };

  const handleAddressContinue = () => {
    if (!selectedAddress) return;

    setDeliveryStep('details');
    scrollBodyToTop();
  };

  const handleChangeAddress = () => {
    setCheckoutStep('delivery');
    setDeliveryStep('address');
    scrollBodyToTop();
  };

  const handleDeliveryDetailsContinue = () => {
    setCheckoutStep('payment');
    scrollBodyToTop();
  };

  const handleBack = () => {
    if (checkoutStep === 'payment') {
      setCheckoutStep('delivery');
      setDeliveryStep('details');
      return;
    }

    if (checkoutStep === 'delivery') {
      if (deliveryStep === 'details') {
        setDeliveryStep('address');
        return;
      }

      if (isPhoneVerified) {
        setCheckoutStep('plan');
        setMenuOpen(false);
        setSummaryVisible(false);
        return;
      }

      setCheckoutStep('verification');
      return;
    }

    if (checkoutStep === 'verification') {
      setCheckoutStep('plan');
      setMenuOpen(false);
      setSummaryVisible(false);
      return;
    }

    setCheckoutStep('plan');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col" style={checkoutPageStyle}>
      <CheckoutHeader step={headerStep} onBack={handleBack} onClose={onClose} />

      {checkoutStep === 'plan' ? (
        <>
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide"
          >
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[40px] px-[20px] md:flex-row md:gap-[24px] md:px-[24px] lg:px-[32px] xl:gap-[40px]">
              <div
                ref={leftRef}
                className="flex w-full flex-col gap-[32px] pt-[56px] md:flex-[1_1_0] md:gap-[48px] md:pb-[120px]"
              >
                <PlanSelectorBlock
                  selected={plan}
                  onSelect={setPlan}
                  lightMealOption={lightMealOption}
                  onLightMealOptionChange={setLightMealOption}
                />

                <IngredientsBlock selected={ingredients} onToggle={toggleIngredient} />

                <DaysBlock selected={days} onSelect={setDays} />

                <DurationBlock
                  selected={duration}
                  onSelect={setDuration}
                  plan={plan}
                  days={days}
                />
              </div>

              <div
                ref={rightRef}
                className="w-full p-[104px_0_120px] md:sticky md:top-[24px] md:mt-[56px] md:w-[380px] md:shrink-0 md:self-start md:p-[0_0_120px]"
              >
                <OrderSummary
                  plan={plan}
                  days={days}
                  duration={duration}
                  ingredients={ingredients}
                  persons={persons}
                  lightMealOption={lightMealOption}
                  onPersonsChange={setPersons}
                  onOpenMenu={() => setMenuOpen(true)}
                  onOrder={handleContinueFromPlan}
                />
              </div>
            </div>
          </div>

          <FullMenuModal
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            plan={plan}
            lightMealOption={lightMealOption}
          />

          <BottomFloatTotalBlock
            plan={plan}
            days={days}
            duration={duration}
            lightMealOption={lightMealOption}
            onOrder={handleContinueFromPlan}
            hidden={summaryVisible}
          />
        </>
      ) : checkoutStep === 'verification' ? (
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide"
        >
          <SmsCodeScreen
            onChangeNumber={() => {
              setCheckoutStep('plan');
              setMenuOpen(false);
              setSummaryVisible(false);
            }}
            onContinue={handleSmsContinue}
            onCodeComplete={() => {}}
          />
        </div>
      ) : checkoutStep === 'delivery' && deliveryStep === 'address' ? (
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide"
        >
          <DeliveryAddressScreen
            selectedAddress={selectedAddress}
            onSelectedAddressChange={setSelectedAddress}
            onContinue={handleAddressContinue}
          />
        </div>
      ) : checkoutStep === 'delivery' && deliveryStep === 'details' ? (
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide"
        >
          <DeliveryDetailsScreen
            selectedAddress={selectedAddress}
            onChangeAddress={handleChangeAddress}
            days={days}
            duration={duration}
            onContinue={handleDeliveryDetailsContinue}
          />
        </div>
      ) : (
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide"
        >
          <div className="mx-auto flex min-h-full w-full max-w-[760px] flex-col items-center justify-center px-[20px] py-[48px] text-center">
            <div
              className="rounded-[18px] px-[24px] py-[32px] md:px-[40px]"
              style={paymentCardStyle}
            >
              <h1
                className="font-['Quicksand'] text-[length:var(--checkout-payment-title-font-size)] font-bold leading-[115%] md:text-[length:var(--checkout-payment-title-font-size-md)]"
                style={{ color: COLOR_TOKENS.neutral[900] }}
              >
                Payment step
              </h1>

              <p
                className="mt-[12px] font-['Quicksand'] text-[length:var(--checkout-payment-description-font-size)] font-semibold leading-[145%]"
                style={{ color: COLOR_TOKENS.neutral[500] }}
              >
                Payment screen is not implemented yet.
              </p>

              <Button
                type="button"
                variant="primary"
                size="48"
                className="mt-[24px]"
                onClick={() => {
                  setCheckoutStep('delivery');
                  setDeliveryStep('details');
                }}
              >
                Back to delivery details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
