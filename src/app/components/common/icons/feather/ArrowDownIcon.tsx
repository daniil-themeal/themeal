import ArrowDownIconSvg16 from '../svg/arrow-down-16.svg?raw';
import ArrowDownIconSvg20 from '../svg/arrow-down-20.svg?raw';
import ArrowDownIconSvg24 from '../svg/arrow-down-24.svg?raw';
import ArrowDownIconSvg32 from '../svg/arrow-down-32.svg?raw';
import ArrowDownIconSvg40 from '../svg/arrow-down-40.svg?raw';
import ArrowDownIconSvg48 from '../svg/arrow-down-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_DOWN_ICON_SVG_BY_SIZE = {
  16: ArrowDownIconSvg16,
  20: ArrowDownIconSvg20,
  24: ArrowDownIconSvg24,
  32: ArrowDownIconSvg32,
  40: ArrowDownIconSvg40,
  48: ArrowDownIconSvg48,
} as const;

export function ArrowDownIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_DOWN_ICON_SVG_BY_SIZE[size] ?? ArrowDownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
