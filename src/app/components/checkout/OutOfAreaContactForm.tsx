import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TextInput } from '../common/TextInput';

type OutOfAreaContactNoticeProps = {
  className?: string;
  onContactMe: () => void;
};

type OutOfAreaContactFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

type OutOfAreaContactCssVariables = CSSProperties & {
  '--out-of-area-notice-bg': string;
  '--out-of-area-card-bg': string;
  '--out-of-area-overlay-bg': string;
  '--out-of-area-text': string;
  '--out-of-area-handle-bg': string;
  '--out-of-area-notice-font-size': string;
  '--out-of-area-title-font-size': string;
};

const MODAL_ANIMATION_DURATION_MS = 220;

const outOfAreaContactStyle: OutOfAreaContactCssVariables = {
  '--out-of-area-notice-bg': COLOR_TOKENS.danger[50],
  '--out-of-area-card-bg': COLOR_TOKENS.base.white,
  '--out-of-area-overlay-bg': 'rgba(47,56,70,0.42)',
  '--out-of-area-text': COLOR_TOKENS.neutral[900],
  '--out-of-area-handle-bg': COLOR_TOKENS.neutral[100],
  '--out-of-area-notice-font-size': FONT_SIZE_TOKENS[16],
  '--out-of-area-title-font-size': FONT_SIZE_TOKENS[20],
};

export function OutOfAreaContactNotice({
  className = '',
  onContactMe,
}: OutOfAreaContactNoticeProps) {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setIsNoticeVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className={`z-40 rounded-[12px] bg-[var(--out-of-area-notice-bg)] p-[20px] shadow-[0_12px_32px_rgba(47,56,70,0.14)] transition-all duration-200 ease-out ${
        isNoticeVisible ? 'translate-y-0 opacity-100' : 'translate-y-[16px] opacity-0'
      } ${className}`}
      style={outOfAreaContactStyle}
    >
      <div className="flex items-center gap-[16px]">
        <p className="min-w-0 flex-1 font-sans text-[length:var(--out-of-area-notice-font-size)] font-medium leading-[135%] text-[var(--out-of-area-text)]">
          Not in your area yet. Leave your details, and we’ll contact you when we deliver there.
        </p>

        <Button type="button" variant="primary" size="40" onClick={onContactMe}>
          Contact me
        </Button>
      </div>
    </div>
  );
}

export function OutOfAreaContactForm({ isOpen, onClose }: OutOfAreaContactFormProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);

      const closeTimer = window.setTimeout(() => {
        setShouldRender(false);
      }, MODAL_ANIMATION_DURATION_MS);

      return () => {
        window.clearTimeout(closeTimer);
      };
    }

    setShouldRender(true);

    const animationFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);

    window.setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, MODAL_ANIMATION_DURATION_MS);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-[var(--out-of-area-overlay-bg)] transition-opacity duration-200 ease-out md:items-center md:px-[20px] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={outOfAreaContactStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-me-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className={`w-full rounded-t-[24px] bg-[var(--out-of-area-card-bg)] px-[20px] pb-[28px] pt-[16px] shadow-[0_-16px_48px_rgba(47,56,70,0.18)] transition-all duration-200 ease-out md:max-w-[520px] md:rounded-[16px] md:p-[32px] md:shadow-[0_24px_64px_rgba(47,56,70,0.24)] ${
          isVisible
            ? 'translate-y-0 opacity-100 md:scale-100'
            : 'translate-y-full opacity-0 md:translate-y-[24px] md:scale-[0.98]'
        }`}
      >
        <div className="mx-auto mb-[18px] h-[4px] w-[48px] rounded-full bg-[var(--out-of-area-handle-bg)] md:hidden" />

        <h2
          id="contact-me-modal-title"
          className="font-sans text-[length:var(--out-of-area-title-font-size)] font-bold leading-[125%] text-[var(--out-of-area-text)]"
        >
          Leave your contact information and we will decide where to send your order.
        </h2>

        <form className="mt-[28px] flex flex-col gap-[20px]">
          <TextInput
            id="out-of-area-contact-name"
            label="Your name"
            value={contactName}
            onChange={(event) => setContactName(event.target.value)}
            placeholder="Type your name"
          />

          <TextInput
            id="out-of-area-contact-email"
            type="email"
            label="E-mail"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            placeholder="Type your e-mail"
          />

          <Button type="button" variant="neutral" size="48" fullWidth disabled className="mt-[4px]">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}