import MinusCircleIconSvg16 from '../svg/minus-circle-16.svg?raw';
import MinusCircleIconSvg20 from '../svg/minus-circle-20.svg?raw';
import MinusCircleIconSvg24 from '../svg/minus-circle-24.svg?raw';
import MinusCircleIconSvg32 from '../svg/minus-circle-32.svg?raw';
import MinusCircleIconSvg40 from '../svg/minus-circle-40.svg?raw';
import MinusCircleIconSvg48 from '../svg/minus-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MINUS_CIRCLE_ICON_SVG_BY_SIZE = {
  16: MinusCircleIconSvg16,
  20: MinusCircleIconSvg20,
  24: MinusCircleIconSvg24,
  32: MinusCircleIconSvg32,
  40: MinusCircleIconSvg40,
  48: MinusCircleIconSvg48,
} as const;

export function MinusCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = MINUS_CIRCLE_ICON_SVG_BY_SIZE[size] ?? MinusCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
