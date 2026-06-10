import HexagonIconSvg16 from '../svg/hexagon-16.svg?raw';
import HexagonIconSvg20 from '../svg/hexagon-20.svg?raw';
import HexagonIconSvg24 from '../svg/hexagon-24.svg?raw';
import HexagonIconSvg32 from '../svg/hexagon-32.svg?raw';
import HexagonIconSvg40 from '../svg/hexagon-40.svg?raw';
import HexagonIconSvg48 from '../svg/hexagon-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const HEXAGON_ICON_SVG_BY_SIZE = {
  16: HexagonIconSvg16,
  20: HexagonIconSvg20,
  24: HexagonIconSvg24,
  32: HexagonIconSvg32,
  40: HexagonIconSvg40,
  48: HexagonIconSvg48,
} as const;

export function HexagonIcon({ size = 20, className = '' }: IconProps) {
  const svg = HEXAGON_ICON_SVG_BY_SIZE[size] ?? HexagonIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
