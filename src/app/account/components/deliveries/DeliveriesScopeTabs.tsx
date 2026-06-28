import { IconButton } from '../../../components/common/IconButton';
import { CalendarIcon } from '../../../components/common/icons/feather/CalendarIcon';
import { SegmentedTabs } from '../../../components/common/SegmentedTabs';
import type { DeliveriesScope } from '../../types/account.types';

const DELIVERIES_SCOPE_OPTIONS = [
  { value: 'next' as const, label: 'Next' },
  { value: 'previous' as const, label: 'Previous' },
];

type DeliveriesScopeTabsProps = {
  value: DeliveriesScope;
  onChange: (value: DeliveriesScope) => void;
  onCalendarClick?: () => void;
};

export function DeliveriesScopeTabs({ value, onChange, onCalendarClick }: DeliveriesScopeTabsProps) {
  return (
    <div className="account-deliveries__tabs-bar">
      <div className="account-deliveries__tabs-wrap">
        <SegmentedTabs
          options={DELIVERIES_SCOPE_OPTIONS}
          value={value}
          onChange={onChange}
          aria-label="Delivery scope"
        />
      </div>

      {onCalendarClick ? (
        <IconButton
          variant="neutral"
          size="small"
          className="account-deliveries__calendar-button"
          aria-label="Open delivery calendar"
          icon={<CalendarIcon size={20} />}
          onClick={onCalendarClick}
        />
      ) : null}
    </div>
  );
}
