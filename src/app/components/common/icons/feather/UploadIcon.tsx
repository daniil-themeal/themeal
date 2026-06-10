import UploadIconSvg16 from '../svg/upload-16.svg?raw';
import UploadIconSvg20 from '../svg/upload-20.svg?raw';
import UploadIconSvg24 from '../svg/upload-24.svg?raw';
import UploadIconSvg32 from '../svg/upload-32.svg?raw';
import UploadIconSvg40 from '../svg/upload-40.svg?raw';
import UploadIconSvg48 from '../svg/upload-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const UPLOAD_ICON_SVG_BY_SIZE = {
  16: UploadIconSvg16,
  20: UploadIconSvg20,
  24: UploadIconSvg24,
  32: UploadIconSvg32,
  40: UploadIconSvg40,
  48: UploadIconSvg48,
} as const;

export function UploadIcon({ size = 20, className = '' }: IconProps) {
  const svg = UPLOAD_ICON_SVG_BY_SIZE[size] ?? UploadIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
