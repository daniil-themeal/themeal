import ZoomOutIconSvg16 from '../svg/zoom-out-16.svg?raw';
import ZoomOutIconSvg20 from '../svg/zoom-out-20.svg?raw';
import ZoomOutIconSvg24 from '../svg/zoom-out-24.svg?raw';
import ZoomOutIconSvg32 from '../svg/zoom-out-32.svg?raw';
import ZoomOutIconSvg40 from '../svg/zoom-out-40.svg?raw';
import ZoomOutIconSvg48 from '../svg/zoom-out-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ZOOM_OUT_ICON_SVG_BY_SIZE = {
  16: ZoomOutIconSvg16,
  20: ZoomOutIconSvg20,
  24: ZoomOutIconSvg24,
  32: ZoomOutIconSvg32,
  40: ZoomOutIconSvg40,
  48: ZoomOutIconSvg48,
} as const;

export function ZoomOutIcon({ size = 20, className = '' }: IconProps) {
  const svg = ZOOM_OUT_ICON_SVG_BY_SIZE[size] ?? ZoomOutIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
