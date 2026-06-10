import RotateCcwIconSvg16 from '../svg/rotate-ccw-16.svg?raw';
import RotateCcwIconSvg20 from '../svg/rotate-ccw-20.svg?raw';
import RotateCcwIconSvg24 from '../svg/rotate-ccw-24.svg?raw';
import RotateCcwIconSvg32 from '../svg/rotate-ccw-32.svg?raw';
import RotateCcwIconSvg40 from '../svg/rotate-ccw-40.svg?raw';
import RotateCcwIconSvg48 from '../svg/rotate-ccw-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ROTATE_CCW_ICON_SVG_BY_SIZE = {
  16: RotateCcwIconSvg16,
  20: RotateCcwIconSvg20,
  24: RotateCcwIconSvg24,
  32: RotateCcwIconSvg32,
  40: RotateCcwIconSvg40,
  48: RotateCcwIconSvg48,
} as const;

export function RotateCcwIcon({ size = 20, className = '' }: IconProps) {
  const svg = ROTATE_CCW_ICON_SVG_BY_SIZE[size] ?? RotateCcwIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
