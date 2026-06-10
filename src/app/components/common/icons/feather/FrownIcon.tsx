import FrownIconSvg16 from '../svg/frown-16.svg?raw';
import FrownIconSvg20 from '../svg/frown-20.svg?raw';
import FrownIconSvg24 from '../svg/frown-24.svg?raw';
import FrownIconSvg32 from '../svg/frown-32.svg?raw';
import FrownIconSvg40 from '../svg/frown-40.svg?raw';
import FrownIconSvg48 from '../svg/frown-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FROWN_ICON_SVG_BY_SIZE = {
  16: FrownIconSvg16,
  20: FrownIconSvg20,
  24: FrownIconSvg24,
  32: FrownIconSvg32,
  40: FrownIconSvg40,
  48: FrownIconSvg48,
} as const;

export function FrownIcon({ size = 20, className = '' }: IconProps) {
  const svg = FROWN_ICON_SVG_BY_SIZE[size] ?? FrownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
