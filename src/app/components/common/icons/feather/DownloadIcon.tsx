import DownloadIconSvg16 from '../svg/download-16.svg?raw';
import DownloadIconSvg20 from '../svg/download-20.svg?raw';
import DownloadIconSvg24 from '../svg/download-24.svg?raw';
import DownloadIconSvg32 from '../svg/download-32.svg?raw';
import DownloadIconSvg40 from '../svg/download-40.svg?raw';
import DownloadIconSvg48 from '../svg/download-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DOWNLOAD_ICON_SVG_BY_SIZE = {
  16: DownloadIconSvg16,
  20: DownloadIconSvg20,
  24: DownloadIconSvg24,
  32: DownloadIconSvg32,
  40: DownloadIconSvg40,
  48: DownloadIconSvg48,
} as const;

export function DownloadIcon({ size = 20, className = '' }: IconProps) {
  const svg = DOWNLOAD_ICON_SVG_BY_SIZE[size] ?? DownloadIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
