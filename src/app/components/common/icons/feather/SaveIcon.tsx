import SaveIconSvg16 from '../svg/save-16.svg?raw';
import SaveIconSvg20 from '../svg/save-20.svg?raw';
import SaveIconSvg24 from '../svg/save-24.svg?raw';
import SaveIconSvg32 from '../svg/save-32.svg?raw';
import SaveIconSvg40 from '../svg/save-40.svg?raw';
import SaveIconSvg48 from '../svg/save-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SAVE_ICON_SVG_BY_SIZE = {
  16: SaveIconSvg16,
  20: SaveIconSvg20,
  24: SaveIconSvg24,
  32: SaveIconSvg32,
  40: SaveIconSvg40,
  48: SaveIconSvg48,
} as const;

export function SaveIcon({ size = 20, className = '' }: IconProps) {
  const svg = SAVE_ICON_SVG_BY_SIZE[size] ?? SaveIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
