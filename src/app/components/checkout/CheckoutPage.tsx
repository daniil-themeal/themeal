import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnimationEvent, CSSProperties } from 'react';

import { CheckoutHeader } from './CheckoutHeader';
import type { CheckoutHeaderStep } from './CheckoutHeader';
import { PlanSelectorBlock } from './PlanSelectorBlock';
import { IngredientsBlock } from './IngredientsBlock';
import { DaysBlock } from './DaysBlock';
import { DurationBlock } from './DurationBlock';
import { OrderSummary } from './OrderSummary';
import { BottomFloatTotalBlock } from './BottomFloatTotalBlock';
import { FullMenuModal } from './FullMenuModal';
import { CheckoutAuthModal } from './CheckoutAuthModal';
import type { CheckoutAuthDevMode } from './CheckoutAuthDevTabs';
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
import { testUaeAddresses } from '../../data/testAddresses';
import type { PhoneSession } from '../../phoneSession';
import { loadPhoneSession, mergePhoneSession } from '../../phoneSession';
import { COLOR_TOKENS } from '../common/colorTokens';
import { CHECKOUT_CARD_PADDING_CLAMP, CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_CLAMP, CHECKOUT_SELECTOR_CARD_PADDING_CLAMP, CHECKOUT_STEP_HEADER_PADDING_TOP_CLAMP } from './checkoutSpacing';
import { useEscapeLayer } from '../common/escapeStack';
import { useModalShell } from '../common/ModalShell';
import { SPACING_CONTENT_ATTR, SPACING_ROOT_ATTR } from '../../landing-stas/getSpacingMeasureRoot';
import { CHECKOUT_LAYER_Z_INDEX, Z_INDEX_TOKENS } from '../common/zIndexTokens';
import { formatUaePhoneInput, normalizeUaePhone } from './phoneValidation';
import { isValidTestSmsCode, SMS_CODE_ERROR, SMS_CODE_SUCCESS_HOLD_MS } from './smsCodeValidation';
import { usePlanStepScrollChaining } from './usePlanStepScrollChaining';
import { CHECKOUT_ROOT_CLASSNAME } from './checkoutModalShellTokens';
import './checkout.css';

type CheckoutUiStep = 'plan' | 'delivery' | 'payment';
type CheckoutStep = CheckoutUiStep | 'verification' | 'success' | 'failed';
type DeliveryStep = 'address' | 'details';

function resolveInitialCheckoutState(step: CheckoutStep): {
  flowStep: CheckoutUiStep;
  resultOverlay: PaymentResultTab | null;
  shouldOpenAuthModal: boolean;
} {
  if (step === 'success' || step === 'failed') {
    return { flowStep: 'payment', resultOverlay: step, shouldOpenAuthModal: false };
  }

  if (step === 'verification') {
    return { flowStep: 'plan', resultOverlay: null, shouldOpenAuthModal: true };
  }

  return { flowStep: step, resultOverlay: null, shouldOpenAuthModal: false };
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
  '--checkout-selector-card-padding': string;
  '--checkout-plan-column-pb': string;
};

const checkoutPlanGridStyle: CheckoutPlanGridCssVariables = {
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--checkout-selector-card-padding': CHECKOUT_SELECTOR_CARD_PADDING_CLAMP,
  '--checkout-plan-column-pb': CHECKOUT_PLAN_COLUMN_PADDING_BOTTOM_CLAMP,
};

const checkoutFormStepScrollClassName =
  'flex-1 overflow-x-hidden overflow-y-auto bg-white md:bg-[var(--checkout-page-bg)] scrollbar-hide';

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

function resolveDeliveryStep(selectedAddress: TestAddress | null): DeliveryStep {
  return selectedAddress ? 'details' : 'address';
}

function restoreAddressFromSession(session: PhoneSession | null): TestAddress | null {
  if (!session?.selectedAddressId) return null;

  return testUaeAddresses.find((address) => address.id === session.selectedAddressId) ?? null;
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

  const [checkoutStep, setCheckoutStep] = useState<CheckoutUiStep>(initialState.flowStep);
  const [resultOverlay, setResultOverlay] = useState<PaymentResultTab | null>(
    initialState.resultOverlay,
  );
  const [authModalOpen, setAuthModalOpen] = useState(initialState.shouldOpenAuthModal);
  const [deliveryStep, setDeliveryStep] = useState<DeliveryStep>(initialDeliveryStep);
  const [isPhoneVerified, setIsPhoneVerified] = useState(
    initialIsVerified || sessionIsVerified,
  );
  const [devSkipAuth, setDevSkipAuth] = useState(false);

  const isAuthComplete =
    isPhoneVerified || sessionIsVerified || devSkipAuth;
  const isSessionVerified = isPhoneVerified || sessionIsVerified;

  const [plan, setPlan] = useState<Plan>('base');
  const [lightMealOption, setLightMealOption] = useState<LightMealOption>('lunch-dinner');
  const [days, setDays] = useState<DayOption>('weekdays');
  const [duration, setDuration] = useState<Duration>('monthly');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [persons, setPersons] = useState(1);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [isMealDetailOpen, setIsMealDetailOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enterAnimationDone, setEnterAnimationDone] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<TestAddress | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetailsData>(() =>
    createInitialDeliveryDetails(),
  );
  const [phone, setPhone] = useState('');
  const [smsError, setSmsError] = useState<string | undefined>();
  const [isSmsVerifying, setIsSmsVerifying] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [extraMealDayKeys, setExtraMealDayKeys] = useState<string[]>([]);

  const smsVerifyTimerRef = useRef<number | null>(null);
  const smsSuccessPendingRef = useRef(false);
  const wasCheckoutOpenRef = useRef(false);

  const clearSmsVerifyTimer = useCallback(() => {
    if (smsVerifyTimerRef.current !== null) {
      window.clearTimeout(smsVerifyTimerRef.current);
      smsVerifyTimerRef.current = null;
    }
    smsSuccessPendingRef.current = false;
  }, []);

  const rightRef = useRef<HTMLDivElement>(null);
  const todayTotalRef = useRef<HTMLDivElement>(null);
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
      const isVerified = verifiedOverride ?? patch.isVerified ?? isSessionVerified;

      onSessionUpdate(
        mergePhoneSession(null, {
          phone: normalized || patch.phone || '',
          isVerified,
          checkoutStep: patch.checkoutStep ?? checkoutStep,
          deliveryStep: patch.deliveryStep ?? deliveryStep,
          selectedAddressId: patch.selectedAddressId ?? selectedAddress?.id,
        }),
      );
    },
    [checkoutStep, deliveryStep, isSessionVerified, onSessionUpdate, phone],
  );

  useEffect(() => {
    const justOpened = isOpen && !wasCheckoutOpenRef.current;
    wasCheckoutOpenRef.current = isOpen;

    if (justOpened) {
      setEnterAnimationDone(false);
      resetCloseState();
      const nextState = resolveInitialCheckoutState(initialCheckoutStep);
      const session = loadPhoneSession();
      const pendingSmsVerification =
        Boolean(session?.phone) &&
        !initialIsVerified &&
        !sessionIsVerified &&
        (session?.checkoutStep === 'verification' || session?.checkoutStep === 'delivery');
      const flowStep =
        pendingSmsVerification && nextState.flowStep === 'delivery'
          ? 'plan'
          : nextState.flowStep;

      setCheckoutStep(flowStep);
      setResultOverlay(nextState.resultOverlay);
      const restoredAddress = restoreAddressFromSession(session);
      setSelectedAddress(restoredAddress);
      setDeliveryStep(
        initialDeliveryStep === 'details' && restoredAddress
          ? 'details'
          : initialDeliveryStep === 'details'
            ? 'address'
            : initialDeliveryStep,
      );
      setIsPhoneVerified(initialIsVerified || sessionIsVerified);
      setDevSkipAuth(false);
      setMenuOpen(false);
      setSummaryVisible(flowStep === 'plan');

      setAuthModalOpen(
        !initialIsVerified &&
          !sessionIsVerified &&
          (nextState.shouldOpenAuthModal || pendingSmsVerification),
      );

      const digits = phoneDigitsFromInitial(initialPhone);
      if (digits) {
        setPhone(formatUaePhoneInput(digits));
      } else if (nextState.flowStep === 'plan' && !initialIsVerified && !sessionIsVerified) {
        setPhone('');
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }

    document.body.style.overflow = '';
    const resetState = resolveInitialCheckoutState(initialCheckoutStep);
    setCheckoutStep(resetState.flowStep);
    setResultOverlay(resetState.resultOverlay);
    setDeliveryStep(initialDeliveryStep);
    setMenuOpen(false);
    setSummaryVisible(false);
    setAuthModalOpen(false);
    setIsSmsVerifying(false);
    clearSmsVerifyTimer();

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialCheckoutStep, initialDeliveryStep, initialPhone, initialIsVerified, sessionIsVerified, resetCloseState, clearSmsVerifyTimer]);

  useEffect(() => {
    if (!isOpen || !isAuthComplete) return;

    const nextState = resolveInitialCheckoutState(initialCheckoutStep);
    if (nextState.flowStep !== 'delivery' && nextState.flowStep !== 'payment') return;

    setCheckoutStep(nextState.flowStep);
    setDeliveryStep(initialDeliveryStep);
    setAuthModalOpen(false);
    setMenuOpen(false);
  }, [initialCheckoutStep, initialDeliveryStep, isAuthComplete, isOpen]);

  useEffect(() => {
    setExtraMealDayKeys([]);
  }, [days, duration]);

  useEffect(() => {
    if (!isOpen || checkoutStep !== 'plan') return;

    const anchor = todayTotalRef.current;
    const body = bodyRef.current;

    if (!anchor || !body) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setSummaryVisible((prev) => (prev === visible ? prev : visible));
      },
      { root: body, threshold: 0.1 },
    );

    observer.observe(anchor);

    return () => observer.disconnect();
  }, [isOpen, checkoutStep]);

  usePlanStepScrollChaining({
    enabled: isOpen && checkoutStep === 'plan',
    bodyRef,
    rightRef,
  });

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
  };

  const handleResetPhone = useCallback(() => {
    onResetPhone?.();
    setIsPhoneVerified(false);
    setDevSkipAuth(false);
    setPhone('');
    setAuthModalOpen(false);
    setCheckoutStep('plan');
    setDeliveryStep('address');
    setMenuOpen(false);
    setSummaryVisible(false);
  }, [onResetPhone]);

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
    persistSession({ checkoutStep: 'verification' });
  }, [persistSession]);

  const closeAuthModal = useCallback(() => {
    if (smsSuccessPendingRef.current) {
      setAuthModalOpen(false);
      return;
    }

    clearSmsVerifyTimer();
    setIsSmsVerifying(false);
    setAuthModalOpen(false);
    setSmsError(undefined);

    if (!isAuthComplete) {
      setCheckoutStep('plan');
      setSummaryVisible(true);
      persistSession({ checkoutStep: 'plan' });
      return;
    }

    persistSession({ checkoutStep });
  }, [checkoutStep, clearSmsVerifyTimer, isAuthComplete, persistSession]);

  const handleDevAuthModeChange = useCallback((mode: CheckoutAuthDevMode) => {
    const skip = mode === 'skip';
    setDevSkipAuth(skip);

    if (skip) {
      clearSmsVerifyTimer();
      setIsSmsVerifying(false);
      setAuthModalOpen(false);
      setSmsError(undefined);

      if (!phone) {
        setPhone(formatUaePhoneInput('501234567'));
      }

      return;
    }

    if (!isPhoneVerified && !sessionIsVerified) {
      setAuthModalOpen(false);
    }
  }, [clearSmsVerifyTimer, isPhoneVerified, phone, sessionIsVerified]);

  const handleAuthModalSkip = useCallback(() => {
    setDevSkipAuth(true);
    clearSmsVerifyTimer();
    setIsSmsVerifying(false);
    setAuthModalOpen(false);
    setSmsError(undefined);

    const nextPhone = phone || formatUaePhoneInput('501234567');
    if (!phone) {
      setPhone(nextPhone);
    }

    setCheckoutStep('plan');
    setSummaryVisible(true);
    persistSession({
      phone: normalizeUaePhone(nextPhone) ?? nextPhone,
      checkoutStep: 'plan',
      isVerified: false,
    });
    scrollBodyToTop();
  }, [clearSmsVerifyTimer, persistSession, phone, scrollBodyToTop]);

  const handleScrollToSummary = () => {
    setMenuOpen(false);

    const body = bodyRef.current;
    const anchor = todayTotalRef.current ?? rightRef.current;

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
      const nextDeliveryStep = resolveDeliveryStep(selectedAddress);
      setCheckoutStep('delivery');
      setDeliveryStep(nextDeliveryStep);
      persistSession({ checkoutStep: 'delivery', deliveryStep: nextDeliveryStep });
      scrollBodyToTop();
      return;
    }

    openAuthModal();
  };

  const handlePhoneSubmitFromVerification = useCallback(
    (normalizedPhone: string) => {
      const digits = normalizedPhone.replace(/\D/g, '').slice(-9);
      setPhone(formatUaePhoneInput(digits));
      persistSession({
        phone: normalizedPhone,
        checkoutStep: 'verification',
        isVerified: false,
      });
    },
    [persistSession],
  );

  const handleSmsContinue = useCallback(() => {
    smsSuccessPendingRef.current = false;
    setAuthModalOpen(false);
    setIsPhoneVerified(true);
    setMenuOpen(false);

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
  }, [persistSession, phone, scrollBodyToTop]);

  const handleSmsCodeComplete = useCallback((code: string) => {
    if (isSmsVerifying) return;

    if (!isValidTestSmsCode(code)) {
      setSmsError(SMS_CODE_ERROR);
      return;
    }

    setSmsError(undefined);
    setIsSmsVerifying(true);
    clearSmsVerifyTimer();
    smsSuccessPendingRef.current = true;

    smsVerifyTimerRef.current = window.setTimeout(() => {
      smsVerifyTimerRef.current = null;
      setIsSmsVerifying(false);
      handleSmsContinue();
    }, SMS_CODE_SUCCESS_HOLD_MS);
  }, [clearSmsVerifyTimer, handleSmsContinue, isSmsVerifying]);

  const handleSmsCodeChange = (_code: string) => {
    if (smsError) {
      setSmsError(undefined);
    }
  };

  const handleAddressContinue = () => {
    if (!selectedAddress) return;

    setDeliveryStep('details');
    persistSession({
      checkoutStep: 'delivery',
      deliveryStep: 'details',
      selectedAddressId: selectedAddress.id,
    });
    scrollBodyToTop();
  };

  const handleSelectedAddressChange = (address: TestAddress | null) => {
    setSelectedAddress(address);
    persistSession({ selectedAddressId: address?.id });
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

    if ('selectedDate' in patch) {
      setExtraMealDayKeys([]);
    }
  };

  const handleExtraMealDayKeysChange = (keys: string[]) => {
    setExtraMealDayKeys(keys);
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

    if ((step === 'delivery' || step === 'payment') && !isAuthComplete) {
      openAuthModal();
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
    if (authModalOpen) {
      closeAuthModal();
      return;
    }

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

      setCheckoutStep('plan');
      setMenuOpen(false);
      setSummaryVisible(true);
      setDeliveryStep('address');
      openAuthModal();
      scrollBodyToTop();
      return;
    }

    setCheckoutStep('plan');
    scrollBodyToTop();
  };

  const handleEscapeRef = useRef<() => void>(() => {});
  handleEscapeRef.current = () => {
    if (authModalOpen) {
      return;
    }

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

  const handleCheckoutAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return;

    if (!isClosing) {
      setEnterAnimationDone(true);
    }

    handlePanelAnimationEnd(event);
  };

  useEscapeLayer(isOpen, Z_INDEX_TOKENS.checkout, () => {
    handleEscapeRef.current();
  });

  if (!isOpen) return null;

  return (
    <div
      className={[
        CHECKOUT_ROOT_CLASSNAME,
        'fixed inset-0 z-[200] flex flex-col',
        isClosing
          ? 'pointer-events-none modal-exit-responsive'
          : enterAnimationDone
            ? ''
            : 'modal-enter-responsive',
      ].join(' ')}
      style={checkoutPageStyle}
      {...{ [SPACING_ROOT_ATTR]: '' }}
      onAnimationEnd={handleCheckoutAnimationEnd}
    >
      <CheckoutHeader
        step={headerStep}
        onBack={handleBack}
        onClose={requestClose}
        onStepSelect={handleStepSelect}
        onLogoClick={() => scrollBodyToTop('smooth')}
        onResultSelect={handleResultTabChange}
        authDevMode={devSkipAuth ? 'skip' : 'required'}
        onAuthDevModeChange={handleDevAuthModeChange}
      />

      {!resultOverlay && checkoutStep === 'plan' ? (
        <>
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto overflow-anchor-none bg-[var(--checkout-page-bg)] scrollbar-hide"
            {...{ [SPACING_CONTENT_ATTR]: '' }}
          >
            <div
              className="mx-auto flex w-full max-w-[1200px] flex-col gap-[32px] px-[20px] pt-0 md:grid md:grid-cols-[minmax(0,1fr)_clamp(320px,calc(320px+(100vw-48rem)*0.390625),460px)] md:items-start md:gap-[24px] md:px-[24px] lg:grid-cols-[minmax(0,1fr)_460px] lg:px-[32px] xl:gap-[40px]"
              style={checkoutPlanGridStyle}
            >
              <div
                style={checkoutLeftColumnStyle}
                className="flex w-full min-w-0 flex-col gap-[32px] pt-[length:var(--checkout-step-header-pt)] md:gap-[48px] md:pt-[56px] md:pb-[length:var(--checkout-plan-column-pb)]"
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
                style={checkoutLeftColumnStyle}
                className="w-full min-w-0 max-md:max-w-none max-md:pt-0 md:max-h-[calc(100svh-56px)] md:max-w-[clamp(320px,calc(320px+(100vw-48rem)*0.390625),460px)] md:min-h-0 md:overflow-x-hidden md:overflow-y-hidden lg:max-w-[460px] md:sticky md:top-0 md:self-start md:pt-[56px] md:pb-[length:var(--checkout-plan-column-pb)]"
              >
                <OrderSummary
                  plan={plan}
                  days={days}
                  duration={duration}
                  ingredients={ingredients}
                  persons={persons}
                  lightMealOption={lightMealOption}
                  extraMealDayKeys={extraMealDayKeys}
                  onPersonsChange={setPersons}
                  onOpenMenu={() => setMenuOpen(true)}
                  onOrder={handleContinueFromPlan}
                  phone={phone}
                  isPhoneVerified={isAuthComplete}
                  onResetPhone={handleResetPhone}
                  todayTotalAnchorRef={todayTotalRef}
                  appliedPromoCode={appliedPromoCode}
                  onAppliedPromoCodeChange={setAppliedPromoCode}
                  onMealDetailOpenChange={setIsMealDetailOpen}
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
            persons={persons}
            lightMealOption={lightMealOption}
            extraMealDayKeys={extraMealDayKeys}
            onScrollToSummary={handleScrollToSummary}
            hidden={summaryVisible || isMealDetailOpen}
          />
        </>
      ) : !resultOverlay && checkoutStep === 'delivery' && deliveryStep === 'address' ? (
        <div ref={bodyRef} className={checkoutFormStepScrollClassName} {...{ [SPACING_CONTENT_ATTR]: '' }}>
          <DeliveryAddressScreen
            selectedAddress={selectedAddress}
            onSelectedAddressChange={handleSelectedAddressChange}
            onContinue={handleAddressContinue}
          />
        </div>
      ) : !resultOverlay && checkoutStep === 'delivery' && deliveryStep === 'details' ? (
        <div ref={bodyRef} className={checkoutFormStepScrollClassName} {...{ [SPACING_CONTENT_ATTR]: '' }}>
          <DeliveryDetailsScreen
            selectedAddress={selectedAddress}
            deliveryDetails={deliveryDetails}
            onDeliveryDetailsChange={handleDeliveryDetailsChange}
            onChangeAddress={handleChangeAddress}
            days={days}
            duration={duration}
            plan={plan}
            persons={persons}
            extraMealDayKeys={extraMealDayKeys}
            onExtraMealDayKeysChange={handleExtraMealDayKeysChange}
            onContinue={handleDeliveryDetailsContinue}
          />
        </div>
      ) : !resultOverlay && checkoutStep === 'payment' ? (
        <div ref={bodyRef} className={checkoutFormStepScrollClassName} {...{ [SPACING_CONTENT_ATTR]: '' }}>
          <PaymentScreen
            plan={plan}
            days={days}
            duration={duration}
            ingredients={ingredients}
            lightMealOption={lightMealOption}
            persons={persons}
            extraMealDayKeys={extraMealDayKeys}
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

      <CheckoutAuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        phone={phone}
        onPhoneChange={handlePhoneChange}
        onPhoneContinue={handlePhoneSubmitFromVerification}
        error={smsError}
        isVerifying={isSmsVerifying}
        onCodeChange={handleSmsCodeChange}
        onCodeComplete={handleSmsCodeComplete}
        onSkip={handleAuthModalSkip}
      />

      {resultOverlay ? (
        <div
          className="absolute inset-0 flex flex-col"
          style={{ zIndex: CHECKOUT_LAYER_Z_INDEX.resultOverlay }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40 modal-overlay-enter"
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
                extraMealDayKeys={extraMealDayKeys}
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
