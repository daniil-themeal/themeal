import MapIconSvg16 from '../svg/map-16.svg?raw';
import MapIconSvg20 from '../svg/map-20.svg?raw';
import MapIconSvg24 from '../svg/map-24.svg?raw';
import MapIconSvg32 from '../svg/map-32.svg?raw';
import MapIconSvg40 from '../svg/map-40.svg?raw';
import MapIconSvg48 from '../svg/map-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MAP_ICON_SVG_BY_SIZE = {
  16: MapIconSvg16,
  20: MapIconSvg20,
  24: MapIconSvg24,
  32: MapIconSvg32,
  40: MapIconSvg40,
  48: MapIconSvg48,
} as const;

export function MapIcon({ size = 20, className = '' }: IconProps) {
  const svg = MAP_ICON_SVG_BY_SIZE[size] ?? MapIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
