import { Button } from '../../../components/common/Button';
import { CornerUpLeftIcon } from '../../../components/common/icons/feather/CornerUpLeftIcon';

type DeliveryRescheduleFooterProps = {
  onChangeDate: () => void;
  onConfirm: () => void;
};

export function DeliveryRescheduleFooter({
  onChangeDate,
  onConfirm,
}: DeliveryRescheduleFooterProps) {
  return (
    <footer className="account-reschedule-footer">
      <Button
        type="button"
        variant="neutral"
        outline
        size="medium"
        fullWidth
        leftIcon={<CornerUpLeftIcon size={16} />}
        onClick={onChangeDate}
      >
        Change date
      </Button>
      <Button type="button" variant="primary" size="medium" fullWidth onClick={onConfirm}>
        Confirm
      </Button>
    </footer>
  );
}
