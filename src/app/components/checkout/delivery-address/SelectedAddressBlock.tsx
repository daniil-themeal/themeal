import type {
  DeliveryAvailability,
  TestAddress,
} from '../../../data/testAddresses';
import { MapPinIcon } from '../../common/icons';
import { DeliveryAvailableIcon, DeliveryUnavailableIcon } from './addressIcons';

type SelectedAddressBlockProps = {
  address: TestAddress;
  availability: DeliveryAvailability;
  className?: string;
};

export function SelectedAddressBlock({
  address,
  availability,
  className = '',
}: SelectedAddressBlockProps) {
  const isAvailable = availability === 'available';

  return (
    <div className={`flex gap-[12px] ${className}`}>
      <div className="mt-[2px] shrink-0 text-[#8594AC]">
        <MapPinIcon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-quicksand-semibold text-[16px] leading-[1.35] text-[#8594ac]">
          {address.title}, {address.subtitle}
        </p>
      </div>

      <div className="mt-[2px] shrink-0">
        {isAvailable ? <DeliveryAvailableIcon /> : <DeliveryUnavailableIcon />}
      </div>
    </div>
  );
}
