import AlertTriangleIconSvg16 from '../svg/alert-triangle-16.svg?raw';
import AlertTriangleIconSvg20 from '../svg/alert-triangle-20.svg?raw';
import AlertTriangleIconSvg24 from '../svg/alert-triangle-24.svg?raw';
import AlertTriangleIconSvg32 from '../svg/alert-triangle-32.svg?raw';
import AlertTriangleIconSvg40 from '../svg/alert-triangle-40.svg?raw';
import AlertTriangleIconSvg48 from '../svg/alert-triangle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ALERT_TRIANGLE_ICON_SVG_BY_SIZE = {
  16: AlertTriangleIconSvg16,
  20: AlertTriangleIconSvg20,
  24: AlertTriangleIconSvg24,
  32: AlertTriangleIconSvg32,
  40: AlertTriangleIconSvg40,
  48: AlertTriangleIconSvg48,
} as const;

export function AlertTriangleIcon({ size = 20, className = '' }: IconProps) {
  const svg = ALERT_TRIANGLE_ICON_SVG_BY_SIZE[size] ?? AlertTriangleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
