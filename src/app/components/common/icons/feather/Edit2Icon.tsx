import Edit2IconSvg16 from '../svg/edit-2-16.svg?raw';
import Edit2IconSvg20 from '../svg/edit-2-20.svg?raw';
import Edit2IconSvg24 from '../svg/edit-2-24.svg?raw';
import Edit2IconSvg32 from '../svg/edit-2-32.svg?raw';
import Edit2IconSvg40 from '../svg/edit-2-40.svg?raw';
import Edit2IconSvg48 from '../svg/edit-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const EDIT2ICON_SVG_BY_SIZE = {
  16: Edit2IconSvg16,
  20: Edit2IconSvg20,
  24: Edit2IconSvg24,
  32: Edit2IconSvg32,
  40: Edit2IconSvg40,
  48: Edit2IconSvg48,
} as const;

export function Edit2Icon({ size = 20, className = '' }: IconProps) {
  const svg = EDIT2ICON_SVG_BY_SIZE[size] ?? Edit2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
