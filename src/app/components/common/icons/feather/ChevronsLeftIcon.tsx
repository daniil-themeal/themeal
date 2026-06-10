import ChevronsLeftIconSvg16 from '../svg/chevrons-left-16.svg?raw';
import ChevronsLeftIconSvg20 from '../svg/chevrons-left-20.svg?raw';
import ChevronsLeftIconSvg24 from '../svg/chevrons-left-24.svg?raw';
import ChevronsLeftIconSvg32 from '../svg/chevrons-left-32.svg?raw';
import ChevronsLeftIconSvg40 from '../svg/chevrons-left-40.svg?raw';
import ChevronsLeftIconSvg48 from '../svg/chevrons-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRONS_LEFT_ICON_SVG_BY_SIZE = {
  16: ChevronsLeftIconSvg16,
  20: ChevronsLeftIconSvg20,
  24: ChevronsLeftIconSvg24,
  32: ChevronsLeftIconSvg32,
  40: ChevronsLeftIconSvg40,
  48: ChevronsLeftIconSvg48,
} as const;

export function ChevronsLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHEVRONS_LEFT_ICON_SVG_BY_SIZE[size] ?? ChevronsLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
