import CheckIconSvg12 from '../svg/check-12.svg?raw';
import CheckIconSvg16 from '../svg/check-16.svg?raw';
import CheckIconSvg20 from '../svg/check-20.svg?raw';
import CheckIconSvg24 from '../svg/check-24.svg?raw';
import CheckIconSvg32 from '../svg/check-32.svg?raw';
import CheckIconSvg40 from '../svg/check-40.svg?raw';
import CheckIconSvg48 from '../svg/check-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHECK_ICON_SVG_BY_SIZE = {
  12: CheckIconSvg12,
  16: CheckIconSvg16,
  20: CheckIconSvg20,
  24: CheckIconSvg24,
  32: CheckIconSvg32,
  40: CheckIconSvg40,
  48: CheckIconSvg48,
} as const;

export function CheckIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHECK_ICON_SVG_BY_SIZE[size] ?? CheckIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
