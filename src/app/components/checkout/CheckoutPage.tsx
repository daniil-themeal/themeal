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
import { CHECKOUT_CARD_PADDING_CLAMP, CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP } from './checkoutSpacing';
import { useEscapeLayer } from '../common/escapeStack';
import { useModalShell } from '../common/ModalShell';
import { SPACING_CONTENT_ATTR, SPACING_ROOT_ATTR } from '../../landing-stas/getSpacingMeasureRoot';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { formatUaePhoneInput, normalizeUaePhone, validateUaePhone } from './phoneValidation';
import { isValidTestSmsCode, SMS_CODE_ERROR } from './smsCodeValidation';

type CheckoutFlowStep = 'plan' | 'verification' | 'delivery' | 'payment';
type CheckoutStep = CheckoutFlowStep | 'success' | 'failed';
type DeliveryStep = 'address' | 'details';

function resolveInitialCheckoutState(step: CheckoutStep): {
  flowStep: CheckoutFlowStep;
  resultOverlay: PaymentResultTab | null;
} {
  if (step === 'success' || step === 'failed') {
    return { flowStep: 'payment', resultOverlay: step };
  }

  return { flowStep: step, resultOverlay: null };
}

type CheckoutPageProps = {
  isOpen: boolean;
  onClose: () => void;
  initialCheckoutStep?: CheckoutStep;
  initialDeliveryStep?: DeliveryStep;
  initialPhone?: string;
  initialIsVerified?: boolean;
  sessionIsVerified?: boolean;
  onSessionUpdate?: (session: PhoneSession) => void;
  onResetPhone?: () => void;
};

type CheckoutPageCssVariables = CSSProperties & {
  '--checkout-page-bg': string;
};

const checkoutPageStyle: CheckoutPageCssVariables = {
  '--checkout-page-bg': COLOR_TOKENS.base.cream,
};

type CheckoutLeftColumnCssVariables = CSSProperties & {
  '--checkout-step-header-pt': string;
};

const checkoutLeftColumnStyle: CheckoutLeftColumnCssVariables = {
  '--checkout-step-header-pt': CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP,
};

type CheckoutPlanGridCssVariables = CSSProperties & {
  '--checkout-card-padding': string;
};

const checkoutPlanGridStyle: CheckoutPlanGridCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
};

const checkoutStepScrollClassName =
  'flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide';

const checkoutFormStepScrollClassName =
  'flex-1 overflow-y-auto bg-white md:bg-[var(--checkout-page-bg)] scrollbar-hide';

const BOTTOM_FLOAT_HEIGHT = 72;
const SUMMARY_ANCHOR_THRESHOLD = 0.1;

function getScrollTopToRevealAnchor(
  body: HTMLElement,
  anchor: HTMLElement,
  threshold = SUMMARY_ANCHOR_THRESHOLD,
  bottomInset = 0,
) {
  const bodyRect = body.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  const minVisible = anchorRect.height * threshold;
  const effectiveBodyBottom = bodyRect.bottom - bottomInset;

  const visibleHeight = Math.max(
    0,
    Math.min(anchorRect.bottom, effectiveBodyBottom) - Math.max(anchorRect.top, bodyRect.top),
  );

  if (visibleHeight >= minVisible) return body.scrollTop;

  const intersectionDelta = anchorRect.bottom - bodyRect.top - minVisible;
  const bottomInsetDelta = anchorRect.bottom - effectiveBodyBottom;

  return body.scrollTop + Math.max(intersectionDelta, bottomInsetDelta, 0);
}

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
  sessionIsVerified = false,
  onSessionUpdate,
  onResetPhone,
}: CheckoutPageProps) {
  const {
    isClosing,
    requestClose,
    resetCloseState,
    handlePanelAnimationEnd,
  } = useModalShell(onClose);

  const initialState = resolveInitialCheckoutState(initialCheckoutStep);

  const [checkoutStep, setCheckoutStep] = useState<CheckoutFlowStep>(initialState.flowStep);
  const [resultOverlay, setResultOverlay] = useState<PaymentResultTab | null>(
    initialState.resultOverlay,
  );
  const [deliveryStep, setDeliveryStep] = useState<DeliveryStep>(initialDeliveryStep);
  const [isPhoneVerified, setIsPhoneVerified] = useState(
    initialIsVerified || sessionIsVerified,
  );

  const isAuthComplete = isPhoneVerified || sessionIsVerified;

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
  const [smsError, setSmsError] = useState<string | undefined>();
  const [appliedPromoCode, setAppliedPromoCode] = useState('');

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const totalMealsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const resultBodyRef = useRef<HTMLDivElement>(null);

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
      const isVerified = verifiedOverride ?? patch.isVerified ?? isAuthComplete;

      onSessionUpdate(
        mergePhoneSession(null, {
          phone: normalized || patch.phone || '',
          isVerified,
          checkoutStep: patch.checkoutStep ?? checkoutStep,
          deliveryStep: patch.deliveryStep ?? deliveryStep,
        }),
      );
    },
    [checkoutStep, deliveryStep, isAuthComplete, onSessionUpdate, phone],
  );

  useEffect(() => {
    if (isOpen) {
      resetCloseState();
      document.body.style.overflow = 'hidden';
      const nextState = resolveInitialCheckoutState(initialCheckoutStep);
      setCheckoutStep(nextState.flowStep);
      setResultOverlay(nextState.resultOverlay);
      setDeliveryStep(initialDeliveryStep);
      setIsPhoneVerified(initialIsVerified || sessionIsVerified);
      setMenuOpen(false);
      setSummaryVisible(nextState.flowStep !== 'plan');
      setPhoneError(undefined);

      const digits = phoneDigitsFromInitial(initialPhone);
      if (digits) {
        setPhone(formatUaePhoneInput(digits));
      } else if (nextState.flowStep === 'plan' && !initialIsVerified && !sessionIsVerified) {
        setPhone('');
      }

      return;
    }

    document.body.style.overflow = '';
    const resetState = resolveInitialCheckoutState(initialCheckoutStep);
    setCheckoutStep(resetState.flowStep);
    setResultOverlay(resetState.resultOverlay);
    setDeliveryStep(initialDeliveryStep);
    setMenuOpen(false);
    setSummaryVisible(false);

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialCheckoutStep, initialDeliveryStep, initialPhone, initialIsVerified, sessionIsVerified, resetCloseState]);

  useEffect(() => {
    if (!isOpen || !isAuthComplete || checkoutStep !== 'verification') return;

    setCheckoutStep('delivery');
    setDeliveryStep('address');
    persistSession({ checkoutStep: 'delivery', deliveryStep: 'address' });
  }, [isOpen, isAuthComplete, checkoutStep, persistSession]);

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

  const scrollBodyToTop = (behavior: ScrollBehavior = 'auto') => {
    bodyRef.current?.scrollTo({ top: 0, behavior });
  };

  const scrollResultToTop = (behavior: ScrollBehavior = 'auto') => {
    resultBodyRef.current?.scrollTo({ top: 0, behavior });
  };

  const handleDismissResultOverlay = () => {
    setResultOverlay(null);
    scrollBodyToTop();
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

    const body = bodyRef.current;
    const anchor = totalMealsRef.current ?? rightRef.current;

    if (!body || !anchor) return;

    const targetScrollTop = getScrollTopToRevealAnchor(
      body,
      anchor,
      SUMMARY_ANCHOR_THRESHOLD,
      BOTTOM_FLOAT_HEIGHT,
    );

    body.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
  };

  const handleContinueFromPlan = () => {
    setMenuOpen(false);
    setSummaryVisible(true);

    if (isAuthComplete) {
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

  const handleSmsCodeComplete = (code: string) => {
    if (!isValidTestSmsCode(code)) {
      setSmsError(SMS_CODE_ERROR);
      return;
    }

    setSmsError(undefined);
    handleSmsContinue();
  };

  const handleSmsCodeChange = (_code: string) => {
    if (smsError) {
      setSmsError(undefined);
    }
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
    setResultOverlay('success');
    scrollResultToTop();
  };

  const handleGoToMain = () => {
    requestClose();
  };

  const handleResultTabChange = (tab: PaymentResultTab) => {
    setResultOverlay(tab);
    scrollResultToTop();
  };

  const handleReturnToPayment = () => {
    setResultOverlay(null);
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
      scrollBodyToTop();
      return;
    }

    if (checkoutStep === 'delivery') {
      if (deliveryStep === 'details') {
        setDeliveryStep('address');
        persistSession({ deliveryStep: 'address' });
        scrollBodyToTop();
        return;
      }

      if (isAuthComplete) {
        setCheckoutStep('plan');
        setMenuOpen(false);
        setSummaryVisible(true);
        setDeliveryStep('address');
        persistSession({ checkoutStep: 'plan', deliveryStep: 'address' });
        scrollBodyToTop();
        return;
      }

      setCheckoutStep('verification');
      persistSession({ checkoutStep: 'verification' });
      scrollBodyToTop();
      return;
    }

    if (checkoutStep === 'verification') {
      setCheckoutStep('plan');
      setMenuOpen(false);
      setSummaryVisible(isAuthComplete);
      persistSession({
        checkoutStep: 'plan',
        ...(isAuthComplete ? { deliveryStep: 'address' } : {}),
      });
      scrollBodyToTop();
      return;
    }

    setCheckoutStep('plan');
    scrollBodyToTop();
  };

  const handleEscapeRef = useRef<() => void>(() => {});
  handleEscapeRef.current = () => {
    if (resultOverlay) {
      handleDismissResultOverlay();
      return;
    }

    if (checkoutStep !== 'plan') {
      handleBack();
      return;
    }

    requestClose();
  };

  useEscapeLayer(isOpen, Z_INDEX_TOKENS.checkout, () => {
    handleEscapeRef.current();
  });

  if (!isOpen) return null;

  return (
    <div
      className={[
        'fixed inset-0 z-[200] flex flex-col',
        isClosing ? 'pointer-events-none modal-exit-responsive' : 'modal-enter-responsive',
      ].join(' ')}
      style={checkoutPageStyle}
      {...{ [SPACING_ROOT_ATTR]: '' }}
      onAnimationEnd={handlePanelAnimationEnd}
    >
      <CheckoutHeader
        step={headerStep}
        onBack={handleBack}
        onClose={requestClose}
        onStepSelect={handleStepSelect}
        onLogoClick={() => scrollBodyToTop('smooth')}
        onResultSelect={handleResultTabChange}
      />

      {checkoutStep === 'plan' ? (
        <>
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide"
            {...{ [SPACING_CONTENT_ATTR]: '' }}
          >
            <div
              className="mx-auto flex w-full max-w-[1200px] flex-col gap-[40px] px-[20px] md:grid md:grid-cols-[minmax(0,1fr)_clamp(320px,calc(320px+(100vw-48rem)*0.390625),460px)] md:items-start md:gap-[24px] md:px-[24px] lg:grid-cols-[minmax(0,1fr)_460px] lg:px-[32px] xl:gap-[40px]"
              style={checkoutPlanGridStyle}
            >
              <div
                ref={leftRef}
                style={checkoutLeftColumnStyle}
                className="flex w-full min-w-0 flex-col gap-[32px] pt-[length:var(--checkout-step-header-pt)] md:gap-[48px] md:pt-[56px] md:pb-[120px]"
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
                  persons={persons}
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
                  isPhoneVerified={isAuthComplete}
                  onResetPhone={handleResetPhone}
                  totalMealsAnchorRef={totalMealsRef}
                  appliedPromoCode={appliedPromoCode}
                  onAppliedPromoCodeChange={setAppliedPromoCode}
                />
              </div>
            </div>
          </div>

          <FullMenuModal
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            plan={plan}
            lightMealOption={lightMealOption}
            onPlanChange={setPlan}
            onLightMealOptionChange={setLightMealOption}
          />

          <BottomFloatTotalBlock
            plan={plan}
            days={days}
            duration={duration}
            persons={persons}
            lightMealOption={lightMealOption}
            onScrollToSummary={handleScrollToSummary}
            hidden={summaryVisible}
          />
        </>
      ) : checkoutStep === 'verification' ? (
        <div ref={bodyRef} className={checkoutStepScrollClassName} {...{ [SPACING_CONTENT_ATTR]: '' }}>
          <SmsCodeScreen
            phone={phone}
            onPhoneChange={handlePhoneChange}
            error={smsError}
            onChangeNumber={() => {
              setCheckoutStep('plan');
              setMenuOpen(false);
              setSummaryVisible(false);
              setSmsError(undefined);
              persistSession({ checkoutStep: 'plan' });
            }}
            onCodeChange={handleSmsCodeChange}
            onCodeComplete={handleSmsCodeComplete}
          />
        </div>
      ) : checkoutStep === 'delivery' && deliveryStep === 'address' ? (
        <div ref={bodyRef} className={checkoutFormStepScrollClassName} {...{ [SPACING_CONTENT_ATTR]: '' }}>
          <DeliveryAddressScreen
            selectedAddress={selectedAddress}
            onSelectedAddressChange={setSelectedAddress}
            onContinue={handleAddressContinue}
          />
        </div>
      ) : checkoutStep === 'delivery' && deliveryStep === 'details' ? (
        <div ref={bodyRef} className={checkoutFormStepScrollClassName} {...{ [SPACING_CONTENT_ATTR]: '' }}>
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
        <div ref={bodyRef} className={checkoutFormStepScrollClassName} {...{ [SPACING_CONTENT_ATTR]: '' }}>
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
            appliedPromoCode={appliedPromoCode}
            onAppliedPromoCodeChange={setAppliedPromoCode}
          />
        </div>
      ) : null}

      {resultOverlay ? (
        <div className="absolute inset-0 z-10 flex flex-col">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={handleDismissResultOverlay}
            aria-label="Close payment result"
          />

          <div
            ref={resultBodyRef}
            className="relative flex flex-1 flex-col overflow-y-auto bg-[var(--checkout-page-bg)] scrollbar-hide modal-enter-responsive"
            {...{ [SPACING_CONTENT_ATTR]: '' }}
          >
            {resultOverlay === 'success' ? (
              <PaymentSuccessScreen
                days={days}
                duration={duration}
                startDate={deliveryDetails.selectedDate}
                onClose={handleDismissResultOverlay}
                onTabChange={handleResultTabChange}
                onGoToMain={handleGoToMain}
              />
            ) : (
              <PaymentFailedScreen
                onClose={handleDismissResultOverlay}
                onTabChange={handleResultTabChange}
                onRepeatPayment={handleReturnToPayment}
                onChangePaymentMethod={handleReturnToPayment}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
