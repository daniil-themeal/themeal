import FolderIconSvg16 from '../svg/folder-16.svg?raw';
import FolderIconSvg20 from '../svg/folder-20.svg?raw';
import FolderIconSvg24 from '../svg/folder-24.svg?raw';
import FolderIconSvg32 from '../svg/folder-32.svg?raw';
import FolderIconSvg40 from '../svg/folder-40.svg?raw';
import FolderIconSvg48 from '../svg/folder-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FOLDER_ICON_SVG_BY_SIZE = {
  16: FolderIconSvg16,
  20: FolderIconSvg20,
  24: FolderIconSvg24,
  32: FolderIconSvg32,
  40: FolderIconSvg40,
  48: FolderIconSvg48,
} as const;

export function FolderIcon({ size = 20, className = '' }: IconProps) {
  const svg = FOLDER_ICON_SVG_BY_SIZE[size] ?? FolderIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
