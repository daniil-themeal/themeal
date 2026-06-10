import MousePointerIconSvg16 from '../svg/mouse-pointer-16.svg?raw';
import MousePointerIconSvg20 from '../svg/mouse-pointer-20.svg?raw';
import MousePointerIconSvg24 from '../svg/mouse-pointer-24.svg?raw';
import MousePointerIconSvg32 from '../svg/mouse-pointer-32.svg?raw';
import MousePointerIconSvg40 from '../svg/mouse-pointer-40.svg?raw';
import MousePointerIconSvg48 from '../svg/mouse-pointer-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MOUSE_POINTER_ICON_SVG_BY_SIZE = {
  16: MousePointerIconSvg16,
  20: MousePointerIconSvg20,
  24: MousePointerIconSvg24,
  32: MousePointerIconSvg32,
  40: MousePointerIconSvg40,
  48: MousePointerIconSvg48,
} as const;

export function MousePointerIcon({ size = 20, className = '' }: IconProps) {
  const svg = MOUSE_POINTER_ICON_SVG_BY_SIZE[size] ?? MousePointerIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
