import type { DeliveryListEntry } from '../../types/account.types';
import { DeliveryListItem } from './DeliveryListItem';

type DeliveriesListProps = {
  deliveries: DeliveryListEntry[];
  onDeliveryClick?: (delivery: DeliveryListEntry) => void;
};

export function DeliveriesList({ deliveries, onDeliveryClick }: DeliveriesListProps) {
  return (
    <div className="account-deliveries__list-wrap">
      <div className="account-deliveries__list-fade account-deliveries__list-fade--top" aria-hidden />
      <div className="account-deliveries__list">
        {deliveries.map((delivery) => (
          <DeliveryListItem
            key={delivery.id}
            delivery={delivery}
            onClick={onDeliveryClick ? () => onDeliveryClick(delivery) : undefined}
          />
        ))}
      </div>
      <div className="account-deliveries__list-fade account-deliveries__list-fade--bottom" aria-hidden />
    </div>
  );
}
