import MinusIconSvg16 from '../svg/minus-16.svg?raw';
import MinusIconSvg20 from '../svg/minus-20.svg?raw';
import MinusIconSvg24 from '../svg/minus-24.svg?raw';
import MinusIconSvg32 from '../svg/minus-32.svg?raw';
import MinusIconSvg40 from '../svg/minus-40.svg?raw';
import MinusIconSvg48 from '../svg/minus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MINUS_ICON_SVG_BY_SIZE = {
  16: MinusIconSvg16,
  20: MinusIconSvg20,
  24: MinusIconSvg24,
  32: MinusIconSvg32,
  40: MinusIconSvg40,
  48: MinusIconSvg48,
} as const;

export function MinusIcon({ size = 20, className = '' }: IconProps) {
  const svg = MINUS_ICON_SVG_BY_SIZE[size] ?? MinusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
