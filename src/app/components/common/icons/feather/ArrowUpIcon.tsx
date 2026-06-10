import ArrowUpIconSvg16 from '../svg/arrow-up-16.svg?raw';
import ArrowUpIconSvg20 from '../svg/arrow-up-20.svg?raw';
import ArrowUpIconSvg24 from '../svg/arrow-up-24.svg?raw';
import ArrowUpIconSvg32 from '../svg/arrow-up-32.svg?raw';
import ArrowUpIconSvg40 from '../svg/arrow-up-40.svg?raw';
import ArrowUpIconSvg48 from '../svg/arrow-up-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_UP_ICON_SVG_BY_SIZE = {
  16: ArrowUpIconSvg16,
  20: ArrowUpIconSvg20,
  24: ArrowUpIconSvg24,
  32: ArrowUpIconSvg32,
  40: ArrowUpIconSvg40,
  48: ArrowUpIconSvg48,
} as const;

export function ArrowUpIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_UP_ICON_SVG_BY_SIZE[size] ?? ArrowUpIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
