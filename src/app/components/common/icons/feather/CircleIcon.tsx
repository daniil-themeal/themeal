import CircleIconSvg16 from '../svg/circle-16.svg?raw';
import CircleIconSvg20 from '../svg/circle-20.svg?raw';
import CircleIconSvg24 from '../svg/circle-24.svg?raw';
import CircleIconSvg32 from '../svg/circle-32.svg?raw';
import CircleIconSvg40 from '../svg/circle-40.svg?raw';
import CircleIconSvg48 from '../svg/circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CIRCLE_ICON_SVG_BY_SIZE = {
  16: CircleIconSvg16,
  20: CircleIconSvg20,
  24: CircleIconSvg24,
  32: CircleIconSvg32,
  40: CircleIconSvg40,
  48: CircleIconSvg48,
} as const;

export function CircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = CIRCLE_ICON_SVG_BY_SIZE[size] ?? CircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
