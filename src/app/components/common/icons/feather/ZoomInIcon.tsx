import ZoomInIconSvg16 from '../svg/zoom-in-16.svg?raw';
import ZoomInIconSvg20 from '../svg/zoom-in-20.svg?raw';
import ZoomInIconSvg24 from '../svg/zoom-in-24.svg?raw';
import ZoomInIconSvg32 from '../svg/zoom-in-32.svg?raw';
import ZoomInIconSvg40 from '../svg/zoom-in-40.svg?raw';
import ZoomInIconSvg48 from '../svg/zoom-in-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ZOOM_IN_ICON_SVG_BY_SIZE = {
  16: ZoomInIconSvg16,
  20: ZoomInIconSvg20,
  24: ZoomInIconSvg24,
  32: ZoomInIconSvg32,
  40: ZoomInIconSvg40,
  48: ZoomInIconSvg48,
} as const;

export function ZoomInIcon({ size = 20, className = '' }: IconProps) {
  const svg = ZOOM_IN_ICON_SVG_BY_SIZE[size] ?? ZoomInIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
