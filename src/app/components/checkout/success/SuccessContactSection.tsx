import type { ReactNode } from 'react';

import { COLOR_TOKENS } from '../../common/colorTokens';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../../common/icons/feather';
import { TEXT_TRIM_CLASS_NAME } from '../../common/textTrimTokens';

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

function TikTokIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 40 40" aria-hidden>
      <path d={svgPaths.padbdf00} fill="currentColor" />
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

function SocialIconButton({
  label,
  children,
  href,
}: {
  label: string;
  children: ReactNode;
  href?: string;
}) {
  const className =
    'flex size-[48px] shrink-0 items-center justify-center transition-opacity hover:opacity-70';

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        <div className="flex size-[40px] items-center justify-center">{children}</div>
      </a>
    );
  }

  return (
    <button type="button" className={className} aria-label={label}>
      <div className="flex size-[40px] items-center justify-center">{children}</div>
    </button>
  );
}

const socialIconColor = COLOR_TOKENS.neutral[200];

type SuccessContactSectionProps = {
  showFollowUs?: boolean;
};

export function SuccessContactSection({ showFollowUs = true }: SuccessContactSectionProps) {
  return (
    <>
      <section className="flex w-full flex-col items-center gap-[20px] px-[32px]">
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'max-w-[400px] text-center font-sans text-[20px] font-normal leading-[130%] tracking-[-0.4px]',
          ].join(' ')}
          style={{ color: COLOR_TOKENS.neutral[900] }}
        >
          For any questions, feel free to contact us. We&apos;ll be happy to assist you!
        </p>

        <div className="flex items-center gap-[16px]">
          <ContactIconButton label="WhatsApp">
            <div className="size-[29px]">
              <WhatsAppIcon />
            </div>
          </ContactIconButton>

          <ContactIconButton label="Telegram">
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
              'w-full text-center font-sans text-[20px] font-normal leading-[130%] tracking-[-0.4px]',
            ].join(' ')}
            style={{ color: COLOR_TOKENS.neutral[900] }}
          >
            Follow us
          </p>

          <div className="flex w-full items-center justify-center gap-[16px] px-[24px]">
            <SocialIconButton label="Facebook">
              <FacebookIcon size={40} className="text-[var(--success-social-icon)]" />
            </SocialIconButton>

            <SocialIconButton label="TikTok">
              <div className="size-[40px] text-[var(--success-social-icon)]">
                <TikTokIcon />
              </div>
            </SocialIconButton>

            <SocialIconButton label="Instagram">
              <InstagramIcon size={40} className="text-[var(--success-social-icon)]" />
            </SocialIconButton>

            <SocialIconButton label="YouTube">
              <YoutubeIcon size={40} className="text-[var(--success-social-icon)]" />
            </SocialIconButton>
          </div>
        </section>
      ) : null}
    </>
  );
}

export const successContactSectionStyle = {
  '--success-social-icon': socialIconColor,
} as const;
