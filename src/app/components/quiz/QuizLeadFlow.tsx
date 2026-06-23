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
import { QuizWhatsAppTitle } from './QuizWhatsAppTitle';
import {
  QUIZ_LEAD_EMBEDDED_BODY_CLASSNAME,
  QUIZ_LEAD_EMBEDDED_SHELL_CLASSNAME,
  QUIZ_MOBILE_STICKY_ACTIONS_CLASSNAME,
  QUIZ_SECTION_PX_CLASSNAME,
} from './quizTokens';

type QuizLeadPhase = 'offer' | 'sms' | 'success';

type QuizLeadFlowProps = {
  phase: QuizLeadPhase;
  embedded?: boolean;
  onPhaseChange: (phase: QuizLeadPhase) => void;
  onSmsVerified: (phone: string) => void;
  onSeePlan: () => void;
};

export function QuizLeadFlow({
  phase,
  embedded = false,
  onPhaseChange,
  onSmsVerified,
  onSeePlan,
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

  const formattedPhone = formatUaePhoneInput(phone.replace(/\D/g, '').slice(-9));

  const offerForm = (
    <>
      <PhoneInput
        id="quiz-lead-phone"
        inheritTokens
        value={phone}
        onChange={(v) => {
          setPhone(formatUaePhoneInput(v));
          setPhoneError(undefined);
        }}
        error={phoneError}
        placeholder="50 123 4567"
      />

      <div className={QUIZ_MOBILE_STICKY_ACTIONS_CLASSNAME}>
        <Button type="button" variant="primary" size="medium" fullWidth onClick={handlePhoneSubmit}>
          Continue on WhatsApp
        </Button>

        <p className="text-center font-sans text-[length:var(--quiz-body-font-size)] font-medium leading-[140%] text-[var(--quiz-muted)]">
          We&apos;ll send a verification code via SMS.
        </p>
      </div>
    </>
  );

  const smsForm = (
    <>
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
        className="w-full gap-[8px] sm:gap-[12px]"
      />

      {smsError ? (
        <p className="text-center font-sans text-[length:var(--sms-code-body-font-size)] font-semibold leading-[140%] text-[var(--sms-code-danger)]">
          {smsError}
        </p>
      ) : null}

      <div className="flex flex-col gap-[12px] text-center font-sans text-[length:var(--sms-code-body-font-size)] font-semibold leading-[140%] text-[var(--sms-code-muted)]">
        <p>
          <button
            type="button"
            disabled={isVerifying}
            className="cursor-pointer font-bold text-[var(--sms-code-primary)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send again
          </button>{' '}
          the code after 60 seconds
        </p>
        <p>
          <button
            type="button"
            disabled={isVerifying}
            onClick={() => onPhaseChange('offer')}
            className="cursor-pointer font-bold text-[var(--sms-code-primary)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Change number
          </button>{' '}
          <span className="font-bold text-[var(--sms-code-text)]">{formattedPhone}</span>
        </p>
      </div>
    </>
  );

  const successActions = (
    <div className={QUIZ_MOBILE_STICKY_ACTIONS_CLASSNAME}>
      <Button type="button" variant="primary" size="medium" fullWidth onClick={onSeePlan}>
        Explore the menu
      </Button>
    </div>
  );

  if (embedded) {
    return (
      <div className={QUIZ_LEAD_EMBEDDED_SHELL_CLASSNAME}>
        {phase === 'offer' ? (
          <QuizStepHeader
            title={<QuizWhatsAppTitle text="Talk it through on WhatsApp" />}
            subtitle="We'll bring your numbers in and help you find the right fit. No spam."
            titleSubtitleGap="lead"
          />
        ) : null}

        {phase === 'sms' ? (
          <QuizStepHeader title="Enter verification code" titleAlign="center" />
        ) : null}

        {phase === 'success' ? (
          <QuizStepHeader
            title="You're all set"
            subtitle="We'll reach out on WhatsApp a bit later. In the meantime, take a look at the menu — your plan's already set up with your numbers."
            titleSubtitleGap="lead"
          />
        ) : null}

        <div className={QUIZ_LEAD_EMBEDDED_BODY_CLASSNAME}>
          {phase === 'offer' ? offerForm : null}
          {phase === 'sms' ? smsForm : null}
          {phase === 'success' ? successActions : null}
        </div>
      </div>
    );
  }

  if (phase === 'success') {
    return (
      <div className={['flex flex-col gap-[20px]', QUIZ_SECTION_PX_CLASSNAME].join(' ')}>
        <QuizStepHeader
          title="You're all set"
          subtitle="We'll reach out on WhatsApp a bit later. In the meantime, take a look at the menu — your plan's already set up with your numbers."
        />
        {successActions}
      </div>
    );
  }

  if (phase === 'sms') {
    return (
      <div className={['flex flex-col gap-[20px]', QUIZ_SECTION_PX_CLASSNAME].join(' ')}>
        <QuizStepHeader title="Enter verification code" titleAlign="center" />
        {smsForm}
      </div>
    );
  }

  return (
    <div className={['flex flex-col gap-[20px]', QUIZ_SECTION_PX_CLASSNAME].join(' ')}>
      <QuizStepHeader
        title={<QuizWhatsAppTitle text="Talk it through on WhatsApp" />}
        subtitle="We'll bring your numbers in and help you find the right fit. No spam."
      />
      {offerForm}
    </div>
  );
}
