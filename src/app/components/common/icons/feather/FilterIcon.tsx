import FilterIconSvg16 from '../svg/filter-16.svg?raw';
import FilterIconSvg20 from '../svg/filter-20.svg?raw';
import FilterIconSvg24 from '../svg/filter-24.svg?raw';
import FilterIconSvg32 from '../svg/filter-32.svg?raw';
import FilterIconSvg40 from '../svg/filter-40.svg?raw';
import FilterIconSvg48 from '../svg/filter-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FILTER_ICON_SVG_BY_SIZE = {
  16: FilterIconSvg16,
  20: FilterIconSvg20,
  24: FilterIconSvg24,
  32: FilterIconSvg32,
  40: FilterIconSvg40,
  48: FilterIconSvg48,
} as const;

export function FilterIcon({ size = 20, className = '' }: IconProps) {
  const svg = FILTER_ICON_SVG_BY_SIZE[size] ?? FilterIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
