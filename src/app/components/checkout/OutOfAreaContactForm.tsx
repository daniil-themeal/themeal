import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, FormEvent } from 'react';

import { Button } from '../common/Button';
import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import {
  CHECKOUT_CARD_PADDING_CLAMP,
  CHECKOUT_FONT_CLAMP_18_20,
  MEAL_DETAIL_CONTENT_PADDING_CLAMP,
} from './checkoutSpacing';
import {
  CHECKOUT_AUTH_MODAL_INNER_CLASSNAME,
  CHECKOUT_AUTH_MODAL_PANEL_CLASSNAME,
  CHECKOUT_ROOT_CLASSNAME,
} from './checkoutModalShellTokens';
import { ModalShell } from '../common/ModalShell';
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
  '--out-of-area-text': string;
  '--out-of-area-muted': string;
  '--out-of-area-border': string;
  '--out-of-area-close-bg': string;
  '--out-of-area-close-bg-hover': string;
  '--out-of-area-notice-font-size': string;
  '--out-of-area-title-font-size': string;
  '--out-of-area-heading-font-size': string;
  '--meal-detail-card-bg': string;
  '--checkout-card-padding': string;
  '--meal-detail-content-p': string;
};

const outOfAreaContactStyle: OutOfAreaContactCssVariables = {
  '--out-of-area-notice-bg': COLOR_TOKENS.danger[50],
  '--out-of-area-card-bg': COLOR_TOKENS.base.white,
  '--out-of-area-text': COLOR_TOKENS.neutral[900],
  '--out-of-area-muted': COLOR_TOKENS.neutral[500],
  '--out-of-area-border': COLOR_TOKENS.neutral[100],
  '--out-of-area-close-bg': COLOR_TOKENS.neutral[50],
  '--out-of-area-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--out-of-area-notice-font-size': FONT_SIZE_TOKENS[16],
  '--out-of-area-title-font-size': CHECKOUT_FONT_CLAMP_18_20,
  '--out-of-area-heading-font-size': CHECKOUT_FONT_CLAMP_18_20,
  '--meal-detail-card-bg': COLOR_TOKENS.base.white,
  '--checkout-card-padding': CHECKOUT_CARD_PADDING_CLAMP,
  '--meal-detail-content-p': MEAL_DETAIL_CONTENT_PADDING_CLAMP,
};

function isValidContactEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

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
      className={`rounded-[12px] bg-[var(--out-of-area-notice-bg)] p-[20px] shadow-[0_12px_32px_rgba(47,56,70,0.14)] transition-all duration-200 ease-out ${
        isNoticeVisible ? 'translate-y-0 opacity-100' : 'translate-y-[16px] opacity-0'
      } ${className}`}
      style={outOfAreaContactStyle}
    >
      <div className="flex items-center gap-[16px]">
        <p className="min-w-0 flex-1 font-sans text-[length:var(--out-of-area-notice-font-size)] font-medium leading-[135%] text-[var(--out-of-area-text)]">
          Not in your area yet. Leave your details, and we’ll contact you when we deliver there.
        </p>

        <Button type="button" variant="primary" size="small" onClick={onContactMe}>
          Contact me
        </Button>
      </div>
    </div>
  );
}

export function OutOfAreaContactForm({ isOpen, onClose }: OutOfAreaContactFormProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const canSubmit = useMemo(() => {
    return contactName.trim().length > 0 && isValidContactEmail(contactEmail);
  }, [contactEmail, contactName]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
  };

  return createPortal(
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      variant="bottom-sheet"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName={CHECKOUT_ROOT_CLASSNAME}
      panelClassName={CHECKOUT_AUTH_MODAL_PANEL_CLASSNAME}
    >
      {(requestClose) => (
        <div
          style={outOfAreaContactStyle}
          className={CHECKOUT_AUTH_MODAL_INNER_CLASSNAME}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-me-modal-title"
        >
          <div className="flex h-[56px] shrink-0 items-center gap-[8px] border-b border-[var(--out-of-area-border)] bg-[var(--out-of-area-card-bg)] rounded-t-[20px]">
            <p
              id="contact-me-modal-title"
              className="min-w-0 flex-1 pl-[16px] font-sans text-[length:var(--out-of-area-heading-font-size)] font-bold leading-[130%] text-[var(--out-of-area-text)] md:pl-[20px]"
            >
              Contact us
            </p>

            <button
              type="button"
              onClick={requestClose}
              className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
              aria-label="Close"
            >
              <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--out-of-area-close-bg)] transition-colors duration-150 group-hover:bg-[var(--out-of-area-close-bg-hover)]">
                <span className={iconColorClassName.emphasis} style={iconColorStyle.emphasis}>
                  <XIcon size={16} />
                </span>
              </span>
            </button>
          </div>

          <div className="flex flex-col p-[length:var(--checkout-card-padding)] md:p-[length:var(--meal-detail-content-p)]">
            <p className="font-sans text-[length:var(--out-of-area-title-font-size)] font-medium leading-[140%] text-[var(--out-of-area-muted)]">
              Leave your contact information and we will decide where to send your order.
            </p>

            <form className="mt-[24px] flex flex-col gap-[20px]" onSubmit={handleSubmit}>
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

              <Button
                type="submit"
                variant="primary"
                size="medium"
                fullWidth
                disabled={!canSubmit}
                className="mt-[4px]"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}
