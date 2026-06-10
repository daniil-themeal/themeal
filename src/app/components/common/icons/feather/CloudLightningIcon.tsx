import CloudLightningIconSvg16 from '../svg/cloud-lightning-16.svg?raw';
import CloudLightningIconSvg20 from '../svg/cloud-lightning-20.svg?raw';
import CloudLightningIconSvg24 from '../svg/cloud-lightning-24.svg?raw';
import CloudLightningIconSvg32 from '../svg/cloud-lightning-32.svg?raw';
import CloudLightningIconSvg40 from '../svg/cloud-lightning-40.svg?raw';
import CloudLightningIconSvg48 from '../svg/cloud-lightning-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLOUD_LIGHTNING_ICON_SVG_BY_SIZE = {
  16: CloudLightningIconSvg16,
  20: CloudLightningIconSvg20,
  24: CloudLightningIconSvg24,
  32: CloudLightningIconSvg32,
  40: CloudLightningIconSvg40,
  48: CloudLightningIconSvg48,
} as const;

export function CloudLightningIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLOUD_LIGHTNING_ICON_SVG_BY_SIZE[size] ?? CloudLightningIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
