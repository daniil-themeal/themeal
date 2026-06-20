import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';

export type PaymentResultTab = 'success' | 'failed';

type PaymentResultTabsProps = {
  activeTab?: PaymentResultTab;
  onTabChange: (tab: PaymentResultTab) => void;
};

const TABS: { id: PaymentResultTab; emoji: string; ariaLabel: string }[] = [
  { id: 'success', emoji: '✅', ariaLabel: 'Success' },
  { id: 'failed', emoji: '❌', ariaLabel: 'Failed' },
];

const tabStyle = {
  '--result-tab-active-bg': COLOR_TOKENS.neutral[75],
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
              'flex size-[32px] cursor-pointer items-center justify-center rounded-[8px] text-[16px] leading-none transition-colors',
              isActive
                ? 'bg-[var(--result-tab-active-bg)]'
                : 'bg-transparent hover:bg-[var(--result-tab-hover-bg)]',
            ].join(' ')}
            style={tabStyle}
            aria-label={tab.ariaLabel}
            aria-current={isActive ? 'page' : undefined}
            title={tab.ariaLabel}
          >
            {tab.emoji}
          </button>
        );
      })}
    </div>
  );
}
