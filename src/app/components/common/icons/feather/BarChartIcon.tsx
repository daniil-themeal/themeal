import BarChartIconSvg16 from '../svg/bar-chart-16.svg?raw';
import BarChartIconSvg20 from '../svg/bar-chart-20.svg?raw';
import BarChartIconSvg24 from '../svg/bar-chart-24.svg?raw';
import BarChartIconSvg32 from '../svg/bar-chart-32.svg?raw';
import BarChartIconSvg40 from '../svg/bar-chart-40.svg?raw';
import BarChartIconSvg48 from '../svg/bar-chart-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BAR_CHART_ICON_SVG_BY_SIZE = {
  16: BarChartIconSvg16,
  20: BarChartIconSvg20,
  24: BarChartIconSvg24,
  32: BarChartIconSvg32,
  40: BarChartIconSvg40,
  48: BarChartIconSvg48,
} as const;

export function BarChartIcon({ size = 20, className = '' }: IconProps) {
  const svg = BAR_CHART_ICON_SVG_BY_SIZE[size] ?? BarChartIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
