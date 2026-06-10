import Edit3IconSvg16 from '../svg/edit-3-16.svg?raw';
import Edit3IconSvg20 from '../svg/edit-3-20.svg?raw';
import Edit3IconSvg24 from '../svg/edit-3-24.svg?raw';
import Edit3IconSvg32 from '../svg/edit-3-32.svg?raw';
import Edit3IconSvg40 from '../svg/edit-3-40.svg?raw';
import Edit3IconSvg48 from '../svg/edit-3-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const EDIT3ICON_SVG_BY_SIZE = {
  16: Edit3IconSvg16,
  20: Edit3IconSvg20,
  24: Edit3IconSvg24,
  32: Edit3IconSvg32,
  40: Edit3IconSvg40,
  48: Edit3IconSvg48,
} as const;

export function Edit3Icon({ size = 20, className = '' }: IconProps) {
  const svg = EDIT3ICON_SVG_BY_SIZE[size] ?? Edit3IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
