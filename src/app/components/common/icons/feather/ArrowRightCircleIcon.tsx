import ArrowRightCircleIconSvg16 from '../svg/arrow-right-circle-16.svg?raw';
import ArrowRightCircleIconSvg20 from '../svg/arrow-right-circle-20.svg?raw';
import ArrowRightCircleIconSvg24 from '../svg/arrow-right-circle-24.svg?raw';
import ArrowRightCircleIconSvg32 from '../svg/arrow-right-circle-32.svg?raw';
import ArrowRightCircleIconSvg40 from '../svg/arrow-right-circle-40.svg?raw';
import ArrowRightCircleIconSvg48 from '../svg/arrow-right-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_RIGHT_CIRCLE_ICON_SVG_BY_SIZE = {
  16: ArrowRightCircleIconSvg16,
  20: ArrowRightCircleIconSvg20,
  24: ArrowRightCircleIconSvg24,
  32: ArrowRightCircleIconSvg32,
  40: ArrowRightCircleIconSvg40,
  48: ArrowRightCircleIconSvg48,
} as const;

export function ArrowRightCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_RIGHT_CIRCLE_ICON_SVG_BY_SIZE[size] ?? ArrowRightCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
