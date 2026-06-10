import ChevronLeftIconSvg16 from '../svg/chevron-left-16.svg?raw';
import ChevronLeftIconSvg20 from '../svg/chevron-left-20.svg?raw';
import ChevronLeftIconSvg24 from '../svg/chevron-left-24.svg?raw';
import ChevronLeftIconSvg32 from '../svg/chevron-left-32.svg?raw';
import ChevronLeftIconSvg40 from '../svg/chevron-left-40.svg?raw';
import ChevronLeftIconSvg48 from '../svg/chevron-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRON_LEFT_ICON_SVG_BY_SIZE = {
  16: ChevronLeftIconSvg16,
  20: ChevronLeftIconSvg20,
  24: ChevronLeftIconSvg24,
  32: ChevronLeftIconSvg32,
  40: ChevronLeftIconSvg40,
  48: ChevronLeftIconSvg48,
} as const;

export function ChevronLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHEVRON_LEFT_ICON_SVG_BY_SIZE[size] ?? ChevronLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
