import type { DeliveriesScope } from '../../types/account.types';
import { SegmentedTabs } from '../../../components/common/SegmentedTabs';

const DELIVERIES_SCOPE_OPTIONS = [
  { value: 'next' as const, label: 'Next' },
  { value: 'previous' as const, label: 'Previous' },
];

type DeliveriesScopeTabsProps = {
  value: DeliveriesScope;
  onChange: (value: DeliveriesScope) => void;
};

export function DeliveriesScopeTabs({ value, onChange }: DeliveriesScopeTabsProps) {
  return (
    <div className="account-deliveries__tabs-wrap">
      <SegmentedTabs
        options={DELIVERIES_SCOPE_OPTIONS}
        value={value}
        onChange={onChange}
        aria-label="Delivery scope"
      />
    </div>
  );
}
