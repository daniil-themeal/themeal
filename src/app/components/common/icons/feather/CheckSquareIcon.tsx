import CheckSquareIconSvg16 from '../svg/check-square-16.svg?raw';
import CheckSquareIconSvg20 from '../svg/check-square-20.svg?raw';
import CheckSquareIconSvg24 from '../svg/check-square-24.svg?raw';
import CheckSquareIconSvg32 from '../svg/check-square-32.svg?raw';
import CheckSquareIconSvg40 from '../svg/check-square-40.svg?raw';
import CheckSquareIconSvg48 from '../svg/check-square-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHECK_SQUARE_ICON_SVG_BY_SIZE = {
  16: CheckSquareIconSvg16,
  20: CheckSquareIconSvg20,
  24: CheckSquareIconSvg24,
  32: CheckSquareIconSvg32,
  40: CheckSquareIconSvg40,
  48: CheckSquareIconSvg48,
} as const;

export function CheckSquareIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHECK_SQUARE_ICON_SVG_BY_SIZE[size] ?? CheckSquareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
