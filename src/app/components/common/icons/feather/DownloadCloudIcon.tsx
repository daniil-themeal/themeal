import DownloadCloudIconSvg16 from '../svg/download-cloud-16.svg?raw';
import DownloadCloudIconSvg20 from '../svg/download-cloud-20.svg?raw';
import DownloadCloudIconSvg24 from '../svg/download-cloud-24.svg?raw';
import DownloadCloudIconSvg32 from '../svg/download-cloud-32.svg?raw';
import DownloadCloudIconSvg40 from '../svg/download-cloud-40.svg?raw';
import DownloadCloudIconSvg48 from '../svg/download-cloud-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DOWNLOAD_CLOUD_ICON_SVG_BY_SIZE = {
  16: DownloadCloudIconSvg16,
  20: DownloadCloudIconSvg20,
  24: DownloadCloudIconSvg24,
  32: DownloadCloudIconSvg32,
  40: DownloadCloudIconSvg40,
  48: DownloadCloudIconSvg48,
} as const;

export function DownloadCloudIcon({ size = 20, className = '' }: IconProps) {
  const svg = DOWNLOAD_CLOUD_ICON_SVG_BY_SIZE[size] ?? DownloadCloudIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
