import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';

export type PaymentResultTab = 'success' | 'failed';

type PaymentResultTabsProps = {
  activeTab?: PaymentResultTab;
  onTabChange: (tab: PaymentResultTab) => void;
};

const TABS: { id: PaymentResultTab; label: string }[] = [
  { id: 'success', label: 'Success' },
  { id: 'failed', label: 'Failed' },
];

const tabStyle = {
  '--result-tab-active-bg': COLOR_TOKENS.primary[500],
  '--result-tab-active-text': COLOR_TOKENS.base.white,
  '--result-tab-inactive-text': COLOR_TOKENS.neutral[500],
  '--result-tab-hover-bg': COLOR_TOKENS.neutral[50],
} as CSSProperties;

export function PaymentResultTabs({ activeTab, onTabChange }: PaymentResultTabsProps) {
  return (
    <div className="flex items-center gap-[4px]">
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
            style={tabStyle}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
