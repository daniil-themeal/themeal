import TabletIconSvg16 from '../svg/tablet-16.svg?raw';
import TabletIconSvg20 from '../svg/tablet-20.svg?raw';
import TabletIconSvg24 from '../svg/tablet-24.svg?raw';
import TabletIconSvg32 from '../svg/tablet-32.svg?raw';
import TabletIconSvg40 from '../svg/tablet-40.svg?raw';
import TabletIconSvg48 from '../svg/tablet-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TABLET_ICON_SVG_BY_SIZE = {
  16: TabletIconSvg16,
  20: TabletIconSvg20,
  24: TabletIconSvg24,
  32: TabletIconSvg32,
  40: TabletIconSvg40,
  48: TabletIconSvg48,
} as const;

export function TabletIcon({ size = 20, className = '' }: IconProps) {
  const svg = TABLET_ICON_SVG_BY_SIZE[size] ?? TabletIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
