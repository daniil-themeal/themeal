import ArrowDownLeftIconSvg16 from '../svg/arrow-down-left-16.svg?raw';
import ArrowDownLeftIconSvg20 from '../svg/arrow-down-left-20.svg?raw';
import ArrowDownLeftIconSvg24 from '../svg/arrow-down-left-24.svg?raw';
import ArrowDownLeftIconSvg32 from '../svg/arrow-down-left-32.svg?raw';
import ArrowDownLeftIconSvg40 from '../svg/arrow-down-left-40.svg?raw';
import ArrowDownLeftIconSvg48 from '../svg/arrow-down-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_DOWN_LEFT_ICON_SVG_BY_SIZE = {
  16: ArrowDownLeftIconSvg16,
  20: ArrowDownLeftIconSvg20,
  24: ArrowDownLeftIconSvg24,
  32: ArrowDownLeftIconSvg32,
  40: ArrowDownLeftIconSvg40,
  48: ArrowDownLeftIconSvg48,
} as const;

export function ArrowDownLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_DOWN_LEFT_ICON_SVG_BY_SIZE[size] ?? ArrowDownLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
