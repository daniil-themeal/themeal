import { useCallback, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router';
import LandingStasPage from './landing-stas/LandingStasPage';
import { CheckoutAuthModal } from './components/checkout/CheckoutAuthModal';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { formatUaePhoneInput, normalizeUaePhone } from './components/checkout/phoneValidation';
import {
  isValidTestSmsCode,
  SMS_CODE_ERROR,
  SMS_CODE_SUCCESS_HOLD_MS,
} from './components/checkout/smsCodeValidation';
import DesignSystemDemo from './components/DesignSystemDemo';
import PrivacyPolicyPage from './legal/PrivacyPolicyPage';
import TermsAndConditionsPage from './legal/TermsAndConditionsPage';
import { LEGAL_ROUTES } from './legal/routes';
import {
  clearPhoneSession,
  loadPhoneSession,
  mergePhoneSession,
  savePhoneSession,
  type PhoneSession,
} from './phoneSession';

type InitialCheckoutStep =
  | 'plan'
  | 'verification'
  | 'delivery'
  | 'payment'
  | 'success'
  | 'failed';
type InitialDeliveryStep = 'address' | 'details';

function resumeCheckoutStep(session: PhoneSession): InitialCheckoutStep {
  if (!session.isVerified) {
    return session.checkoutStep === 'verification' ? 'verification' : 'plan';
  }

  const step = session.checkoutStep;
  if (!step || step === 'verification') {
    return 'delivery';
  }
  return step;
}

function displayPhoneFromNormalized(normalized: string): string {
  const digits = normalized.replace(/\D/g, '').slice(-9);
  return formatUaePhoneInput(digits);
}

function HomePage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const [phoneSession, setPhoneSession] = useState<PhoneSession | null>(() => loadPhoneSession());
  const [initialCheckoutStep, setInitialCheckoutStep] =
    useState<InitialCheckoutStep>('plan');
  const [initialDeliveryStep, setInitialDeliveryStep] =
    useState<InitialDeliveryStep>('address');
  const [checkoutInitialPhone, setCheckoutInitialPhone] = useState<string | undefined>();
  const [initialIsVerified, setInitialIsVerified] = useState(false);
  const [leadAuthModalOpen, setLeadAuthModalOpen] = useState(() => {
    const session = loadPhoneSession();
    return Boolean(session?.phone && !session.isVerified);
  });
  const [leadAuthPhone, setLeadAuthPhone] = useState(() => {
    const session = loadPhoneSession();
    return session?.phone && !session.isVerified
      ? displayPhoneFromNormalized(session.phone)
      : '';
  });
  const [leadSmsError, setLeadSmsError] = useState<string | undefined>();
  const [leadIsSmsVerifying, setLeadIsSmsVerifying] = useState(false);
  const leadSmsVerifyTimerRef = useRef<number | null>(null);

  const handleSessionUpdate = useCallback((session: PhoneSession) => {
    setPhoneSession(session);
    savePhoneSession(session);
    if (session.isVerified) {
      setInitialIsVerified(true);
    }
  }, []);

  const clearLeadSmsVerifyTimer = useCallback(() => {
    if (leadSmsVerifyTimerRef.current !== null) {
      window.clearTimeout(leadSmsVerifyTimerRef.current);
      leadSmsVerifyTimerRef.current = null;
    }
  }, []);

  const closeLeadAuthModal = useCallback(() => {
    clearLeadSmsVerifyTimer();
    setLeadIsSmsVerifying(false);
    setLeadSmsError(undefined);
    setLeadAuthModalOpen(false);
  }, [clearLeadSmsVerifyTimer]);

  const openCheckoutAt = useCallback(
    (
      step: InitialCheckoutStep,
      deliveryStep: InitialDeliveryStep,
      phone?: string,
      isVerified = false,
    ) => {
      setCheckoutInitialPhone(phone);
      setInitialCheckoutStep(step);
      setInitialDeliveryStep(deliveryStep);
      setInitialIsVerified(isVerified);
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

  const handleLeadPhoneSubmit = useCallback(
    (phone: string) => {
      const next = mergePhoneSession(phoneSession, {
        phone,
        isVerified: false,
        checkoutStep: 'plan',
        deliveryStep: 'address',
      });
      handleSessionUpdate(next);
      setLeadAuthPhone(displayPhoneFromNormalized(phone));
      setLeadSmsError(undefined);
      setLeadIsSmsVerifying(false);
      setLeadAuthModalOpen(true);
    },
    [handleSessionUpdate, phoneSession],
  );

  const handleLeadSmsVerified = useCallback(
    (phone: string) => {
      const next = mergePhoneSession(phoneSession, {
        phone,
        isVerified: true,
        checkoutStep: 'plan',
        deliveryStep: 'address',
      });
      handleSessionUpdate(next);
    },
    [handleSessionUpdate, phoneSession],
  );

  const handleLeadSmsContinue = useCallback(() => {
    const normalized = normalizeUaePhone(leadAuthPhone);
    if (normalized) {
      handleLeadSmsVerified(normalized);
    }
    setLeadIsSmsVerifying(false);
    setLeadAuthModalOpen(false);
  }, [handleLeadSmsVerified, leadAuthPhone]);

  const handleLeadSmsCodeComplete = useCallback(
    (code: string) => {
      if (leadIsSmsVerifying) return;

      if (!isValidTestSmsCode(code)) {
        setLeadSmsError(SMS_CODE_ERROR);
        return;
      }

      setLeadSmsError(undefined);
      setLeadIsSmsVerifying(true);
      clearLeadSmsVerifyTimer();

      leadSmsVerifyTimerRef.current = window.setTimeout(() => {
        leadSmsVerifyTimerRef.current = null;
        handleLeadSmsContinue();
      }, SMS_CODE_SUCCESS_HOLD_MS);
    },
    [clearLeadSmsVerifyTimer, handleLeadSmsContinue, leadIsSmsVerifying],
  );

  const handleLeadSmsCodeChange = useCallback(() => {
    if (leadSmsError) {
      setLeadSmsError(undefined);
    }
  }, [leadSmsError]);

  const handleLeadPhoneChange = useCallback((value: string) => {
    setLeadAuthPhone(formatUaePhoneInput(value));
  }, []);

  const handleLeadPhoneContinueFromModal = useCallback(
    (normalizedPhone: string) => {
      setLeadAuthPhone(displayPhoneFromNormalized(normalizedPhone));
      const next = mergePhoneSession(phoneSession, {
        phone: normalizedPhone,
        isVerified: false,
        checkoutStep: 'plan',
        deliveryStep: 'address',
      });
      handleSessionUpdate(next);
    },
    [handleSessionUpdate, phoneSession],
  );

  const handleLeadAuthModalSkip = useCallback(() => {
    clearLeadSmsVerifyTimer();
    setLeadIsSmsVerifying(false);
    setLeadSmsError(undefined);
    setLeadAuthModalOpen(false);

    const nextPhone = leadAuthPhone || formatUaePhoneInput('501234567');
    if (!leadAuthPhone) {
      setLeadAuthPhone(nextPhone);
    }

    const next = mergePhoneSession(phoneSession, {
      phone: normalizeUaePhone(nextPhone) ?? nextPhone,
      isVerified: false,
      checkoutStep: 'plan',
      deliveryStep: 'address',
    });
    handleSessionUpdate(next);
  }, [clearLeadSmsVerifyTimer, handleSessionUpdate, leadAuthPhone, phoneSession]);

  const pendingPhone =
    phoneSession && !phoneSession.isVerified ? phoneSession.phone : undefined;

  const resetPhoneSession = useCallback(
    (options?: { closeCheckout?: boolean }) => {
      clearLeadSmsVerifyTimer();
      setLeadAuthModalOpen(false);
      setLeadAuthPhone('');
      setLeadSmsError(undefined);
      setLeadIsSmsVerifying(false);
      clearPhoneSession();
      setPhoneSession(null);
      if (options?.closeCheckout ?? true) {
        setCheckoutOpen(false);
      }
      setInitialIsVerified(false);
      setCheckoutInitialPhone(undefined);
      setInitialCheckoutStep('plan');
      setInitialDeliveryStep('address');
    },
    [clearLeadSmsVerifyTimer],
  );

  useEffect(() => {
    if (checkoutOpen) {
      setLeadAuthModalOpen(false);
    }
  }, [checkoutOpen]);

  useEffect(() => {
    return () => {
      clearLeadSmsVerifyTimer();
    };
  }, [clearLeadSmsVerifyTimer]);

  const closeCheckout = () => {
    setCheckoutOpen(false);
  };

  const openDesignSystem = () => {
    setDesignSystemOpen(true);
  };

  const closeDesignSystem = () => {
    setDesignSystemOpen(false);
  };

  if (designSystemOpen) {
    return <DesignSystemDemo onClose={closeDesignSystem} />;
  }

  return (
    <>
      <LandingStasPage
        onOrderClick={openCheckout}
        onPhoneSubmit={handleLeadPhoneSubmit}
        onContinueClick={openCheckoutResume}
        onResetPhone={resetPhoneSession}
        onDesignSystemClick={openDesignSystem}
        checkoutOpen={checkoutOpen}
        isPhoneVerified={phoneSession?.isVerified ?? false}
        verifiedPhone={phoneSession?.isVerified ? phoneSession.phone : undefined}
        pendingPhone={pendingPhone}
      />

      <CheckoutAuthModal
        isOpen={leadAuthModalOpen && !checkoutOpen}
        onClose={closeLeadAuthModal}
        phone={leadAuthPhone}
        onPhoneChange={handleLeadPhoneChange}
        onPhoneContinue={handleLeadPhoneContinueFromModal}
        error={leadSmsError}
        isVerifying={leadIsSmsVerifying}
        onCodeChange={handleLeadSmsCodeChange}
        onCodeComplete={handleLeadSmsCodeComplete}
        onSkip={handleLeadAuthModalSkip}
      />

      {/* BACKLOG: full-page checkout вместо overlay — docs/backlog/checkout-fullpage.md */}
      <CheckoutPage
        isOpen={checkoutOpen}
        onClose={closeCheckout}
        initialCheckoutStep={initialCheckoutStep}
        initialDeliveryStep={initialDeliveryStep}
        initialPhone={checkoutInitialPhone}
        initialIsVerified={initialIsVerified}
        sessionIsVerified={phoneSession?.isVerified ?? false}
        onSessionUpdate={handleSessionUpdate}
        onResetPhone={() => resetPhoneSession({ closeCheckout: false })}
      />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={LEGAL_ROUTES.privacy} element={<PrivacyPolicyPage />} />
      <Route path={LEGAL_ROUTES.terms} element={<TermsAndConditionsPage />} />
    </Routes>
  );
}
