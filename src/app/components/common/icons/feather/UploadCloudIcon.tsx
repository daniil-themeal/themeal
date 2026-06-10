import UploadCloudIconSvg16 from '../svg/upload-cloud-16.svg?raw';
import UploadCloudIconSvg20 from '../svg/upload-cloud-20.svg?raw';
import UploadCloudIconSvg24 from '../svg/upload-cloud-24.svg?raw';
import UploadCloudIconSvg32 from '../svg/upload-cloud-32.svg?raw';
import UploadCloudIconSvg40 from '../svg/upload-cloud-40.svg?raw';
import UploadCloudIconSvg48 from '../svg/upload-cloud-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const UPLOAD_CLOUD_ICON_SVG_BY_SIZE = {
  16: UploadCloudIconSvg16,
  20: UploadCloudIconSvg20,
  24: UploadCloudIconSvg24,
  32: UploadCloudIconSvg32,
  40: UploadCloudIconSvg40,
  48: UploadCloudIconSvg48,
} as const;

export function UploadCloudIcon({ size = 20, className = '' }: IconProps) {
  const svg = UPLOAD_CLOUD_ICON_SVG_BY_SIZE[size] ?? UploadCloudIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
