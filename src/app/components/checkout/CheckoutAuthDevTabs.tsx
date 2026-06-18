import type { CSSProperties } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';

export type CheckoutAuthDevMode = 'required' | 'skip';

type CheckoutAuthDevTabsProps = {
  activeMode?: CheckoutAuthDevMode;
  onModeChange: (mode: CheckoutAuthDevMode) => void;
};

const TABS: { id: CheckoutAuthDevMode; label: string }[] = [
  { id: 'required', label: 'Auth' },
  { id: 'skip', label: 'Skip' },
];

const tabStyle = {
  '--auth-dev-tab-active-bg': COLOR_TOKENS.success[500],
  '--auth-dev-tab-active-text': COLOR_TOKENS.base.white,
  '--auth-dev-tab-inactive-text': COLOR_TOKENS.neutral[500],
  '--auth-dev-tab-hover-bg': COLOR_TOKENS.neutral[50],
} as CSSProperties;

export function CheckoutAuthDevTabs({ activeMode = 'required', onModeChange }: CheckoutAuthDevTabsProps) {
  return (
    <div className="flex items-center gap-[4px]">
      {TABS.map((tab) => {
        const isActive = activeMode === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onModeChange(tab.id)}
            className={[
              'cursor-pointer rounded-[8px] px-[12px] py-[6px] font-sans text-[13px] font-semibold leading-[130%] transition-colors',
              isActive
                ? 'bg-[var(--auth-dev-tab-active-bg)] text-[var(--auth-dev-tab-active-text)]'
                : 'bg-transparent text-[var(--auth-dev-tab-inactive-text)] hover:bg-[var(--auth-dev-tab-hover-bg)]',
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
