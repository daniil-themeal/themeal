import ChevronsUpIconSvg16 from '../svg/chevrons-up-16.svg?raw';
import ChevronsUpIconSvg20 from '../svg/chevrons-up-20.svg?raw';
import ChevronsUpIconSvg24 from '../svg/chevrons-up-24.svg?raw';
import ChevronsUpIconSvg32 from '../svg/chevrons-up-32.svg?raw';
import ChevronsUpIconSvg40 from '../svg/chevrons-up-40.svg?raw';
import ChevronsUpIconSvg48 from '../svg/chevrons-up-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRONS_UP_ICON_SVG_BY_SIZE = {
  16: ChevronsUpIconSvg16,
  20: ChevronsUpIconSvg20,
  24: ChevronsUpIconSvg24,
  32: ChevronsUpIconSvg32,
  40: ChevronsUpIconSvg40,
  48: ChevronsUpIconSvg48,
} as const;

export function ChevronsUpIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHEVRONS_UP_ICON_SVG_BY_SIZE[size] ?? ChevronsUpIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
