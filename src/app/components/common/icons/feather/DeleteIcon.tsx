import DeleteIconSvg16 from '../svg/delete-16.svg?raw';
import DeleteIconSvg20 from '../svg/delete-20.svg?raw';
import DeleteIconSvg24 from '../svg/delete-24.svg?raw';
import DeleteIconSvg32 from '../svg/delete-32.svg?raw';
import DeleteIconSvg40 from '../svg/delete-40.svg?raw';
import DeleteIconSvg48 from '../svg/delete-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DELETE_ICON_SVG_BY_SIZE = {
  16: DeleteIconSvg16,
  20: DeleteIconSvg20,
  24: DeleteIconSvg24,
  32: DeleteIconSvg32,
  40: DeleteIconSvg40,
  48: DeleteIconSvg48,
} as const;

export function DeleteIcon({ size = 20, className = '' }: IconProps) {
  const svg = DELETE_ICON_SVG_BY_SIZE[size] ?? DeleteIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
