import ArrowRightIconSvg16 from '../svg/arrow-right-16.svg?raw';
import ArrowRightIconSvg20 from '../svg/arrow-right-20.svg?raw';
import ArrowRightIconSvg24 from '../svg/arrow-right-24.svg?raw';
import ArrowRightIconSvg32 from '../svg/arrow-right-32.svg?raw';
import ArrowRightIconSvg40 from '../svg/arrow-right-40.svg?raw';
import ArrowRightIconSvg48 from '../svg/arrow-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_RIGHT_ICON_SVG_BY_SIZE = {
  16: ArrowRightIconSvg16,
  20: ArrowRightIconSvg20,
  24: ArrowRightIconSvg24,
  32: ArrowRightIconSvg32,
  40: ArrowRightIconSvg40,
  48: ArrowRightIconSvg48,
} as const;

export function ArrowRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_RIGHT_ICON_SVG_BY_SIZE[size] ?? ArrowRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
