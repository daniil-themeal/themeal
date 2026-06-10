import RefreshCcwIconSvg16 from '../svg/refresh-ccw-16.svg?raw';
import RefreshCcwIconSvg20 from '../svg/refresh-ccw-20.svg?raw';
import RefreshCcwIconSvg24 from '../svg/refresh-ccw-24.svg?raw';
import RefreshCcwIconSvg32 from '../svg/refresh-ccw-32.svg?raw';
import RefreshCcwIconSvg40 from '../svg/refresh-ccw-40.svg?raw';
import RefreshCcwIconSvg48 from '../svg/refresh-ccw-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const REFRESH_CCW_ICON_SVG_BY_SIZE = {
  16: RefreshCcwIconSvg16,
  20: RefreshCcwIconSvg20,
  24: RefreshCcwIconSvg24,
  32: RefreshCcwIconSvg32,
  40: RefreshCcwIconSvg40,
  48: RefreshCcwIconSvg48,
} as const;

export function RefreshCcwIcon({ size = 20, className = '' }: IconProps) {
  const svg = REFRESH_CCW_ICON_SVG_BY_SIZE[size] ?? RefreshCcwIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
