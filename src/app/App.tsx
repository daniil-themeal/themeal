import { useCallback, useState } from 'react';
import LandingStasPage from './landing-stas/LandingStasPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import DesignSystemDemo from './components/DesignSystemDemo';
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
  const step = session.checkoutStep;
  if (!step || step === 'verification') {
    return session.isVerified ? 'delivery' : 'plan';
  }
  return step;
}

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const [phoneSession, setPhoneSession] = useState<PhoneSession | null>(() => loadPhoneSession());
  const [initialCheckoutStep, setInitialCheckoutStep] =
    useState<InitialCheckoutStep>('plan');
  const [initialDeliveryStep, setInitialDeliveryStep] =
    useState<InitialDeliveryStep>('address');
  const [checkoutInitialPhone, setCheckoutInitialPhone] = useState<string | undefined>();
  const [initialIsVerified, setInitialIsVerified] = useState(false);

  const handleSessionUpdate = useCallback((session: PhoneSession) => {
    setPhoneSession(session);
    savePhoneSession(session);
    if (session.isVerified) {
      setInitialIsVerified(true);
    }
  }, []);

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

  const pendingPhone =
    phoneSession && !phoneSession.isVerified ? phoneSession.phone : undefined;

  const resetPhoneSession = useCallback((options?: { closeCheckout?: boolean }) => {
    clearPhoneSession();
    setPhoneSession(null);
    if (options?.closeCheckout ?? true) {
      setCheckoutOpen(false);
    }
    setInitialIsVerified(false);
    setCheckoutInitialPhone(undefined);
    setInitialCheckoutStep('plan');
    setInitialDeliveryStep('address');
  }, []);

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
        onSmsVerified={handleLeadSmsVerified}
        onContinueClick={openCheckoutResume}
        onResetPhone={resetPhoneSession}
        onDesignSystemClick={openDesignSystem}
        checkoutOpen={checkoutOpen}
        isPhoneVerified={phoneSession?.isVerified ?? false}
        pendingPhone={pendingPhone}
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
