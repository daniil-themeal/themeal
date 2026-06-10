import TriangleIconSvg16 from '../svg/triangle-16.svg?raw';
import TriangleIconSvg20 from '../svg/triangle-20.svg?raw';
import TriangleIconSvg24 from '../svg/triangle-24.svg?raw';
import TriangleIconSvg32 from '../svg/triangle-32.svg?raw';
import TriangleIconSvg40 from '../svg/triangle-40.svg?raw';
import TriangleIconSvg48 from '../svg/triangle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TRIANGLE_ICON_SVG_BY_SIZE = {
  16: TriangleIconSvg16,
  20: TriangleIconSvg20,
  24: TriangleIconSvg24,
  32: TriangleIconSvg32,
  40: TriangleIconSvg40,
  48: TriangleIconSvg48,
} as const;

export function TriangleIcon({ size = 20, className = '' }: IconProps) {
  const svg = TRIANGLE_ICON_SVG_BY_SIZE[size] ?? TriangleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
