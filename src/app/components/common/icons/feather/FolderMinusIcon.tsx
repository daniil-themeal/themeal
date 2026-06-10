import FolderMinusIconSvg16 from '../svg/folder-minus-16.svg?raw';
import FolderMinusIconSvg20 from '../svg/folder-minus-20.svg?raw';
import FolderMinusIconSvg24 from '../svg/folder-minus-24.svg?raw';
import FolderMinusIconSvg32 from '../svg/folder-minus-32.svg?raw';
import FolderMinusIconSvg40 from '../svg/folder-minus-40.svg?raw';
import FolderMinusIconSvg48 from '../svg/folder-minus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FOLDER_MINUS_ICON_SVG_BY_SIZE = {
  16: FolderMinusIconSvg16,
  20: FolderMinusIconSvg20,
  24: FolderMinusIconSvg24,
  32: FolderMinusIconSvg32,
  40: FolderMinusIconSvg40,
  48: FolderMinusIconSvg48,
} as const;

export function FolderMinusIcon({ size = 20, className = '' }: IconProps) {
  const svg = FOLDER_MINUS_ICON_SVG_BY_SIZE[size] ?? FolderMinusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
