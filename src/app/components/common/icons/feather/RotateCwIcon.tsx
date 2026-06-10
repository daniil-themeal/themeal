import RotateCwIconSvg16 from '../svg/rotate-cw-16.svg?raw';
import RotateCwIconSvg20 from '../svg/rotate-cw-20.svg?raw';
import RotateCwIconSvg24 from '../svg/rotate-cw-24.svg?raw';
import RotateCwIconSvg32 from '../svg/rotate-cw-32.svg?raw';
import RotateCwIconSvg40 from '../svg/rotate-cw-40.svg?raw';
import RotateCwIconSvg48 from '../svg/rotate-cw-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ROTATE_CW_ICON_SVG_BY_SIZE = {
  16: RotateCwIconSvg16,
  20: RotateCwIconSvg20,
  24: RotateCwIconSvg24,
  32: RotateCwIconSvg32,
  40: RotateCwIconSvg40,
  48: RotateCwIconSvg48,
} as const;

export function RotateCwIcon({ size = 20, className = '' }: IconProps) {
  const svg = ROTATE_CW_ICON_SVG_BY_SIZE[size] ?? RotateCwIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
