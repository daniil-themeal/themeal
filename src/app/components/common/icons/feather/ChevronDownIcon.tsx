import ChevronDownIconSvg16 from '../svg/chevron-down-16.svg?raw';
import ChevronDownIconSvg20 from '../svg/chevron-down-20.svg?raw';
import ChevronDownIconSvg24 from '../svg/chevron-down-24.svg?raw';
import ChevronDownIconSvg32 from '../svg/chevron-down-32.svg?raw';
import ChevronDownIconSvg40 from '../svg/chevron-down-40.svg?raw';
import ChevronDownIconSvg48 from '../svg/chevron-down-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRON_DOWN_ICON_SVG_BY_SIZE = {
  16: ChevronDownIconSvg16,
  20: ChevronDownIconSvg20,
  24: ChevronDownIconSvg24,
  32: ChevronDownIconSvg32,
  40: ChevronDownIconSvg40,
  48: ChevronDownIconSvg48,
} as const;

export function ChevronDownIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHEVRON_DOWN_ICON_SVG_BY_SIZE[size] ?? ChevronDownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
