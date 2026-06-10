import CheckCircleIconSvg16 from '../svg/check-circle-16.svg?raw';
import CheckCircleIconSvg20 from '../svg/check-circle-20.svg?raw';
import CheckCircleIconSvg24 from '../svg/check-circle-24.svg?raw';
import CheckCircleIconSvg32 from '../svg/check-circle-32.svg?raw';
import CheckCircleIconSvg40 from '../svg/check-circle-40.svg?raw';
import CheckCircleIconSvg48 from '../svg/check-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHECK_CIRCLE_ICON_SVG_BY_SIZE = {
  16: CheckCircleIconSvg16,
  20: CheckCircleIconSvg20,
  24: CheckCircleIconSvg24,
  32: CheckCircleIconSvg32,
  40: CheckCircleIconSvg40,
  48: CheckCircleIconSvg48,
} as const;

export function CheckCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHECK_CIRCLE_ICON_SVG_BY_SIZE[size] ?? CheckCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
