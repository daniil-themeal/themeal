import { useCallback, useEffect, useRef, useState } from 'react';
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
import { PaymentFailedScreen } from './PaymentFailedScreen';
import type { PaymentResultTab } from './PaymentResultHeader';
import { PaymentSuccessScreen } from './PaymentSuccessScreen';
import type { DayOption, Duration, Plan } from '../../data/checkoutPricing';
import type { LightMealOption } from '../../data/testMeals';
import type { TestAddress } from '../../data/testAddresses';
import type { PhoneSession } from '../../phoneSession';
import { mergePhoneSession } from '../../phoneSession';
import { COLOR_TOKENS } from '../common/colorTokens';
import { formatUaePhoneInput, normalizeUaePhone, validateUaePhone } from './phoneValidation';

type CheckoutStep = 'plan' | 'verification' | 'delivery' | 'payment' | 'success' | 'failed';
type DeliveryStep = 'address' | 'details';

type CheckoutPageProps = {
  isOpen: boolean;
  onClose: () => void;
  initialCheckoutStep?: CheckoutStep;
  initialDeliveryStep?: DeliveryStep;
  initialPhone?: string;
  initialIsVerified?: boolean;
  onSessionUpdate?: (session: PhoneSession) => void;
  onResetPhone?: () => void;
};

type CheckoutPageCssVariables = CSSProperties & {
  '--checkout-page-bg': string;
};

const checkoutPageStyle: CheckoutPageCssVariables = {
  '--checkout-page-bg': COLOR_TOKENS.base.cream,
};

const checkoutStepScrollClassName =
  'flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide';

function phoneDigitsFromInitial(initialPhone?: string): string {
  if (!initialPhone) return '';
  return initialPhone.replace(/\D/g, '').replace(/^971/, '').slice(-9);
}

export function CheckoutPage({
  isOpen,
  onClose,
  initialCheckoutStep = 'plan',
  initialDeliveryStep = 'address',
  initialPhone,
  initialIsVerified = false,
  onSessionUpdate,
  onResetPhone,
}: CheckoutPageProps) {
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(initialCheckoutStep);
  const [deliveryStep, setDeliveryStep] = useState<DeliveryStep>(initialDeliveryStep);
  const [isPhoneVerified, setIsPhoneVerified] = useState(initialIsVerified);

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
  const totalMealsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const headerStep =
    checkoutStep === 'plan'
      ? 'plan'
      : checkoutStep === 'payment'
        ? 'payment'
        : 'delivery';

  const persistSession = useCallback(
    (
      patch: Partial<PhoneSession> & {
        checkoutStep?: PhoneSession['checkoutStep'];
        deliveryStep?: PhoneSession['deliveryStep'];
      },
      verifiedOverride?: boolean,
    ) => {
      if (!onSessionUpdate) return;

      const normalized = normalizeUaePhone(phone) ?? patch.phone ?? '';
      const isVerified = verifiedOverride ?? patch.isVerified ?? isPhoneVerified;

      onSessionUpdate(
        mergePhoneSession(null, {
          phone: normalized || patch.phone || '',
          isVerified,
          checkoutStep: patch.checkoutStep ?? (checkoutStep === 'success' || checkoutStep === 'failed' ? 'payment' : checkoutStep),
          deliveryStep: patch.deliveryStep ?? deliveryStep,
        }),
      );
    },
    [checkoutStep, deliveryStep, isPhoneVerified, onSessionUpdate, phone],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCheckoutStep(initialCheckoutStep);
      setDeliveryStep(initialDeliveryStep);
      setIsPhoneVerified(initialIsVerified);
      setMenuOpen(false);
      setSummaryVisible(initialCheckoutStep !== 'plan');
      setPhoneError(undefined);

      const digits = phoneDigitsFromInitial(initialPhone);
      if (digits) {
        setPhone(formatUaePhoneInput(digits));
      } else if (initialCheckoutStep === 'plan' && !initialIsVerified) {
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
  }, [isOpen, initialCheckoutStep, initialDeliveryStep, initialPhone, initialIsVerified]);

  useEffect(() => {
    if (!isOpen || checkoutStep !== 'plan') return;

    const anchor = totalMealsRef.current;
    const body = bodyRef.current;

    if (!anchor || !body) return;

    const observer = new IntersectionObserver(
      ([entry]) => setSummaryVisible(entry.isIntersecting),
      { root: body, threshold: 0.1 },
    );

    observer.observe(anchor);

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

  const handleResetPhone = useCallback(() => {
    onResetPhone?.();
    setIsPhoneVerified(false);
    setPhone('');
    setPhoneError(undefined);
    setCheckoutStep('plan');
    setDeliveryStep('address');
    setMenuOpen(false);
    setSummaryVisible(false);
  }, [onResetPhone]);

  const handleScrollToSummary = () => {
    setMenuOpen(false);
    (totalMealsRef.current ?? rightRef.current)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleContinueFromPlan = () => {
    setMenuOpen(false);
    setSummaryVisible(true);

    if (isPhoneVerified) {
      setCheckoutStep('delivery');
      setDeliveryStep('address');
      persistSession({ checkoutStep: 'delivery', deliveryStep: 'address' });
      scrollBodyToTop();
      return;
    }

    const validation = validateUaePhone(phone);
    if (!validation.isValid) {
      setPhoneError(validation.error);
      handleScrollToSummary();
      return;
    }

    if (validation.formatted) {
      setPhone(validation.formatted);
    }

    setPhoneError(undefined);
    const normalized = normalizeUaePhone(phone);
    if (normalized) {
      persistSession({ phone: normalized, checkoutStep: 'verification', isVerified: false });
    }

    setCheckoutStep('verification');
    scrollBodyToTop();
  };

  const handleSmsContinue = () => {
    setIsPhoneVerified(true);
    setCheckoutStep('delivery');
    setDeliveryStep('address');
    const normalized = normalizeUaePhone(phone);
    persistSession(
      {
        phone: normalized ?? phone,
        checkoutStep: 'delivery',
        deliveryStep: 'address',
        isVerified: true,
      },
      true,
    );
    scrollBodyToTop();
  };

  const handleAddressContinue = () => {
    if (!selectedAddress) return;

    setDeliveryStep('details');
    persistSession({ checkoutStep: 'delivery', deliveryStep: 'details' });
    scrollBodyToTop();
  };

  const handleChangeAddress = () => {
    setCheckoutStep('delivery');
    setDeliveryStep('address');
    persistSession({ checkoutStep: 'delivery', deliveryStep: 'address' });
    scrollBodyToTop();
  };

  const handleDeliveryDetailsContinue = () => {
    setCheckoutStep('payment');
    persistSession({ checkoutStep: 'payment' });
    scrollBodyToTop();
  };

  const handlePay = () => {
    setCheckoutStep('success');
    scrollBodyToTop();
  };

  const handleGoToMain = () => {
    onClose();
  };

  const handleResultTabChange = (tab: PaymentResultTab) => {
    setCheckoutStep(tab);
    scrollBodyToTop();
  };

  const handleReturnToPayment = () => {
    setCheckoutStep('payment');
    persistSession({ checkoutStep: 'payment' });
    scrollBodyToTop();
  };

  const handleDeliveryDetailsChange = (patch: Partial<DeliveryDetailsData>) => {
    setDeliveryDetails((current) => ({ ...current, ...patch }));
  };

  const handleEditPlan = () => {
    setCheckoutStep('plan');
    setMenuOpen(false);
    setSummaryVisible(true);
    persistSession({ checkoutStep: 'plan' });
    scrollBodyToTop();
  };

  const handleEditDelivery = () => {
    setCheckoutStep('delivery');
    setDeliveryStep('details');
    persistSession({ checkoutStep: 'delivery', deliveryStep: 'details' });
    scrollBodyToTop();
  };

  const handleStepSelect = (step: CheckoutHeaderStep) => {
    setMenuOpen(false);

    if (step === 'plan') {
      setCheckoutStep('plan');
      setSummaryVisible(true);
      persistSession({ checkoutStep: 'plan' });
      scrollBodyToTop();
      return;
    }

    if (step === 'delivery') {
      setCheckoutStep('delivery');
      setDeliveryStep('details');
      persistSession({ checkoutStep: 'delivery', deliveryStep: 'details' });
      scrollBodyToTop();
      return;
    }

    setCheckoutStep('payment');
    persistSession({ checkoutStep: 'payment' });
    scrollBodyToTop();
  };

  const handleBack = () => {
    if (checkoutStep === 'payment') {
      setCheckoutStep('delivery');
      setDeliveryStep('details');
      persistSession({ checkoutStep: 'delivery', deliveryStep: 'details' });
      return;
    }

    if (checkoutStep === 'delivery') {
      if (deliveryStep === 'details') {
        setDeliveryStep('address');
        persistSession({ deliveryStep: 'address' });
        return;
      }

      if (isPhoneVerified) {
        setCheckoutStep('plan');
        setMenuOpen(false);
        setSummaryVisible(false);
        persistSession({ checkoutStep: 'plan' });
        return;
      }

      setCheckoutStep('verification');
      persistSession({ checkoutStep: 'verification' });
      return;
    }

    if (checkoutStep === 'verification') {
      setCheckoutStep('plan');
      setMenuOpen(false);
      setSummaryVisible(false);
      persistSession({ checkoutStep: 'plan' });
      return;
    }

    setCheckoutStep('plan');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col" style={checkoutPageStyle}>
      {checkoutStep !== 'success' && checkoutStep !== 'failed' ? (
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
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[40px] px-[20px] md:grid md:grid-cols-[minmax(0,1fr)_clamp(320px,calc(320px+(100vw-48rem)*0.390625),460px)] md:items-start md:gap-[24px] md:px-[24px] lg:grid-cols-[minmax(0,1fr)_460px] lg:px-[32px] xl:gap-[40px]">
              <div
                ref={leftRef}
                className="flex w-full min-w-0 flex-col gap-[32px] pt-[56px] md:gap-[48px] md:pb-[120px]"
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
                className="w-full min-w-0 max-md:max-w-none md:max-w-[clamp(320px,calc(320px+(100vw-48rem)*0.390625),460px)] lg:max-w-[460px] md:sticky md:top-[24px] md:self-start md:pb-[120px]"
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
                  isPhoneVerified={isPhoneVerified}
                  onResetPhone={handleResetPhone}
                  totalMealsAnchorRef={totalMealsRef}
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
              persistSession({ checkoutStep: 'plan' });
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
      ) : checkoutStep === 'success' ? (
        <div ref={bodyRef} className={checkoutStepScrollClassName}>
          <PaymentSuccessScreen
            days={days}
            duration={duration}
            startDate={deliveryDetails.selectedDate}
            onClose={onClose}
            onTabChange={handleResultTabChange}
            onGoToMain={handleGoToMain}
          />
        </div>
      ) : (
        <div ref={bodyRef} className={checkoutStepScrollClassName}>
          <PaymentFailedScreen
            onClose={onClose}
            onTabChange={handleResultTabChange}
            onRepeatPayment={handleReturnToPayment}
            onChangePaymentMethod={handleReturnToPayment}
          />
        </div>
      )}
    </div>
  );
}
