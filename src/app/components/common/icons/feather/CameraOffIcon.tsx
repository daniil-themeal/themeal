import CameraOffIconSvg16 from '../svg/camera-off-16.svg?raw';
import CameraOffIconSvg20 from '../svg/camera-off-20.svg?raw';
import CameraOffIconSvg24 from '../svg/camera-off-24.svg?raw';
import CameraOffIconSvg32 from '../svg/camera-off-32.svg?raw';
import CameraOffIconSvg40 from '../svg/camera-off-40.svg?raw';
import CameraOffIconSvg48 from '../svg/camera-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CAMERA_OFF_ICON_SVG_BY_SIZE = {
  16: CameraOffIconSvg16,
  20: CameraOffIconSvg20,
  24: CameraOffIconSvg24,
  32: CameraOffIconSvg32,
  40: CameraOffIconSvg40,
  48: CameraOffIconSvg48,
} as const;

export function CameraOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = CAMERA_OFF_ICON_SVG_BY_SIZE[size] ?? CameraOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
