import XSquareIconSvg16 from '../svg/x-square-16.svg?raw';
import XSquareIconSvg20 from '../svg/x-square-20.svg?raw';
import XSquareIconSvg24 from '../svg/x-square-24.svg?raw';
import XSquareIconSvg32 from '../svg/x-square-32.svg?raw';
import XSquareIconSvg40 from '../svg/x-square-40.svg?raw';
import XSquareIconSvg48 from '../svg/x-square-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const XSQUARE_ICON_SVG_BY_SIZE = {
  16: XSquareIconSvg16,
  20: XSquareIconSvg20,
  24: XSquareIconSvg24,
  32: XSquareIconSvg32,
  40: XSquareIconSvg40,
  48: XSquareIconSvg48,
} as const;

export function XSquareIcon({ size = 20, className = '' }: IconProps) {
  const svg = XSQUARE_ICON_SVG_BY_SIZE[size] ?? XSquareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
