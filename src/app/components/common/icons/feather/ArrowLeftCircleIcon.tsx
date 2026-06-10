import ArrowLeftCircleIconSvg16 from '../svg/arrow-left-circle-16.svg?raw';
import ArrowLeftCircleIconSvg20 from '../svg/arrow-left-circle-20.svg?raw';
import ArrowLeftCircleIconSvg24 from '../svg/arrow-left-circle-24.svg?raw';
import ArrowLeftCircleIconSvg32 from '../svg/arrow-left-circle-32.svg?raw';
import ArrowLeftCircleIconSvg40 from '../svg/arrow-left-circle-40.svg?raw';
import ArrowLeftCircleIconSvg48 from '../svg/arrow-left-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_LEFT_CIRCLE_ICON_SVG_BY_SIZE = {
  16: ArrowLeftCircleIconSvg16,
  20: ArrowLeftCircleIconSvg20,
  24: ArrowLeftCircleIconSvg24,
  32: ArrowLeftCircleIconSvg32,
  40: ArrowLeftCircleIconSvg40,
  48: ArrowLeftCircleIconSvg48,
} as const;

export function ArrowLeftCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_LEFT_CIRCLE_ICON_SVG_BY_SIZE[size] ?? ArrowLeftCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
