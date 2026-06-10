import ChevronRightIconSvg16 from '../svg/chevron-right-16.svg?raw';
import ChevronRightIconSvg20 from '../svg/chevron-right-20.svg?raw';
import ChevronRightIconSvg24 from '../svg/chevron-right-24.svg?raw';
import ChevronRightIconSvg32 from '../svg/chevron-right-32.svg?raw';
import ChevronRightIconSvg40 from '../svg/chevron-right-40.svg?raw';
import ChevronRightIconSvg48 from '../svg/chevron-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRON_RIGHT_ICON_SVG_BY_SIZE = {
  16: ChevronRightIconSvg16,
  20: ChevronRightIconSvg20,
  24: ChevronRightIconSvg24,
  32: ChevronRightIconSvg32,
  40: ChevronRightIconSvg40,
  48: ChevronRightIconSvg48,
} as const;

export function ChevronRightIcon({ size = 16, className = '' }: IconProps) {
  const svg = CHEVRON_RIGHT_ICON_SVG_BY_SIZE[size] ?? ChevronRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
