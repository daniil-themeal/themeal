import LogInIconSvg16 from '../svg/log-in-16.svg?raw';
import LogInIconSvg20 from '../svg/log-in-20.svg?raw';
import LogInIconSvg24 from '../svg/log-in-24.svg?raw';
import LogInIconSvg32 from '../svg/log-in-32.svg?raw';
import LogInIconSvg40 from '../svg/log-in-40.svg?raw';
import LogInIconSvg48 from '../svg/log-in-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LOG_IN_ICON_SVG_BY_SIZE = {
  16: LogInIconSvg16,
  20: LogInIconSvg20,
  24: LogInIconSvg24,
  32: LogInIconSvg32,
  40: LogInIconSvg40,
  48: LogInIconSvg48,
} as const;

export function LogInIcon({ size = 20, className = '' }: IconProps) {
  const svg = LOG_IN_ICON_SVG_BY_SIZE[size] ?? LogInIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
