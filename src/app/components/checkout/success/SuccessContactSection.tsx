import type { ReactNode } from 'react';

import { landingFollowSocials, socialLinks } from '../../../config/socialLinks';
import { Social } from '../../../main-landing/components/icons';
import { COLOR_TOKENS } from '../../common/colorTokens';
import { TEXT_TRIM_CLASS_NAME } from '../../common/textTrimTokens';

import { CHECKOUT_STEP_SECTION_PX } from '../checkoutStepPageLayoutTokens';
import svgPaths from './successPageSvgPaths';

function WhatsAppIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 29 30" aria-hidden>
      <g clipPath="url(#success-wa-clip)">
        <path d={svgPaths.p24e82b00} fill="url(#success-wa-grad1)" />
        <path d={svgPaths.p365ea900} fill="url(#success-wa-grad2)" />
        <path d={svgPaths.p1862f500} fill="white" />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="success-wa-grad1"
          x1="1383.41"
          x2="1383.41"
          y1="2816.46"
          y2="1.0415"
        >
          <stop stopColor="#1FAF38" />
          <stop offset="1" stopColor="#60D669" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="success-wa-grad2"
          x1="1432.53"
          x2="1432.53"
          y1="2916.91"
          y2="0.537598"
        >
          <stop stopColor="#F9F9F9" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <clipPath id="success-wa-clip">
          <rect fill="white" height="30" width="29" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 30 30" aria-hidden>
      <g clipPath="url(#success-tg-clip)">
        <path d={svgPaths.p1a9d0100} fill="url(#success-tg-grad)" />
        <path d={svgPaths.p3a741080} fill="white" />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="success-tg-grad"
          x1="1500"
          x2="1500"
          y1="0"
          y2="3000"
        >
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
        <clipPath id="success-tg-clip">
          <rect fill="white" height="30" width="30" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ContactIconButton({
  label,
  children,
  href,
}: {
  label: string;
  children: ReactNode;
  href?: string;
}) {
  const className =
    'flex size-[48px] items-center justify-center rounded-[10px] bg-white p-[8px] transition-shadow hover:shadow-md';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} aria-label={label}>
      {children}
    </button>
  );
}

type SuccessContactSectionProps = {
  showFollowUs?: boolean;
};

export function SuccessContactSection({ showFollowUs = true }: SuccessContactSectionProps) {
  return (
    <>
      <section className={`flex w-full flex-col items-center gap-[20px] ${CHECKOUT_STEP_SECTION_PX}`}>
        <div
          className="flex max-w-[400px] flex-col gap-[8px] text-center font-sans text-[20px] font-normal leading-[130%] tracking-[length:var(--letter-spacing-body20)]"
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          <p className={TEXT_TRIM_CLASS_NAME}>For any questions, feel free to contact us.</p>
          <p className={TEXT_TRIM_CLASS_NAME}>We&apos;ll be happy to assist you!</p>
        </div>

        <div className="flex items-center gap-[16px]">
          <ContactIconButton label="WhatsApp" href={socialLinks.whatsapp}>
            <div className="size-[29px]">
              <WhatsAppIcon />
            </div>
          </ContactIconButton>

          <ContactIconButton label="Telegram" href={socialLinks.telegram}>
            <div className="size-[30px]">
              <TelegramIcon />
            </div>
          </ContactIconButton>
        </div>
      </section>

      {showFollowUs ? (
        <section className="flex w-full flex-col items-center gap-[16px]">
          <p
            className={[
              TEXT_TRIM_CLASS_NAME,
              'w-full text-center font-sans text-[20px] font-normal leading-[130%] tracking-[length:var(--letter-spacing-body20)]',
            ].join(' ')}
            style={{ color: COLOR_TOKENS.neutral[900] }}
          >
            Follow us
          </p>

          <div className={`flex w-full flex-wrap items-center justify-center gap-[16px] ${CHECKOUT_STEP_SECTION_PX}`}>
            {landingFollowSocials.map(([key, href]) => {
              const Icon = Social[key];

              return (
                <ContactIconButton key={key} label={key} href={href}>
                  <Icon size={24} />
                </ContactIconButton>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}
