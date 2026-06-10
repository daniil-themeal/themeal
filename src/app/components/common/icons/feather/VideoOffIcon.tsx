import VideoOffIconSvg16 from '../svg/video-off-16.svg?raw';
import VideoOffIconSvg20 from '../svg/video-off-20.svg?raw';
import VideoOffIconSvg24 from '../svg/video-off-24.svg?raw';
import VideoOffIconSvg32 from '../svg/video-off-32.svg?raw';
import VideoOffIconSvg40 from '../svg/video-off-40.svg?raw';
import VideoOffIconSvg48 from '../svg/video-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const VIDEO_OFF_ICON_SVG_BY_SIZE = {
  16: VideoOffIconSvg16,
  20: VideoOffIconSvg20,
  24: VideoOffIconSvg24,
  32: VideoOffIconSvg32,
  40: VideoOffIconSvg40,
  48: VideoOffIconSvg48,
} as const;

export function VideoOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = VIDEO_OFF_ICON_SVG_BY_SIZE[size] ?? VideoOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
