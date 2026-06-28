import { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import MainLandingPage from './main-landing/MainLandingPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import type { DayOption, Duration, Plan } from './data/checkoutPricing';
import DesignSystemDemo from './components/DesignSystemDemo';
import PrivacyPolicyPage from './legal/PrivacyPolicyPage';
import TermsAndConditionsPage from './legal/TermsAndConditionsPage';
import NotFoundPage from './NotFoundPage';
import { LEGAL_ROUTES } from './legal/routes';
import { isDevToolsEnabled } from './devToolsEnabled';
import {
  AccountDeliveriesPage,
  AccountHomePage,
  AccountLayout,
  AccountProfilePage,
} from './account';
import {
  loadPhoneSession,
  mergePhoneSession,
  type PhoneSession,
} from './phoneSession';
import { PhoneAuthProvider, usePhoneAuth } from './phoneAuth/PhoneAuthProvider';

const QuizModal = lazy(() => import('./components/quiz/QuizModal'));

type InitialCheckoutStep =
  | 'plan'
  | 'verification'
  | 'delivery'
  | 'payment'
  | 'success'
  | 'failed';
type InitialDeliveryStep = 'address' | 'details';

type CheckoutInitialSelection = {
  plan?: Plan;
  days?: DayOption;
  duration?: Duration;
  persons?: number;
};

function resumeCheckoutStep(session: PhoneSession): InitialCheckoutStep {
  if (!session.isVerified) {
    return session.checkoutStep === 'verification' ? 'verification' : 'plan';
  }

  const step = session.checkoutStep;
  if (!step || step === 'verification' || step === 'plan') {
    return 'delivery';
  }
  return step;
}

type HomePageProps = {
  onDesignSystemClick?: () => void;
};

function HomePage({ onDesignSystemClick }: HomePageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const onTrialRoute = location.pathname === '/trial';
  const {
    phoneSession,
    isPhoneVerified,
    verifiedPhone,
    pendingPhone,
    handleSessionUpdate,
    resetPhoneSession,
    handleLeadPhoneSubmit,
    handleResumeVerification,
    openSignIn,
    setAuthModalSuppressed,
  } = usePhoneAuth();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trialActive, setTrialActive] = useState(onTrialRoute);
  const [cameFromTrial, setCameFromTrial] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [initialCheckoutStep, setInitialCheckoutStep] =
    useState<InitialCheckoutStep>('plan');
  const [initialDeliveryStep, setInitialDeliveryStep] =
    useState<InitialDeliveryStep>('address');
  const [checkoutInitialPhone, setCheckoutInitialPhone] = useState<string | undefined>();
  const [initialIsVerified, setInitialIsVerified] = useState(false);
  const [checkoutInitialSelection, setCheckoutInitialSelection] =
    useState<CheckoutInitialSelection | undefined>();

  const handleCheckoutSessionUpdate = useCallback(
    (session: PhoneSession) => {
      handleSessionUpdate(session);

      if (session.phone) {
        setCheckoutInitialPhone(session.phone);
      }

      if (session.isVerified) {
        setInitialIsVerified(true);
      }

      const step = session.checkoutStep;
      if (
        step === 'plan' ||
        step === 'verification' ||
        step === 'delivery' ||
        step === 'payment' ||
        step === 'success' ||
        step === 'failed'
      ) {
        setInitialCheckoutStep(step);
      }

      if (session.deliveryStep) {
        setInitialDeliveryStep(session.deliveryStep);
      }
    },
    [handleSessionUpdate],
  );

  const openCheckoutAt = useCallback(
    (
      step: InitialCheckoutStep,
      deliveryStep: InitialDeliveryStep,
      phone?: string,
      isVerified = false,
      selection?: CheckoutInitialSelection,
    ) => {
      setCheckoutInitialPhone(phone);
      setInitialCheckoutStep(step);
      setInitialDeliveryStep(deliveryStep);
      setInitialIsVerified(isVerified);
      setCheckoutInitialSelection(selection);
      setCheckoutOpen(true);
    },
    [],
  );

  const openCheckoutResume = useCallback(() => {
    const session = phoneSession ?? loadPhoneSession();
    if (session?.isVerified) {
      openCheckoutAt(
        resumeCheckoutStep(session),
        session.deliveryStep ?? 'address',
        session.phone,
        true,
      );
      return;
    }

    openCheckoutAt('plan', 'address');
  }, [openCheckoutAt, phoneSession]);

  const openCheckout = useCallback(() => {
    const session = phoneSession ?? loadPhoneSession();
    if (session?.isVerified) {
      openCheckoutResume();
      return;
    }

    openCheckoutAt('plan', 'address');
  }, [openCheckoutAt, openCheckoutResume, phoneSession]);

  const openQuiz = useCallback(() => {
    setQuizOpen(true);
  }, []);

  const closeQuiz = useCallback(() => {
    setQuizOpen(false);
  }, []);

  const handleQuizSeePlan = useCallback(
    (selection: CheckoutInitialSelection, phone: string) => {
      setQuizOpen(false);

      const isVerified = Boolean(phone);
      if (isVerified) {
        const next = mergePhoneSession(phoneSession, {
          phone,
          isVerified: true,
          checkoutStep: 'plan',
          deliveryStep: 'address',
        });
        handleSessionUpdate(next);
      }

      openCheckoutAt('plan', 'address', phone || undefined, isVerified, {
        plan: selection.plan,
        days: selection.days,
        duration: selection.duration,
        persons: selection.persons,
      });
    },
    [handleSessionUpdate, openCheckoutAt, phoneSession],
  );

  const resetPhoneAndCheckout = useCallback(
    (options?: { closeCheckout?: boolean }) => {
      resetPhoneSession();
      if (options?.closeCheckout ?? true) {
        setCheckoutOpen(false);
      }
      setInitialIsVerified(false);
      setCheckoutInitialPhone(undefined);
      setCheckoutInitialSelection(undefined);
      setInitialCheckoutStep('plan');
      setInitialDeliveryStep('address');
    },
    [resetPhoneSession],
  );

  useEffect(() => {
    setAuthModalSuppressed(checkoutOpen || quizOpen);
  }, [checkoutOpen, quizOpen, setAuthModalSuppressed]);

  useEffect(() => {
    if (!onTrialRoute) return;
    setTrialActive(true);
    setCheckoutOpen((open) => {
      if (open) return open;
      openCheckoutAt('plan', 'address');
      return open;
    });
  }, [onTrialRoute, openCheckoutAt]);

  const closeCheckout = useCallback(() => {
    const session = phoneSession ?? loadPhoneSession();
    if (session?.isVerified) {
      setInitialIsVerified(true);
      if (session.phone) {
        setCheckoutInitialPhone(session.phone);
      }
    }

    setCheckoutOpen(false);
    setCameFromTrial(false);
    if (onTrialRoute) {
      setTrialActive(false);
      navigate('/', { replace: true });
    }
  }, [navigate, onTrialRoute, phoneSession]);

  const handleExitTrial = useCallback(() => {
    setTrialActive(false);
    setCameFromTrial(true);
    if (onTrialRoute) {
      navigate('/', { replace: true });
    }
  }, [navigate, onTrialRoute]);

  const openTrial = useCallback(() => {
    setTrialActive(true);
    setCameFromTrial(false);
    if (!onTrialRoute) {
      navigate('/trial');
    }
    openCheckoutAt('plan', 'address');
  }, [navigate, onTrialRoute, openCheckoutAt]);

  const handleReturnToTrial = useCallback(() => {
    setCameFromTrial(false);
    setTrialActive(true);
    if (!onTrialRoute) {
      navigate('/trial');
    }
  }, [navigate, onTrialRoute]);

  return (
    <>
      <MainLandingPage
        onOrderClick={openCheckout}
        onQuizClick={openQuiz}
        onTrialClick={openTrial}
        onPhoneSubmit={handleLeadPhoneSubmit}
        onContinueClick={openCheckoutResume}
        onResumeVerification={handleResumeVerification}
        onResetPhone={() => resetPhoneAndCheckout()}
        onSignInClick={openSignIn}
        onDesignSystemClick={onDesignSystemClick}
        checkoutOpen={checkoutOpen}
        quizOpen={quizOpen}
        isPhoneVerified={isPhoneVerified}
        verifiedPhone={verifiedPhone}
        pendingPhone={pendingPhone}
      />

      {quizOpen ? (
        <Suspense fallback={null}>
          <QuizModal
            open={quizOpen}
            onClose={closeQuiz}
            onSeePlan={handleQuizSeePlan}
          />
        </Suspense>
      ) : null}

      <CheckoutPage
        isOpen={checkoutOpen}
        onClose={closeCheckout}
        initialCheckoutStep={initialCheckoutStep}
        initialDeliveryStep={initialDeliveryStep}
        initialPhone={checkoutInitialPhone}
        initialIsVerified={initialIsVerified}
        initialSelection={checkoutInitialSelection}
        sessionIsVerified={phoneSession?.isVerified ?? false}
        onSessionUpdate={handleCheckoutSessionUpdate}
        onResetPhone={() => resetPhoneAndCheckout({ closeCheckout: false })}
        isTrial={trialActive}
        onExitTrial={handleExitTrial}
        onReturnToTrial={cameFromTrial && !trialActive ? handleReturnToTrial : undefined}
      />
    </>
  );
}

export default function App() {
  const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const openDesignSystem = () => setDesignSystemOpen(true);
  const closeDesignSystem = () => setDesignSystemOpen(false);
  const onDesignSystemClick = isDevToolsEnabled ? openDesignSystem : undefined;

  if (designSystemOpen) {
    return <DesignSystemDemo onClose={closeDesignSystem} />;
  }

  return (
    <PhoneAuthProvider>
      <Routes>
        <Route path="/" element={<HomePage onDesignSystemClick={onDesignSystemClick} />} />
        <Route path="/trial" element={<HomePage onDesignSystemClick={onDesignSystemClick} />} />
        <Route path={LEGAL_ROUTES.privacy} element={<PrivacyPolicyPage />} />
        <Route path={LEGAL_ROUTES.terms} element={<TermsAndConditionsPage />} />
        <Route path="/account" element={<AccountLayout onDesignSystemClick={onDesignSystemClick} />}>
          <Route index element={<AccountHomePage />} />
          <Route path="deliveries" element={<AccountDeliveriesPage />} />
          <Route path="profile" element={<AccountProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PhoneAuthProvider>
  );
}
