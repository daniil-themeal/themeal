import MapPinIconSvg16 from '../svg/map-pin-16.svg?raw';
import MapPinIconSvg20 from '../svg/map-pin-20.svg?raw';
import MapPinIconSvg24 from '../svg/map-pin-24.svg?raw';
import MapPinIconSvg32 from '../svg/map-pin-32.svg?raw';
import MapPinIconSvg40 from '../svg/map-pin-40.svg?raw';
import MapPinIconSvg48 from '../svg/map-pin-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MAP_PIN_ICON_SVG_BY_SIZE = {
  16: MapPinIconSvg16,
  20: MapPinIconSvg20,
  24: MapPinIconSvg24,
  32: MapPinIconSvg32,
  40: MapPinIconSvg40,
  48: MapPinIconSvg48,
} as const;

export function MapPinIcon({ size = 20, className = '' }: IconProps) {
  const svg = MAP_PIN_ICON_SVG_BY_SIZE[size] ?? MapPinIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
