import FolderPlusIconSvg16 from '../svg/folder-plus-16.svg?raw';
import FolderPlusIconSvg20 from '../svg/folder-plus-20.svg?raw';
import FolderPlusIconSvg24 from '../svg/folder-plus-24.svg?raw';
import FolderPlusIconSvg32 from '../svg/folder-plus-32.svg?raw';
import FolderPlusIconSvg40 from '../svg/folder-plus-40.svg?raw';
import FolderPlusIconSvg48 from '../svg/folder-plus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FOLDER_PLUS_ICON_SVG_BY_SIZE = {
  16: FolderPlusIconSvg16,
  20: FolderPlusIconSvg20,
  24: FolderPlusIconSvg24,
  32: FolderPlusIconSvg32,
  40: FolderPlusIconSvg40,
  48: FolderPlusIconSvg48,
} as const;

export function FolderPlusIcon({ size = 20, className = '' }: IconProps) {
  const svg = FOLDER_PLUS_ICON_SVG_BY_SIZE[size] ?? FolderPlusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
