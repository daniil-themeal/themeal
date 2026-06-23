import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import { isDevToolsEnabled } from '../devToolsEnabled';
import { CheckoutAuthModal } from '../components/checkout/CheckoutAuthModal';
import { formatUaePhoneInput, normalizeUaePhone } from '../components/checkout/phoneValidation';
import {
  isValidTestSmsCode,
  SMS_CODE_ERROR,
  SMS_CODE_SUCCESS_HOLD_MS,
} from '../components/checkout/smsCodeValidation';
import {
  clearPhoneSession,
  loadPhoneSession,
  mergePhoneSession,
  savePhoneSession,
  type PhoneSession,
} from '../phoneSession';

function displayPhoneFromNormalized(normalized: string): string {
  const digits = normalized.replace(/\D/g, '').slice(-9);
  return formatUaePhoneInput(digits);
}

type PhoneAuthContextValue = {
  phoneSession: PhoneSession | null;
  isPhoneVerified: boolean;
  verifiedPhone?: string;
  pendingPhone?: string;
  handleSessionUpdate: (session: PhoneSession) => void;
  resetPhoneSession: (options?: { closeCheckout?: boolean }) => void;
  handleLeadPhoneSubmit: (phone: string) => void;
  handleResumeVerification: () => void;
  openSignIn: () => void;
  setAuthModalSuppressed: (suppressed: boolean) => void;
};

const PhoneAuthContext = createContext<PhoneAuthContextValue | null>(null);

export function usePhoneAuth() {
  const ctx = useContext(PhoneAuthContext);
  if (!ctx) {
    throw new Error('usePhoneAuth must be used within PhoneAuthProvider');
  }
  return ctx;
}

type PhoneAuthProviderProps = {
  children: ReactNode;
};

export function PhoneAuthProvider({ children }: PhoneAuthProviderProps) {
  const [phoneSession, setPhoneSession] = useState<PhoneSession | null>(() => loadPhoneSession());
  const [authModalSuppressed, setAuthModalSuppressed] = useState(false);
  const [leadAuthModalOpen, setLeadAuthModalOpen] = useState(false);
  const [leadAuthPhone, setLeadAuthPhone] = useState(() => {
    const session = loadPhoneSession();
    return session?.phone && !session.isVerified
      ? displayPhoneFromNormalized(session.phone)
      : '';
  });
  const [leadSmsError, setLeadSmsError] = useState<string | undefined>();
  const [leadIsSmsVerifying, setLeadIsSmsVerifying] = useState(false);
  const leadSmsVerifyTimerRef = useRef<number | null>(null);

  const clearLeadSmsVerifyTimer = useCallback(() => {
    if (leadSmsVerifyTimerRef.current !== null) {
      window.clearTimeout(leadSmsVerifyTimerRef.current);
      leadSmsVerifyTimerRef.current = null;
    }
  }, []);

  const handleSessionUpdate = useCallback((session: PhoneSession) => {
    setPhoneSession(session);
    savePhoneSession(session);
  }, []);

  const closeLeadAuthModal = useCallback(() => {
    clearLeadSmsVerifyTimer();
    setLeadIsSmsVerifying(false);
    setLeadSmsError(undefined);
    setLeadAuthModalOpen(false);
  }, [clearLeadSmsVerifyTimer]);

  const handleLeadSmsVerified = useCallback(
    (phone: string) => {
      const next = mergePhoneSession(phoneSession, {
        phone,
        isVerified: true,
        checkoutStep: 'delivery',
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

  const handleResumeVerification = useCallback(() => {
    const session = phoneSession ?? loadPhoneSession();
    if (!session?.phone || session.isVerified) return;

    setLeadAuthPhone(displayPhoneFromNormalized(session.phone));
    setLeadSmsError(undefined);
    setLeadIsSmsVerifying(false);
    setLeadAuthModalOpen(true);
  }, [phoneSession]);

  const openSignIn = useCallback(() => {
    const session = phoneSession ?? loadPhoneSession();
    if (session?.isVerified) return;

    if (session?.phone && !session.isVerified) {
      handleResumeVerification();
      return;
    }

    setLeadAuthPhone('');
    setLeadSmsError(undefined);
    setLeadIsSmsVerifying(false);
    setLeadAuthModalOpen(true);
  }, [handleResumeVerification, phoneSession]);

  const resetPhoneSession = useCallback(
    (_options?: { closeCheckout?: boolean }) => {
      clearLeadSmsVerifyTimer();
      setLeadAuthModalOpen(false);
      setLeadAuthPhone('');
      setLeadSmsError(undefined);
      setLeadIsSmsVerifying(false);
      clearPhoneSession();
      setPhoneSession(null);
    },
    [clearLeadSmsVerifyTimer],
  );

  const pendingPhone =
    phoneSession && !phoneSession.isVerified ? phoneSession.phone : undefined;

  useEffect(() => {
    return () => {
      clearLeadSmsVerifyTimer();
    };
  }, [clearLeadSmsVerifyTimer]);

  const value: PhoneAuthContextValue = {
    phoneSession,
    isPhoneVerified: phoneSession?.isVerified ?? false,
    verifiedPhone: phoneSession?.isVerified ? phoneSession.phone : undefined,
    pendingPhone,
    handleSessionUpdate,
    resetPhoneSession,
    handleLeadPhoneSubmit,
    handleResumeVerification,
    openSignIn,
    setAuthModalSuppressed,
  };

  return (
    <PhoneAuthContext.Provider value={value}>
      {children}
      <CheckoutAuthModal
        isOpen={leadAuthModalOpen && !authModalSuppressed}
        onClose={closeLeadAuthModal}
        phone={leadAuthPhone}
        onPhoneChange={handleLeadPhoneChange}
        onPhoneContinue={handleLeadPhoneContinueFromModal}
        error={leadSmsError}
        isVerifying={leadIsSmsVerifying}
        onCodeChange={handleLeadSmsCodeChange}
        onCodeComplete={handleLeadSmsCodeComplete}
        onSkip={isDevToolsEnabled ? handleLeadAuthModalSkip : undefined}
      />
    </PhoneAuthContext.Provider>
  );
}

export { displayPhoneFromNormalized };
