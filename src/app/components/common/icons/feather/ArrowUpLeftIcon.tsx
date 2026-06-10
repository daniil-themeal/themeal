import ArrowUpLeftIconSvg16 from '../svg/arrow-up-left-16.svg?raw';
import ArrowUpLeftIconSvg20 from '../svg/arrow-up-left-20.svg?raw';
import ArrowUpLeftIconSvg24 from '../svg/arrow-up-left-24.svg?raw';
import ArrowUpLeftIconSvg32 from '../svg/arrow-up-left-32.svg?raw';
import ArrowUpLeftIconSvg40 from '../svg/arrow-up-left-40.svg?raw';
import ArrowUpLeftIconSvg48 from '../svg/arrow-up-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_UP_LEFT_ICON_SVG_BY_SIZE = {
  16: ArrowUpLeftIconSvg16,
  20: ArrowUpLeftIconSvg20,
  24: ArrowUpLeftIconSvg24,
  32: ArrowUpLeftIconSvg32,
  40: ArrowUpLeftIconSvg40,
  48: ArrowUpLeftIconSvg48,
} as const;

export function ArrowUpLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_UP_LEFT_ICON_SVG_BY_SIZE[size] ?? ArrowUpLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
