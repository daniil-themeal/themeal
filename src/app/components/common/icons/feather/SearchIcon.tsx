import SearchIconSvg16 from '../svg/search-16.svg?raw';
import SearchIconSvg20 from '../svg/search-20.svg?raw';
import SearchIconSvg24 from '../svg/search-24.svg?raw';
import SearchIconSvg32 from '../svg/search-32.svg?raw';
import SearchIconSvg40 from '../svg/search-40.svg?raw';
import SearchIconSvg48 from '../svg/search-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SEARCH_ICON_SVG_BY_SIZE = {
  16: SearchIconSvg16,
  20: SearchIconSvg20,
  24: SearchIconSvg24,
  32: SearchIconSvg32,
  40: SearchIconSvg40,
  48: SearchIconSvg48,
} as const;

export function SearchIcon({ size = 20, className = '' }: IconProps) {
  const svg = SEARCH_ICON_SVG_BY_SIZE[size] ?? SearchIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
