import type { CSSProperties } from 'react';

import { isDevToolsEnabled } from '../../devToolsEnabled';

import { COLOR_TOKENS } from '../common/colorTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';
import { PaymentResultTabs, type PaymentResultTab } from './PaymentResultTabs';

export type { PaymentResultTab };

type PaymentResultHeaderProps = {
  activeTab: PaymentResultTab;
  onTabChange: (tab: PaymentResultTab) => void;
  onClose: () => void;
};

export function PaymentResultHeader({
  activeTab,
  onTabChange,
  onClose,
}: PaymentResultHeaderProps) {
  return (
    <div
      className="relative h-[56px] shrink-0 border-b bg-white"
      style={{ borderColor: COLOR_TOKENS.neutral[100] }}
    >
      <div className="grid h-full w-full grid-cols-[56px_1fr_56px] items-center">
        <div aria-hidden />

        <div className="flex items-center justify-center">
          {isDevToolsEnabled ? (
            <PaymentResultTabs activeTab={activeTab} onTabChange={onTabChange} />
          ) : null}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center justify-self-end"
          aria-label="Close checkout"
        >
          <span
            className="flex size-[36px] items-center justify-center rounded-full bg-[var(--checkout-header-close-bg)] transition-colors duration-150 group-hover:bg-[var(--checkout-header-close-bg-hover)]"
            style={
              {
                '--checkout-header-close-bg': COLOR_TOKENS.neutral[50],
                '--checkout-header-close-bg-hover': COLOR_TOKENS.neutral[75],
              } as CSSProperties
            }
          >
            <span className={iconColorClassName.emphasis} style={iconColorStyle.emphasis}>
              <XIcon size={16} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
