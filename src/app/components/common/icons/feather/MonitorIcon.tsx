import MonitorIconSvg16 from '../svg/monitor-16.svg?raw';
import MonitorIconSvg20 from '../svg/monitor-20.svg?raw';
import MonitorIconSvg24 from '../svg/monitor-24.svg?raw';
import MonitorIconSvg32 from '../svg/monitor-32.svg?raw';
import MonitorIconSvg40 from '../svg/monitor-40.svg?raw';
import MonitorIconSvg48 from '../svg/monitor-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MONITOR_ICON_SVG_BY_SIZE = {
  16: MonitorIconSvg16,
  20: MonitorIconSvg20,
  24: MonitorIconSvg24,
  32: MonitorIconSvg32,
  40: MonitorIconSvg40,
  48: MonitorIconSvg48,
} as const;

export function MonitorIcon({ size = 20, className = '' }: IconProps) {
  const svg = MONITOR_ICON_SVG_BY_SIZE[size] ?? MonitorIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
