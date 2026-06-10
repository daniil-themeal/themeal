import ChevronUpIconSvg16 from '../svg/chevron-up-16.svg?raw';
import ChevronUpIconSvg20 from '../svg/chevron-up-20.svg?raw';
import ChevronUpIconSvg24 from '../svg/chevron-up-24.svg?raw';
import ChevronUpIconSvg32 from '../svg/chevron-up-32.svg?raw';
import ChevronUpIconSvg40 from '../svg/chevron-up-40.svg?raw';
import ChevronUpIconSvg48 from '../svg/chevron-up-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRON_UP_ICON_SVG_BY_SIZE = {
  16: ChevronUpIconSvg16,
  20: ChevronUpIconSvg20,
  24: ChevronUpIconSvg24,
  32: ChevronUpIconSvg32,
  40: ChevronUpIconSvg40,
  48: ChevronUpIconSvg48,
} as const;

export function ChevronUpIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHEVRON_UP_ICON_SVG_BY_SIZE[size] ?? ChevronUpIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
