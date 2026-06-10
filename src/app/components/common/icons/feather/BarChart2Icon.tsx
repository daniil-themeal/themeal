import BarChart2IconSvg16 from '../svg/bar-chart-2-16.svg?raw';
import BarChart2IconSvg20 from '../svg/bar-chart-2-20.svg?raw';
import BarChart2IconSvg24 from '../svg/bar-chart-2-24.svg?raw';
import BarChart2IconSvg32 from '../svg/bar-chart-2-32.svg?raw';
import BarChart2IconSvg40 from '../svg/bar-chart-2-40.svg?raw';
import BarChart2IconSvg48 from '../svg/bar-chart-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BAR_CHART2ICON_SVG_BY_SIZE = {
  16: BarChart2IconSvg16,
  20: BarChart2IconSvg20,
  24: BarChart2IconSvg24,
  32: BarChart2IconSvg32,
  40: BarChart2IconSvg40,
  48: BarChart2IconSvg48,
} as const;

export function BarChart2Icon({ size = 20, className = '' }: IconProps) {
  const svg = BAR_CHART2ICON_SVG_BY_SIZE[size] ?? BarChart2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
