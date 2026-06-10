import CloudOffIconSvg16 from '../svg/cloud-off-16.svg?raw';
import CloudOffIconSvg20 from '../svg/cloud-off-20.svg?raw';
import CloudOffIconSvg24 from '../svg/cloud-off-24.svg?raw';
import CloudOffIconSvg32 from '../svg/cloud-off-32.svg?raw';
import CloudOffIconSvg40 from '../svg/cloud-off-40.svg?raw';
import CloudOffIconSvg48 from '../svg/cloud-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLOUD_OFF_ICON_SVG_BY_SIZE = {
  16: CloudOffIconSvg16,
  20: CloudOffIconSvg20,
  24: CloudOffIconSvg24,
  32: CloudOffIconSvg32,
  40: CloudOffIconSvg40,
  48: CloudOffIconSvg48,
} as const;

export function CloudOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLOUD_OFF_ICON_SVG_BY_SIZE[size] ?? CloudOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
