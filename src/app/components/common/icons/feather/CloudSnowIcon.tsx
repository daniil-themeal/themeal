import CloudSnowIconSvg16 from '../svg/cloud-snow-16.svg?raw';
import CloudSnowIconSvg20 from '../svg/cloud-snow-20.svg?raw';
import CloudSnowIconSvg24 from '../svg/cloud-snow-24.svg?raw';
import CloudSnowIconSvg32 from '../svg/cloud-snow-32.svg?raw';
import CloudSnowIconSvg40 from '../svg/cloud-snow-40.svg?raw';
import CloudSnowIconSvg48 from '../svg/cloud-snow-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLOUD_SNOW_ICON_SVG_BY_SIZE = {
  16: CloudSnowIconSvg16,
  20: CloudSnowIconSvg20,
  24: CloudSnowIconSvg24,
  32: CloudSnowIconSvg32,
  40: CloudSnowIconSvg40,
  48: CloudSnowIconSvg48,
} as const;

export function CloudSnowIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLOUD_SNOW_ICON_SVG_BY_SIZE[size] ?? CloudSnowIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
