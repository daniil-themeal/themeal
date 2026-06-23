import type { CSSProperties } from 'react';

import { Modal } from '../common/Modal';
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
  onSkip?: () => void;
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
  onSkip,
}: CheckoutAuthModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Sign in to continue"
      showHeader={false}
      bodyWrapper={false}
      sheetVerticalAlign="center-on-sm"
      zIndex={Z_INDEX_TOKENS.modal}
      rootClassName={CHECKOUT_ROOT_CLASSNAME}
      panelClassName={CHECKOUT_AUTH_MODAL_PANEL_CLASSNAME}
      innerClassName={CHECKOUT_AUTH_MODAL_INNER_CLASSNAME}
      style={authModalStyle}
    >
      {(requestClose) => (
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
          onSkip={onSkip}
        />
      )}
    </Modal>
  );
}
