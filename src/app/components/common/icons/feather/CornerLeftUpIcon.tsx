import CornerLeftUpIconSvg16 from '../svg/corner-left-up-16.svg?raw';
import CornerLeftUpIconSvg20 from '../svg/corner-left-up-20.svg?raw';
import CornerLeftUpIconSvg24 from '../svg/corner-left-up-24.svg?raw';
import CornerLeftUpIconSvg32 from '../svg/corner-left-up-32.svg?raw';
import CornerLeftUpIconSvg40 from '../svg/corner-left-up-40.svg?raw';
import CornerLeftUpIconSvg48 from '../svg/corner-left-up-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_LEFT_UP_ICON_SVG_BY_SIZE = {
  16: CornerLeftUpIconSvg16,
  20: CornerLeftUpIconSvg20,
  24: CornerLeftUpIconSvg24,
  32: CornerLeftUpIconSvg32,
  40: CornerLeftUpIconSvg40,
  48: CornerLeftUpIconSvg48,
} as const;

export function CornerLeftUpIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_LEFT_UP_ICON_SVG_BY_SIZE[size] ?? CornerLeftUpIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
