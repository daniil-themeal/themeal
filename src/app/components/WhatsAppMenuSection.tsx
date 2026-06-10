import { useState, type CSSProperties } from 'react';

import { formatUaePhoneInput, validateUaePhone } from './checkout/phoneValidation';
import { Button } from './common/Button';
import { COLOR_TOKENS } from './common/colorTokens';
import { FONT_SIZE_TOKENS } from './common/fontSizeTokens';
import { FormSectionHeading } from './common/FormSectionHeading';
import { PhoneInput } from './common/PhoneInput';

export function WhatsAppMenuSection({
  onGetMenuClick,
}: {
  onGetMenuClick?: (phone: string) => void;
}) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | undefined>();

  const handlePhoneChange = (value: string) => {
    setPhone(formatUaePhoneInput(value));
    setPhoneError(undefined);
  };

  const handleSubmit = () => {
    const validation = validateUaePhone(phone);

    if (!validation.isValid) {
      setPhoneError(validation.error);
      return;
    }

    onGetMenuClick?.(validation.formatted ?? phone);
  };

  return (
    <section className="relative flex w-full shrink-0 justify-center bg-[#F3F4F7] section-spacing-x pt-[70px] pb-[48px] md:pb-[70px]">
      <div className="max-w-[640px] w-full">
        <div
          className="mx-auto flex w-full max-w-[640px] flex-col gap-[24px] rounded-[16px] bg-[var(--whatsapp-menu-bg)] p-[20px] md:p-[24px]"
          style={
            {
              '--whatsapp-menu-bg': COLOR_TOKENS.base.white,
            } as CSSProperties
          }
        >
          <FormSectionHeading
            title="Get your personal menu in WhatsApp"
            subtitle="We'll send you this week's menu and a personal offer. No spam, no commitment."
          />

          <div className="flex flex-col gap-[16px]">
            <div className="flex w-full flex-col gap-[16px] md:flex-row md:items-start md:gap-[12px]">
              <PhoneInput
                id="landing-whatsapp-menu-phone"
                className="min-w-0 flex-1"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="50 123 4567"
                error={phoneError}
              />

              <Button
                type="button"
                variant="primary"
                size="medium"
                className="w-full shrink-0 md:w-auto"
                onClick={handleSubmit}
              >
                Get my menu
              </Button>
            </div>

            <p
              className="text-center font-sans font-medium leading-[140%]"
              style={{
                fontSize: FONT_SIZE_TOKENS[12],
                color: COLOR_TOKENS.neutral[500],
              }}
            >
              We&apos;ll send a verification code via SMS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
