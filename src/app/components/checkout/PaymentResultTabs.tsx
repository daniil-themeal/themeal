import type { CSSProperties, ComponentType } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { SuccessIcon, XCircleIcon } from '../common/icons';
import type { IconProps } from '../common/icons/iconProps';

export type PaymentResultTab = 'success' | 'failed';

type PaymentResultTabsProps = {
  activeTab?: PaymentResultTab;
  onTabChange: (tab: PaymentResultTab) => void;
};

const TABS: {
  id: PaymentResultTab;
  ariaLabel: string;
  iconColor: string;
  Icon: ComponentType<IconProps>;
}[] = [
  {
    id: 'success',
    ariaLabel: 'Success',
    iconColor: COLOR_TOKENS.success[500],
    Icon: SuccessIcon,
  },
  {
    id: 'failed',
    ariaLabel: 'Failed',
    iconColor: COLOR_TOKENS.danger[500],
    Icon: XCircleIcon,
  },
];

const tabStyle = {
  '--result-tab-active-bg': COLOR_TOKENS.neutral[75],
  '--result-tab-hover-bg': COLOR_TOKENS.neutral[50],
} as CSSProperties;

export function PaymentResultTabs({ activeTab, onTabChange }: PaymentResultTabsProps) {
  return (
    <div className="flex items-center gap-[4px]">
      {TABS.map(({ id, ariaLabel, iconColor, Icon }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={[
              'flex size-[32px] cursor-pointer items-center justify-center rounded-[8px] transition-colors',
              isActive
                ? 'bg-[var(--result-tab-active-bg)]'
                : 'bg-transparent hover:bg-[var(--result-tab-hover-bg)]',
            ].join(' ')}
            style={
              {
                ...tabStyle,
                '--result-tab-icon-color': iconColor,
              } as CSSProperties
            }
            aria-label={ariaLabel}
            aria-current={isActive ? 'page' : undefined}
            title={ariaLabel}
          >
            <span className="text-[var(--result-tab-icon-color)]">
              <Icon size={20} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
