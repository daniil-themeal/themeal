import DropletIconSvg16 from '../svg/droplet-16.svg?raw';
import DropletIconSvg20 from '../svg/droplet-20.svg?raw';
import DropletIconSvg24 from '../svg/droplet-24.svg?raw';
import DropletIconSvg32 from '../svg/droplet-32.svg?raw';
import DropletIconSvg40 from '../svg/droplet-40.svg?raw';
import DropletIconSvg48 from '../svg/droplet-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DROPLET_ICON_SVG_BY_SIZE = {
  16: DropletIconSvg16,
  20: DropletIconSvg20,
  24: DropletIconSvg24,
  32: DropletIconSvg32,
  40: DropletIconSvg40,
  48: DropletIconSvg48,
} as const;

export function DropletIcon({ size = 20, className = '' }: IconProps) {
  const svg = DROPLET_ICON_SVG_BY_SIZE[size] ?? DropletIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
