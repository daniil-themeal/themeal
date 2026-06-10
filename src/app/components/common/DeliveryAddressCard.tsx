import type { ButtonHTMLAttributes } from 'react';

import { MapPinIcon } from './icons';
import { PayMethodCard } from './PayMethodCard';

const DEFAULT_TITLE = 'Delivery address';
const DEFAULT_SUBTITLE = 'Select your delivery address';

export type DeliveryAddressCardProps = {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onClick: () => void;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'onClick'>;

export function DeliveryAddressCard({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  actionLabel = 'Change',
  onClick,
  className = '',
  'aria-label': ariaLabel,
  ...buttonProps
}: DeliveryAddressCardProps) {
  return (
    <PayMethodCard
      title={title}
      subtitle={subtitle}
      actionLabel={actionLabel}
      leftIcon={<MapPinIcon size={20} />}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel ?? `Change delivery address: ${title}`}
      {...buttonProps}
    />
  );
}
