import RefreshCwIconSvg16 from '../svg/refresh-cw-16.svg?raw';
import RefreshCwIconSvg20 from '../svg/refresh-cw-20.svg?raw';
import RefreshCwIconSvg24 from '../svg/refresh-cw-24.svg?raw';
import RefreshCwIconSvg32 from '../svg/refresh-cw-32.svg?raw';
import RefreshCwIconSvg40 from '../svg/refresh-cw-40.svg?raw';
import RefreshCwIconSvg48 from '../svg/refresh-cw-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const REFRESH_CW_ICON_SVG_BY_SIZE = {
  16: RefreshCwIconSvg16,
  20: RefreshCwIconSvg20,
  24: RefreshCwIconSvg24,
  32: RefreshCwIconSvg32,
  40: RefreshCwIconSvg40,
  48: RefreshCwIconSvg48,
} as const;

export function RefreshCwIcon({ size = 20, className = '' }: IconProps) {
  const svg = REFRESH_CW_ICON_SVG_BY_SIZE[size] ?? RefreshCwIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
