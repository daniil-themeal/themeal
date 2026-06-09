import mapPinSvg from './map-pin.svg?raw';

import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type MapPinIconProps = {
  size?: IconSize;
  className?: string;
};

export function MapPinIcon({ size = 20, className = '' }: MapPinIconProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        iconSizeClassName[size],
        'flex shrink-0 [&>svg]:size-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      dangerouslySetInnerHTML={{ __html: mapPinSvg }}
    />
  );
}
