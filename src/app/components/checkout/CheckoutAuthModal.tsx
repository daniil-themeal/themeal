import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';

import { ModalShell } from '../common/ModalShell';
import { COLOR_TOKENS } from '../common/colorTokens';
import { Z_INDEX_TOKENS } from '../common/zIndexTokens';
import {
  CHECKOUT_AUTH_MODAL_INNER_CLASSNAME,
  CHECKOUT_AUTH_MODAL_PANEL_CLASSNAME,
  CHECKOUT_ROOT_CLASSNAME,
} from './checkoutModalShellTokens';
import { SmsCodeScreen } from './SmsCodeScreen';

type CheckoutAuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  onPhoneContinue?: (normalizedPhone: string) => void;
  error?: string;
  isVerifying?: boolean;
  onCodeChange?: (code: string) => void;
  onCodeComplete?: (code: string) => void;
};

const authModalStyle = {
  '--meal-detail-card-bg': COLOR_TOKENS.base.white,
} as CSSProperties;

export function CheckoutAuthModal({
  isOpen,
  onClose,
  phone,
  onPhoneChange,
  onPhoneContinue,
  error,
  isVerifying = false,
  onCodeChange,
  onCodeComplete,
}: CheckoutAuthModalProps) {
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
          style={authModalStyle}
          className={CHECKOUT_AUTH_MODAL_INNER_CLASSNAME}
          role="dialog"
          aria-modal="true"
          aria-label="Sign in to continue"
        >
          <SmsCodeScreen
            layout="modal"
            onClose={requestClose}
            phone={phone}
            onPhoneChange={onPhoneChange}
            onPhoneContinue={onPhoneContinue}
            error={error}
            isVerifying={isVerifying}
            onCodeChange={onCodeChange}
            onCodeComplete={onCodeComplete}
          />
        </div>
      )}
    </ModalShell>,
    document.body,
  );
}
