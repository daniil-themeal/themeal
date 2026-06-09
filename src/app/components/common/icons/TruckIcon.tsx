import truckSvg from './truck.svg?raw';

import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type TruckIconProps = {
  size?: IconSize;
  className?: string;
};

export function TruckIcon({ size = 20, className = '' }: TruckIconProps) {
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
      dangerouslySetInnerHTML={{ __html: truckSvg }}
    />
  );
}
