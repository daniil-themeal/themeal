import CloudDrizzleIconSvg16 from '../svg/cloud-drizzle-16.svg?raw';
import CloudDrizzleIconSvg20 from '../svg/cloud-drizzle-20.svg?raw';
import CloudDrizzleIconSvg24 from '../svg/cloud-drizzle-24.svg?raw';
import CloudDrizzleIconSvg32 from '../svg/cloud-drizzle-32.svg?raw';
import CloudDrizzleIconSvg40 from '../svg/cloud-drizzle-40.svg?raw';
import CloudDrizzleIconSvg48 from '../svg/cloud-drizzle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLOUD_DRIZZLE_ICON_SVG_BY_SIZE = {
  16: CloudDrizzleIconSvg16,
  20: CloudDrizzleIconSvg20,
  24: CloudDrizzleIconSvg24,
  32: CloudDrizzleIconSvg32,
  40: CloudDrizzleIconSvg40,
  48: CloudDrizzleIconSvg48,
} as const;

export function CloudDrizzleIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLOUD_DRIZZLE_ICON_SVG_BY_SIZE[size] ?? CloudDrizzleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
