import LogOutIconSvg16 from '../svg/log-out-16.svg?raw';
import LogOutIconSvg20 from '../svg/log-out-20.svg?raw';
import LogOutIconSvg24 from '../svg/log-out-24.svg?raw';
import LogOutIconSvg32 from '../svg/log-out-32.svg?raw';
import LogOutIconSvg40 from '../svg/log-out-40.svg?raw';
import LogOutIconSvg48 from '../svg/log-out-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LOG_OUT_ICON_SVG_BY_SIZE = {
  16: LogOutIconSvg16,
  20: LogOutIconSvg20,
  24: LogOutIconSvg24,
  32: LogOutIconSvg32,
  40: LogOutIconSvg40,
  48: LogOutIconSvg48,
} as const;

export function LogOutIcon({ size = 20, className = '' }: IconProps) {
  const svg = LOG_OUT_ICON_SVG_BY_SIZE[size] ?? LogOutIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
