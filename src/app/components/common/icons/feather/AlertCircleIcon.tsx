import AlertCircleIconSvg16 from '../svg/alert-circle-16.svg?raw';
import AlertCircleIconSvg20 from '../svg/alert-circle-20.svg?raw';
import AlertCircleIconSvg24 from '../svg/alert-circle-24.svg?raw';
import AlertCircleIconSvg32 from '../svg/alert-circle-32.svg?raw';
import AlertCircleIconSvg40 from '../svg/alert-circle-40.svg?raw';
import AlertCircleIconSvg48 from '../svg/alert-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ALERT_CIRCLE_ICON_SVG_BY_SIZE = {
  16: AlertCircleIconSvg16,
  20: AlertCircleIconSvg20,
  24: AlertCircleIconSvg24,
  32: AlertCircleIconSvg32,
  40: AlertCircleIconSvg40,
  48: AlertCircleIconSvg48,
} as const;

export function AlertCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = ALERT_CIRCLE_ICON_SVG_BY_SIZE[size] ?? AlertCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
