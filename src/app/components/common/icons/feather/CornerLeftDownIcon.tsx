import CornerLeftDownIconSvg16 from '../svg/corner-left-down-16.svg?raw';
import CornerLeftDownIconSvg20 from '../svg/corner-left-down-20.svg?raw';
import CornerLeftDownIconSvg24 from '../svg/corner-left-down-24.svg?raw';
import CornerLeftDownIconSvg32 from '../svg/corner-left-down-32.svg?raw';
import CornerLeftDownIconSvg40 from '../svg/corner-left-down-40.svg?raw';
import CornerLeftDownIconSvg48 from '../svg/corner-left-down-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_LEFT_DOWN_ICON_SVG_BY_SIZE = {
  16: CornerLeftDownIconSvg16,
  20: CornerLeftDownIconSvg20,
  24: CornerLeftDownIconSvg24,
  32: CornerLeftDownIconSvg32,
  40: CornerLeftDownIconSvg40,
  48: CornerLeftDownIconSvg48,
} as const;

export function CornerLeftDownIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_LEFT_DOWN_ICON_SVG_BY_SIZE[size] ?? CornerLeftDownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
