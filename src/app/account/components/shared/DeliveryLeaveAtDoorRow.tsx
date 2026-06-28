import { Checkbox } from '../../../components/common/Checkbox';
import type { InlineSuccessPhase } from '../../hooks/useInlineSuccessNotice';
import { LEAVE_AT_DOOR_LABEL } from '../../utils/deliveryLogisticsCopy';
import { InlineSuccessNotice } from './InlineSuccessNotice';

type DeliveryLeaveAtDoorRowProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  successPhase?: InlineSuccessPhase;
};

export function DeliveryLeaveAtDoorRow({
  checked,
  onChange,
  disabled = false,
  successPhase = 'hidden',
}: DeliveryLeaveAtDoorRowProps) {
  return (
    <div className="account-delivery-sheet__leave-at-door-row">
      <Checkbox
        checked={checked}
        onChange={onChange}
        label={LEAVE_AT_DOOR_LABEL}
        disabled={disabled}
      />

      {!disabled && successPhase !== 'hidden' ? (
        <InlineSuccessNotice phase={successPhase}>Updated</InlineSuccessNotice>
      ) : null}
    </div>
  );
}
