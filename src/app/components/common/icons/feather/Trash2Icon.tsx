import Trash2IconSvg16 from '../svg/trash-2-16.svg?raw';
import Trash2IconSvg20 from '../svg/trash-2-20.svg?raw';
import Trash2IconSvg24 from '../svg/trash-2-24.svg?raw';
import Trash2IconSvg32 from '../svg/trash-2-32.svg?raw';
import Trash2IconSvg40 from '../svg/trash-2-40.svg?raw';
import Trash2IconSvg48 from '../svg/trash-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TRASH2ICON_SVG_BY_SIZE = {
  16: Trash2IconSvg16,
  20: Trash2IconSvg20,
  24: Trash2IconSvg24,
  32: Trash2IconSvg32,
  40: Trash2IconSvg40,
  48: Trash2IconSvg48,
} as const;

export function Trash2Icon({ size = 20, className = '' }: IconProps) {
  const svg = TRASH2ICON_SVG_BY_SIZE[size] ?? Trash2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
