import ShuffleIconSvg16 from '../svg/shuffle-16.svg?raw';
import ShuffleIconSvg20 from '../svg/shuffle-20.svg?raw';
import ShuffleIconSvg24 from '../svg/shuffle-24.svg?raw';
import ShuffleIconSvg32 from '../svg/shuffle-32.svg?raw';
import ShuffleIconSvg40 from '../svg/shuffle-40.svg?raw';
import ShuffleIconSvg48 from '../svg/shuffle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SHUFFLE_ICON_SVG_BY_SIZE = {
  16: ShuffleIconSvg16,
  20: ShuffleIconSvg20,
  24: ShuffleIconSvg24,
  32: ShuffleIconSvg32,
  40: ShuffleIconSvg40,
  48: ShuffleIconSvg48,
} as const;

export function ShuffleIcon({ size = 20, className = '' }: IconProps) {
  const svg = SHUFFLE_ICON_SVG_BY_SIZE[size] ?? ShuffleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
