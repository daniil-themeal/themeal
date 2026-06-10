import CloudIconSvg16 from '../svg/cloud-16.svg?raw';
import CloudIconSvg20 from '../svg/cloud-20.svg?raw';
import CloudIconSvg24 from '../svg/cloud-24.svg?raw';
import CloudIconSvg32 from '../svg/cloud-32.svg?raw';
import CloudIconSvg40 from '../svg/cloud-40.svg?raw';
import CloudIconSvg48 from '../svg/cloud-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLOUD_ICON_SVG_BY_SIZE = {
  16: CloudIconSvg16,
  20: CloudIconSvg20,
  24: CloudIconSvg24,
  32: CloudIconSvg32,
  40: CloudIconSvg40,
  48: CloudIconSvg48,
} as const;

export function CloudIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLOUD_ICON_SVG_BY_SIZE[size] ?? CloudIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
