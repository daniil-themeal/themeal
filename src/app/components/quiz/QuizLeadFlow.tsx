import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '../common/Button';
import { PhoneInput } from '../common/PhoneInput';
import { SmsCodeInput } from '../common/SmsCodeInput';
import {
  formatUaePhoneInput,
  normalizeUaePhone,
  validateUaePhone,
} from '../checkout/phoneValidation';
import {
  isValidTestSmsCode,
  SMS_CODE_ERROR,
  SMS_CODE_SUCCESS_HOLD_MS,
} from '../checkout/smsCodeValidation';
import { QuizStepHeader } from './QuizStepHeader';

type QuizLeadPhase = 'offer' | 'sms' | 'success';

type QuizLeadFlowProps = {
  phase: QuizLeadPhase;
  onPhaseChange: (phase: QuizLeadPhase) => void;
  onSmsVerified: (phone: string) => void;
  onSeePlan: () => void;
  onWhatsAppFirst: () => void;
};

export function QuizLeadFlow({
  phase,
  onPhaseChange,
  onSmsVerified,
  onSeePlan,
  onWhatsAppFirst,
}: QuizLeadFlowProps) {
  const [smsCode, setSmsCode] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [smsError, setSmsError] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState(false);
  const verifyTimerRef = useRef<number | null>(null);

  const clearVerifyTimer = useCallback(() => {
    if (verifyTimerRef.current !== null) {
      window.clearTimeout(verifyTimerRef.current);
      verifyTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearVerifyTimer();
  }, [clearVerifyTimer]);

  const handlePhoneSubmit = () => {
    const validation = validateUaePhone(phone);
    if (!validation.isValid) {
      setPhoneError(validation.error);
      return;
    }
    setPhoneError(undefined);
    onPhaseChange('sms');
  };

  const handleCodeComplete = (code: string) => {
    if (isVerifying) return;

    if (!isValidTestSmsCode(code)) {
      setSmsError(SMS_CODE_ERROR);
      return;
    }

    setSmsError(undefined);
    setIsVerifying(true);
    clearVerifyTimer();

    verifyTimerRef.current = window.setTimeout(() => {
      verifyTimerRef.current = null;
      const normalized = normalizeUaePhone(phone);
      if (normalized) {
        onSmsVerified(normalized);
      }
      setIsVerifying(false);
      onPhaseChange('success');
    }, SMS_CODE_SUCCESS_HOLD_MS);
  };

  if (phase === 'success') {
    return (
      <div className="flex flex-col gap-[20px]">
        <QuizStepHeader
          title="Your menu is on its way to WhatsApp"
          subtitle="The full menu with photos will arrive in a couple of minutes. Take a look whenever it suits you — no rush."
        />

        <div className="flex flex-col gap-[8px] rounded-[16px] bg-[var(--quiz-surface)] p-[16px]">
          <p className="font-sans text-[length:var(--quiz-option-font-size)] font-bold leading-[130%] text-[var(--quiz-text)]">
            Ready to see your plan?
          </p>
          <p className="font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
            We&apos;ve already put it together with your numbers — nothing to re-enter, just take a
            look.
          </p>
        </div>

        <div className="flex flex-col gap-[12px]">
          <Button type="button" variant="primary" size="medium" fullWidth onClick={onSeePlan}>
            See my plan
          </Button>
          <Button type="button" variant="neutral" outline size="medium" fullWidth onClick={onWhatsAppFirst}>
            I&apos;ll check WhatsApp first
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'sms') {
    const formattedPhone = formatUaePhoneInput(phone.replace(/\D/g, '').slice(-9));

    return (
      <div className="flex flex-col gap-[20px]">
        <QuizStepHeader title="Enter verification code" />

        <SmsCodeInput
          value={smsCode}
          onChange={(code) => {
            setSmsCode(code);
            if (smsError) setSmsError(undefined);
          }}
          onComplete={handleCodeComplete}
          error={Boolean(smsError)}
          success={isVerifying}
          disabled={isVerifying}
          autoFocus
          autoFocusDelay={200}
        />

        {smsError ? (
          <p className="text-center font-sans text-[length:var(--quiz-body-font-size)] font-semibold leading-[140%] text-[var(--quiz-danger)]">
            {smsError}
          </p>
        ) : null}

        <div className="flex flex-col gap-[12px] text-center font-sans text-[length:var(--quiz-body-font-size)] leading-[140%]">
          <p className="text-[var(--quiz-muted)]">
            <button
              type="button"
              disabled={isVerifying}
              className="cursor-pointer font-bold text-[var(--quiz-text)] disabled:opacity-60"
            >
              Send again
            </button>{' '}
            the code after 60 seconds
          </p>
          <p className="text-[var(--quiz-muted)]">
            <button
              type="button"
              disabled={isVerifying}
              onClick={() => onPhaseChange('offer')}
              className="cursor-pointer font-bold text-[var(--quiz-text)] disabled:opacity-60"
            >
              Change number
            </button>{' '}
            <span className="font-bold text-[var(--quiz-text)]">{formattedPhone}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <QuizStepHeader
        title="Get this week's menu on WhatsApp?"
        subtitle="We'll send the full menu with photos and match a plan to your numbers. No spam, no commitment."
      />

      <PhoneInput
        id="quiz-lead-phone"
        value={phone}
        onChange={(v) => {
          setPhone(formatUaePhoneInput(v));
          setPhoneError(undefined);
        }}
        error={phoneError}
        placeholder="50 123 4567"
      />

      <Button type="button" variant="primary" size="medium" fullWidth onClick={handlePhoneSubmit}>
        Get my menu
      </Button>

      <p className="text-center font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
        We&apos;ll send a verification code via SMS.
      </p>
    </div>
  );
}
