import OctagonIconSvg16 from '../svg/octagon-16.svg?raw';
import OctagonIconSvg20 from '../svg/octagon-20.svg?raw';
import OctagonIconSvg24 from '../svg/octagon-24.svg?raw';
import OctagonIconSvg32 from '../svg/octagon-32.svg?raw';
import OctagonIconSvg40 from '../svg/octagon-40.svg?raw';
import OctagonIconSvg48 from '../svg/octagon-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const OCTAGON_ICON_SVG_BY_SIZE = {
  16: OctagonIconSvg16,
  20: OctagonIconSvg20,
  24: OctagonIconSvg24,
  32: OctagonIconSvg32,
  40: OctagonIconSvg40,
  48: OctagonIconSvg48,
} as const;

export function OctagonIcon({ size = 20, className = '' }: IconProps) {
  const svg = OCTAGON_ICON_SVG_BY_SIZE[size] ?? OctagonIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
