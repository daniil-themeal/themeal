import VideoIconSvg16 from '../svg/video-16.svg?raw';
import VideoIconSvg20 from '../svg/video-20.svg?raw';
import VideoIconSvg24 from '../svg/video-24.svg?raw';
import VideoIconSvg32 from '../svg/video-32.svg?raw';
import VideoIconSvg40 from '../svg/video-40.svg?raw';
import VideoIconSvg48 from '../svg/video-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const VIDEO_ICON_SVG_BY_SIZE = {
  16: VideoIconSvg16,
  20: VideoIconSvg20,
  24: VideoIconSvg24,
  32: VideoIconSvg32,
  40: VideoIconSvg40,
  48: VideoIconSvg48,
} as const;

export function VideoIcon({ size = 20, className = '' }: IconProps) {
  const svg = VIDEO_ICON_SVG_BY_SIZE[size] ?? VideoIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
