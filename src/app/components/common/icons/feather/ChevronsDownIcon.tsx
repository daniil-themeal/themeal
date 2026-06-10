import ChevronsDownIconSvg16 from '../svg/chevrons-down-16.svg?raw';
import ChevronsDownIconSvg20 from '../svg/chevrons-down-20.svg?raw';
import ChevronsDownIconSvg24 from '../svg/chevrons-down-24.svg?raw';
import ChevronsDownIconSvg32 from '../svg/chevrons-down-32.svg?raw';
import ChevronsDownIconSvg40 from '../svg/chevrons-down-40.svg?raw';
import ChevronsDownIconSvg48 from '../svg/chevrons-down-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRONS_DOWN_ICON_SVG_BY_SIZE = {
  16: ChevronsDownIconSvg16,
  20: ChevronsDownIconSvg20,
  24: ChevronsDownIconSvg24,
  32: ChevronsDownIconSvg32,
  40: ChevronsDownIconSvg40,
  48: ChevronsDownIconSvg48,
} as const;

export function ChevronsDownIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHEVRONS_DOWN_ICON_SVG_BY_SIZE[size] ?? ChevronsDownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
