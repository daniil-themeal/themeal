import { ChevronRightIcon } from '../../../components/common/icons/feather/ChevronRightIcon';
import { MapPinIcon } from '../../../components/common/icons/feather/MapPinIcon';
import type { DeliveryListEntry } from '../../types/account.types';

type DeliveryListItemProps = {
  delivery: DeliveryListEntry;
  onClick?: () => void;
};

export function DeliveryListItem({ delivery, onClick }: DeliveryListItemProps) {
  return (
    <button type="button" className="account-deliveries-item" onClick={onClick}>
      <div className="account-deliveries-item__content">
        <div className="account-deliveries-item__date">
          <span className="account-deliveries-item__day">{delivery.day}</span>
          <span className="account-deliveries-item__month">{delivery.month}</span>
        </div>

        <div className="account-deliveries-item__details">
          <p className="account-deliveries-item__time">{delivery.timeSlot}</p>
          <div className="account-deliveries-item__address">
            <MapPinIcon size={16} className="account-deliveries-item__pin" />
            <span className="account-deliveries-item__address-text">{delivery.address}</span>
          </div>
        </div>
      </div>

      <ChevronRightIcon size={20} className="account-deliveries-item__chevron" />
    </button>
  );
}
