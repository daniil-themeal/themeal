import { SmsCodeInput } from '../../components/common/SmsCodeInput';

type LeadSmsStepProps = {
  title: string;
  formattedPhone: string;
  smsCode: string;
  onSmsCodeChange: (code: string) => void;
  onSmsComplete: (code: string) => void;
  smsError?: string;
  changeNumberLabel: string;
  onChangeNumber: () => void;
};

export function LeadSmsStep({
  title,
  formattedPhone,
  smsCode,
  onSmsCodeChange,
  onSmsComplete,
  smsError,
  changeNumberLabel,
  onChangeNumber,
}: LeadSmsStepProps) {
  return (
    <div className="lead-sms stack" style={{ gap: 12 }}>
      <p className="lead-sms-title" style={{ margin: 0, textAlign: 'center', fontWeight: 700, fontSize: 'var(--fs-16)' }}>
        {title}
      </p>
      <SmsCodeInput
        value={smsCode}
        onChange={onSmsCodeChange}
        onComplete={onSmsComplete}
        error={Boolean(smsError)}
        size="compact"
        autoFocus
        className="lead-sms-code"
      />
      {smsError ? (
        <p className="lead-sms-error" style={{ margin: 0, textAlign: 'center', fontSize: 'var(--fs-14)', fontWeight: 600, color: 'var(--danger, #E5484D)' }}>
          {smsError}
        </p>
      ) : null}
      <p className="muted lead-sms-change" style={{ fontSize: 'var(--fs-14)', textAlign: 'center', margin: 0 }}>
        <button
          type="button"
          onClick={onChangeNumber}
          className="lead-sms-change-btn"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', fontWeight: 700, color: 'var(--brand)' }}
        >
          {changeNumberLabel}
        </button>{' '}
        <span style={{ fontWeight: 700 }}>{formattedPhone}</span>
      </p>
    </div>
  );
}
