import PieChartIconSvg16 from '../svg/pie-chart-16.svg?raw';
import PieChartIconSvg20 from '../svg/pie-chart-20.svg?raw';
import PieChartIconSvg24 from '../svg/pie-chart-24.svg?raw';
import PieChartIconSvg32 from '../svg/pie-chart-32.svg?raw';
import PieChartIconSvg40 from '../svg/pie-chart-40.svg?raw';
import PieChartIconSvg48 from '../svg/pie-chart-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PIE_CHART_ICON_SVG_BY_SIZE = {
  16: PieChartIconSvg16,
  20: PieChartIconSvg20,
  24: PieChartIconSvg24,
  32: PieChartIconSvg32,
  40: PieChartIconSvg40,
  48: PieChartIconSvg48,
} as const;

export function PieChartIcon({ size = 20, className = '' }: IconProps) {
  const svg = PIE_CHART_ICON_SVG_BY_SIZE[size] ?? PieChartIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
