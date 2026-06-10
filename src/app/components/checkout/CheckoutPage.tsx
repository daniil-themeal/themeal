import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { CheckoutHeader } from './CheckoutHeader';
import type { CheckoutHeaderStep } from './CheckoutHeader';
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
import { createInitialDeliveryDetails } from './deliveryDetailsTypes';
import type { DeliveryDetailsData } from './deliveryDetailsTypes';
import { PaymentScreen } from './PaymentScreen';
import { PaymentSuccessScreen } from './PaymentSuccessScreen';
import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import type { TestAddress } from '../../data/testAddresses';
import { COLOR_TOKENS } from '../common/colorTokens';
import { formatUaePhoneInput, validateUaePhone } from './phoneValidation';

type CheckoutStep = 'plan' | 'verification' | 'delivery' | 'payment' | 'success';
type DeliveryStep = 'address' | 'details';

type CheckoutPageProps = {
  isOpen: boolean;
  onClose: () => void;
  initialCheckoutStep?: CheckoutStep;
  initialDeliveryStep?: DeliveryStep;
  initialPhone?: string;
};

type CheckoutPageCssVariables = CSSProperties & {
  '--checkout-page-bg': string;
};

const checkoutPageStyle: CheckoutPageCssVariables = {
  '--checkout-page-bg': COLOR_TOKENS.neutral[50],
};

const checkoutStepScrollClassName =
  'flex-1 overflow-y-auto bg-white md:bg-[var(--checkout-page-bg)] scrollbar-hide';

export function CheckoutPage({
  isOpen,
  onClose,
  initialCheckoutStep = 'plan',
  initialDeliveryStep = 'address',
  initialPhone,
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
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetailsData>(() =>
    createInitialDeliveryDetails(),
  );
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>();

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
      setPhoneError(undefined);

      if (initialPhone) {
        const digits = initialPhone.replace(/\D/g, '').replace(/^971/, '').slice(-9);
        setPhone(formatUaePhoneInput(digits));
      } else if (initialCheckoutStep === 'plan') {
        setPhone('');
      }

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
  }, [isOpen, initialCheckoutStep, initialDeliveryStep, initialPhone]);

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

  const handlePhoneChange = (value: string) => {
    setPhone(formatUaePhoneInput(value));
    setPhoneError(undefined);
  };

  const handleScrollToSummary = () => {
    setMenuOpen(false);
    rightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleContinueFromPlan = () => {
    setMenuOpen(false);
    setSummaryVisible(true);

    const phoneValidation = validateUaePhone(phone);

    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      handleScrollToSummary();
      return;
    }

    if (phoneValidation.formatted) {
      setPhone(phoneValidation.formatted);
    }

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

  const handlePay = () => {
    setCheckoutStep('success');
    scrollBodyToTop();
  };

  const handleGoToMain = () => {
    onClose();
  };

  const handleDeliveryDetailsChange = (patch: Partial<DeliveryDetailsData>) => {
    setDeliveryDetails((current) => ({ ...current, ...patch }));
  };

  const handleEditPlan = () => {
    setCheckoutStep('plan');
    setMenuOpen(false);
    setSummaryVisible(true);
    scrollBodyToTop();
  };

  const handleEditDelivery = () => {
    setCheckoutStep('delivery');
    setDeliveryStep('details');
    scrollBodyToTop();
  };

  const handleStepSelect = (step: CheckoutHeaderStep) => {
    setMenuOpen(false);

    if (step === 'plan') {
      setCheckoutStep('plan');
      setSummaryVisible(true);
      scrollBodyToTop();
      return;
    }

    if (step === 'delivery') {
      setCheckoutStep('delivery');
      setDeliveryStep('details');
      scrollBodyToTop();
      return;
    }

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
      {checkoutStep !== 'success' ? (
        <CheckoutHeader
          step={headerStep}
          onBack={handleBack}
          onClose={onClose}
          onStepSelect={handleStepSelect}
        />
      ) : null}

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
                className="w-full md:sticky md:top-[24px] md:w-[380px] md:shrink-0 md:self-start md:pb-[120px]"
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
                  phone={phone}
                  onPhoneChange={handlePhoneChange}
                  phoneError={phoneError}
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
            onScrollToSummary={handleScrollToSummary}
            hidden={summaryVisible}
          />
        </>
      ) : checkoutStep === 'verification' ? (
        <div ref={bodyRef} className={checkoutStepScrollClassName}>
          <SmsCodeScreen
            phone={phone}
            onPhoneChange={handlePhoneChange}
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
        <div ref={bodyRef} className={checkoutStepScrollClassName}>
          <DeliveryAddressScreen
            selectedAddress={selectedAddress}
            onSelectedAddressChange={setSelectedAddress}
            onContinue={handleAddressContinue}
          />
        </div>
      ) : checkoutStep === 'delivery' && deliveryStep === 'details' ? (
        <div ref={bodyRef} className={checkoutStepScrollClassName}>
          <DeliveryDetailsScreen
            selectedAddress={selectedAddress}
            deliveryDetails={deliveryDetails}
            onDeliveryDetailsChange={handleDeliveryDetailsChange}
            onChangeAddress={handleChangeAddress}
            days={days}
            duration={duration}
            onContinue={handleDeliveryDetailsContinue}
          />
        </div>
      ) : checkoutStep === 'payment' ? (
        <div ref={bodyRef} className={checkoutStepScrollClassName}>
          <PaymentScreen
            plan={plan}
            days={days}
            duration={duration}
            ingredients={ingredients}
            lightMealOption={lightMealOption}
            persons={persons}
            selectedAddress={selectedAddress}
            deliveryDetails={deliveryDetails}
            onEditPlan={handleEditPlan}
            onEditDelivery={handleEditDelivery}
            onPay={handlePay}
          />
        </div>
      ) : (
        <div ref={bodyRef} className={checkoutStepScrollClassName}>
          <PaymentSuccessScreen
            days={days}
            duration={duration}
            startDate={deliveryDetails.selectedDate}
            onClose={onClose}
            onGoToMain={handleGoToMain}
          />
        </div>
      )}
    </div>
  );
}
