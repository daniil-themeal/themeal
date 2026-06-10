import ArrowUpCircleIconSvg16 from '../svg/arrow-up-circle-16.svg?raw';
import ArrowUpCircleIconSvg20 from '../svg/arrow-up-circle-20.svg?raw';
import ArrowUpCircleIconSvg24 from '../svg/arrow-up-circle-24.svg?raw';
import ArrowUpCircleIconSvg32 from '../svg/arrow-up-circle-32.svg?raw';
import ArrowUpCircleIconSvg40 from '../svg/arrow-up-circle-40.svg?raw';
import ArrowUpCircleIconSvg48 from '../svg/arrow-up-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_UP_CIRCLE_ICON_SVG_BY_SIZE = {
  16: ArrowUpCircleIconSvg16,
  20: ArrowUpCircleIconSvg20,
  24: ArrowUpCircleIconSvg24,
  32: ArrowUpCircleIconSvg32,
  40: ArrowUpCircleIconSvg40,
  48: ArrowUpCircleIconSvg48,
} as const;

export function ArrowUpCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_UP_CIRCLE_ICON_SVG_BY_SIZE[size] ?? ArrowUpCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
