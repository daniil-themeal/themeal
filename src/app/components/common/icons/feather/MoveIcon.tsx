import MoveIconSvg16 from '../svg/move-16.svg?raw';
import MoveIconSvg20 from '../svg/move-20.svg?raw';
import MoveIconSvg24 from '../svg/move-24.svg?raw';
import MoveIconSvg32 from '../svg/move-32.svg?raw';
import MoveIconSvg40 from '../svg/move-40.svg?raw';
import MoveIconSvg48 from '../svg/move-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MOVE_ICON_SVG_BY_SIZE = {
  16: MoveIconSvg16,
  20: MoveIconSvg20,
  24: MoveIconSvg24,
  32: MoveIconSvg32,
  40: MoveIconSvg40,
  48: MoveIconSvg48,
} as const;

export function MoveIcon({ size = 20, className = '' }: IconProps) {
  const svg = MOVE_ICON_SVG_BY_SIZE[size] ?? MoveIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
