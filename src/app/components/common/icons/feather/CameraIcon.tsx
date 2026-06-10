import CameraIconSvg16 from '../svg/camera-16.svg?raw';
import CameraIconSvg20 from '../svg/camera-20.svg?raw';
import CameraIconSvg24 from '../svg/camera-24.svg?raw';
import CameraIconSvg32 from '../svg/camera-32.svg?raw';
import CameraIconSvg40 from '../svg/camera-40.svg?raw';
import CameraIconSvg48 from '../svg/camera-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CAMERA_ICON_SVG_BY_SIZE = {
  16: CameraIconSvg16,
  20: CameraIconSvg20,
  24: CameraIconSvg24,
  32: CameraIconSvg32,
  40: CameraIconSvg40,
  48: CameraIconSvg48,
} as const;

export function CameraIcon({ size = 20, className = '' }: IconProps) {
  const svg = CAMERA_ICON_SVG_BY_SIZE[size] ?? CameraIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
