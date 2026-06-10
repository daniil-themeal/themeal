import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';

export type PaymentResultTab = 'success' | 'failed';

type PaymentResultHeaderProps = {
  activeTab: PaymentResultTab;
  onTabChange: (tab: PaymentResultTab) => void;
  onClose: () => void;
};

const TABS: { id: PaymentResultTab; label: string }[] = [
  { id: 'success', label: 'Success' },
  { id: 'failed', label: 'Failed' },
];

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

        <div className="flex items-center justify-center gap-[4px]">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={[
                  'cursor-pointer rounded-[8px] px-[12px] py-[6px] font-sans text-[13px] font-semibold leading-[130%] transition-colors',
                  isActive
                    ? 'bg-[var(--result-tab-active-bg)] text-[var(--result-tab-active-text)]'
                    : 'bg-transparent text-[var(--result-tab-inactive-text)] hover:bg-[var(--result-tab-hover-bg)]',
                ].join(' ')}
                style={
                  {
                    '--result-tab-active-bg': COLOR_TOKENS.primary[500],
                    '--result-tab-active-text': COLOR_TOKENS.base.white,
                    '--result-tab-inactive-text': COLOR_TOKENS.neutral[500],
                    '--result-tab-hover-bg': COLOR_TOKENS.neutral[50],
                  } as CSSProperties
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </button>
            );
          })}
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
