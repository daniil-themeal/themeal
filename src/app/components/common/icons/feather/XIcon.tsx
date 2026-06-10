import XIconSvg16 from '../svg/x-16.svg?raw';
import XIconSvg20 from '../svg/x-20.svg?raw';
import XIconSvg24 from '../svg/x-24.svg?raw';
import XIconSvg32 from '../svg/x-32.svg?raw';
import XIconSvg40 from '../svg/x-40.svg?raw';
import XIconSvg48 from '../svg/x-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const XICON_SVG_BY_SIZE = {
  16: XIconSvg16,
  20: XIconSvg20,
  24: XIconSvg24,
  32: XIconSvg32,
  40: XIconSvg40,
  48: XIconSvg48,
} as const;

export function XIcon({ size = 20, className = '' }: IconProps) {
  const svg = XICON_SVG_BY_SIZE[size] ?? XIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
