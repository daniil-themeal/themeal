import { ChevronRightIcon } from '../../../components/common/icons/feather/ChevronRightIcon';
import { MapPinIcon } from '../../../components/common/icons/feather/MapPinIcon';

type DeliveryAddressRowProps = {
  address: string;
  addressNote?: string;
  canEdit?: boolean;
  onClick?: () => void;
};

export function DeliveryAddressRow({
  address,
  addressNote,
  canEdit = true,
  onClick,
}: DeliveryAddressRowProps) {
  const rowClassName = [
    'account-delivery-sheet__row-btn account-delivery-sheet__row-btn--address',
    !canEdit ? 'account-delivery-sheet__row-btn--static' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <MapPinIcon size={20} className="account-delivery-sheet__row-icon" />
      <span className="account-delivery-sheet__address-copy">
        <span className="account-delivery-sheet__address-line">{address}</span>
        {addressNote ? (
          <span className="account-delivery-sheet__address-note">{addressNote}</span>
        ) : null}
      </span>
      {canEdit ? (
        <ChevronRightIcon size={16} className="account-delivery-sheet__row-chevron" />
      ) : null}
    </>
  );

  if (canEdit) {
    return (
      <button
        type="button"
        className={rowClassName}
        onClick={onClick}
        aria-label="Change delivery address"
      >
        {content}
      </button>
    );
  }

  return <div className={rowClassName}>{content}</div>;
}
