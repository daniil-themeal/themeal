import EditIconSvg16 from '../svg/edit-16.svg?raw';
import EditIconSvg20 from '../svg/edit-20.svg?raw';
import EditIconSvg24 from '../svg/edit-24.svg?raw';
import EditIconSvg32 from '../svg/edit-32.svg?raw';
import EditIconSvg40 from '../svg/edit-40.svg?raw';
import EditIconSvg48 from '../svg/edit-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const EDIT_ICON_SVG_BY_SIZE = {
  16: EditIconSvg16,
  20: EditIconSvg20,
  24: EditIconSvg24,
  32: EditIconSvg32,
  40: EditIconSvg40,
  48: EditIconSvg48,
} as const;

export function EditIcon({ size = 20, className = '' }: IconProps) {
  const svg = EDIT_ICON_SVG_BY_SIZE[size] ?? EditIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
