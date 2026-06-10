import XCircleIconSvg16 from '../svg/x-circle-16.svg?raw';
import XCircleIconSvg20 from '../svg/x-circle-20.svg?raw';
import XCircleIconSvg24 from '../svg/x-circle-24.svg?raw';
import XCircleIconSvg32 from '../svg/x-circle-32.svg?raw';
import XCircleIconSvg40 from '../svg/x-circle-40.svg?raw';
import XCircleIconSvg48 from '../svg/x-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const XCIRCLE_ICON_SVG_BY_SIZE = {
  16: XCircleIconSvg16,
  20: XCircleIconSvg20,
  24: XCircleIconSvg24,
  32: XCircleIconSvg32,
  40: XCircleIconSvg40,
  48: XCircleIconSvg48,
} as const;

export function XCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = XCIRCLE_ICON_SVG_BY_SIZE[size] ?? XCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
