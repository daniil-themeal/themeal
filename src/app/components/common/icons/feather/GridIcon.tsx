import GridIconSvg16 from '../svg/grid-16.svg?raw';
import GridIconSvg20 from '../svg/grid-20.svg?raw';
import GridIconSvg24 from '../svg/grid-24.svg?raw';
import GridIconSvg32 from '../svg/grid-32.svg?raw';
import GridIconSvg40 from '../svg/grid-40.svg?raw';
import GridIconSvg48 from '../svg/grid-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GRID_ICON_SVG_BY_SIZE = {
  16: GridIconSvg16,
  20: GridIconSvg20,
  24: GridIconSvg24,
  32: GridIconSvg32,
  40: GridIconSvg40,
  48: GridIconSvg48,
} as const;

export function GridIcon({ size = 20, className = '' }: IconProps) {
  const svg = GRID_ICON_SVG_BY_SIZE[size] ?? GridIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
