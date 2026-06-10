import AlertOctagonIconSvg16 from '../svg/alert-octagon-16.svg?raw';
import AlertOctagonIconSvg20 from '../svg/alert-octagon-20.svg?raw';
import AlertOctagonIconSvg24 from '../svg/alert-octagon-24.svg?raw';
import AlertOctagonIconSvg32 from '../svg/alert-octagon-32.svg?raw';
import AlertOctagonIconSvg40 from '../svg/alert-octagon-40.svg?raw';
import AlertOctagonIconSvg48 from '../svg/alert-octagon-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ALERT_OCTAGON_ICON_SVG_BY_SIZE = {
  16: AlertOctagonIconSvg16,
  20: AlertOctagonIconSvg20,
  24: AlertOctagonIconSvg24,
  32: AlertOctagonIconSvg32,
  40: AlertOctagonIconSvg40,
  48: AlertOctagonIconSvg48,
} as const;

export function AlertOctagonIcon({ size = 20, className = '' }: IconProps) {
  const svg = ALERT_OCTAGON_ICON_SVG_BY_SIZE[size] ?? AlertOctagonIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
