import UmbrellaIconSvg16 from '../svg/umbrella-16.svg?raw';
import UmbrellaIconSvg20 from '../svg/umbrella-20.svg?raw';
import UmbrellaIconSvg24 from '../svg/umbrella-24.svg?raw';
import UmbrellaIconSvg32 from '../svg/umbrella-32.svg?raw';
import UmbrellaIconSvg40 from '../svg/umbrella-40.svg?raw';
import UmbrellaIconSvg48 from '../svg/umbrella-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const UMBRELLA_ICON_SVG_BY_SIZE = {
  16: UmbrellaIconSvg16,
  20: UmbrellaIconSvg20,
  24: UmbrellaIconSvg24,
  32: UmbrellaIconSvg32,
  40: UmbrellaIconSvg40,
  48: UmbrellaIconSvg48,
} as const;

export function UmbrellaIcon({ size = 20, className = '' }: IconProps) {
  const svg = UMBRELLA_ICON_SVG_BY_SIZE[size] ?? UmbrellaIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
