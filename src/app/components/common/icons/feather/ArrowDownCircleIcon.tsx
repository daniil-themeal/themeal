import ArrowDownCircleIconSvg16 from '../svg/arrow-down-circle-16.svg?raw';
import ArrowDownCircleIconSvg20 from '../svg/arrow-down-circle-20.svg?raw';
import ArrowDownCircleIconSvg24 from '../svg/arrow-down-circle-24.svg?raw';
import ArrowDownCircleIconSvg32 from '../svg/arrow-down-circle-32.svg?raw';
import ArrowDownCircleIconSvg40 from '../svg/arrow-down-circle-40.svg?raw';
import ArrowDownCircleIconSvg48 from '../svg/arrow-down-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_DOWN_CIRCLE_ICON_SVG_BY_SIZE = {
  16: ArrowDownCircleIconSvg16,
  20: ArrowDownCircleIconSvg20,
  24: ArrowDownCircleIconSvg24,
  32: ArrowDownCircleIconSvg32,
  40: ArrowDownCircleIconSvg40,
  48: ArrowDownCircleIconSvg48,
} as const;

export function ArrowDownCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_DOWN_CIRCLE_ICON_SVG_BY_SIZE[size] ?? ArrowDownCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
