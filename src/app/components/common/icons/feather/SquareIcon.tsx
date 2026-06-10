import SquareIconSvg16 from '../svg/square-16.svg?raw';
import SquareIconSvg20 from '../svg/square-20.svg?raw';
import SquareIconSvg24 from '../svg/square-24.svg?raw';
import SquareIconSvg32 from '../svg/square-32.svg?raw';
import SquareIconSvg40 from '../svg/square-40.svg?raw';
import SquareIconSvg48 from '../svg/square-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SQUARE_ICON_SVG_BY_SIZE = {
  16: SquareIconSvg16,
  20: SquareIconSvg20,
  24: SquareIconSvg24,
  32: SquareIconSvg32,
  40: SquareIconSvg40,
  48: SquareIconSvg48,
} as const;

export function SquareIcon({ size = 20, className = '' }: IconProps) {
  const svg = SQUARE_ICON_SVG_BY_SIZE[size] ?? SquareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
