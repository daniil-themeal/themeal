import ArrowUpRightIconSvg16 from '../svg/arrow-up-right-16.svg?raw';
import ArrowUpRightIconSvg20 from '../svg/arrow-up-right-20.svg?raw';
import ArrowUpRightIconSvg24 from '../svg/arrow-up-right-24.svg?raw';
import ArrowUpRightIconSvg32 from '../svg/arrow-up-right-32.svg?raw';
import ArrowUpRightIconSvg40 from '../svg/arrow-up-right-40.svg?raw';
import ArrowUpRightIconSvg48 from '../svg/arrow-up-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_UP_RIGHT_ICON_SVG_BY_SIZE = {
  16: ArrowUpRightIconSvg16,
  20: ArrowUpRightIconSvg20,
  24: ArrowUpRightIconSvg24,
  32: ArrowUpRightIconSvg32,
  40: ArrowUpRightIconSvg40,
  48: ArrowUpRightIconSvg48,
} as const;

export function ArrowUpRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_UP_RIGHT_ICON_SVG_BY_SIZE[size] ?? ArrowUpRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
