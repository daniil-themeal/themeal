import CloudRainIconSvg16 from '../svg/cloud-rain-16.svg?raw';
import CloudRainIconSvg20 from '../svg/cloud-rain-20.svg?raw';
import CloudRainIconSvg24 from '../svg/cloud-rain-24.svg?raw';
import CloudRainIconSvg32 from '../svg/cloud-rain-32.svg?raw';
import CloudRainIconSvg40 from '../svg/cloud-rain-40.svg?raw';
import CloudRainIconSvg48 from '../svg/cloud-rain-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLOUD_RAIN_ICON_SVG_BY_SIZE = {
  16: CloudRainIconSvg16,
  20: CloudRainIconSvg20,
  24: CloudRainIconSvg24,
  32: CloudRainIconSvg32,
  40: CloudRainIconSvg40,
  48: CloudRainIconSvg48,
} as const;

export function CloudRainIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLOUD_RAIN_ICON_SVG_BY_SIZE[size] ?? CloudRainIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
