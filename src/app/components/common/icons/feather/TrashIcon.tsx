import TrashIconSvg16 from '../svg/trash-16.svg?raw';
import TrashIconSvg20 from '../svg/trash-20.svg?raw';
import TrashIconSvg24 from '../svg/trash-24.svg?raw';
import TrashIconSvg32 from '../svg/trash-32.svg?raw';
import TrashIconSvg40 from '../svg/trash-40.svg?raw';
import TrashIconSvg48 from '../svg/trash-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TRASH_ICON_SVG_BY_SIZE = {
  16: TrashIconSvg16,
  20: TrashIconSvg20,
  24: TrashIconSvg24,
  32: TrashIconSvg32,
  40: TrashIconSvg40,
  48: TrashIconSvg48,
} as const;

export function TrashIcon({ size = 20, className = '' }: IconProps) {
  const svg = TRASH_ICON_SVG_BY_SIZE[size] ?? TrashIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
