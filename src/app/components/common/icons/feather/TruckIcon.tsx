import TruckIconSvg16 from '../svg/truck-16.svg?raw';
import TruckIconSvg20 from '../svg/truck-20.svg?raw';
import TruckIconSvg24 from '../svg/truck-24.svg?raw';
import TruckIconSvg32 from '../svg/truck-32.svg?raw';
import TruckIconSvg40 from '../svg/truck-40.svg?raw';
import TruckIconSvg48 from '../svg/truck-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TRUCK_ICON_SVG_BY_SIZE = {
  16: TruckIconSvg16,
  20: TruckIconSvg20,
  24: TruckIconSvg24,
  32: TruckIconSvg32,
  40: TruckIconSvg40,
  48: TruckIconSvg48,
} as const;

export function TruckIcon({ size = 20, className = '' }: IconProps) {
  const svg = TRUCK_ICON_SVG_BY_SIZE[size] ?? TruckIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
