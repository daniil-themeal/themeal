import SpeakerIconSvg16 from '../svg/speaker-16.svg?raw';
import SpeakerIconSvg20 from '../svg/speaker-20.svg?raw';
import SpeakerIconSvg24 from '../svg/speaker-24.svg?raw';
import SpeakerIconSvg32 from '../svg/speaker-32.svg?raw';
import SpeakerIconSvg40 from '../svg/speaker-40.svg?raw';
import SpeakerIconSvg48 from '../svg/speaker-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SPEAKER_ICON_SVG_BY_SIZE = {
  16: SpeakerIconSvg16,
  20: SpeakerIconSvg20,
  24: SpeakerIconSvg24,
  32: SpeakerIconSvg32,
  40: SpeakerIconSvg40,
  48: SpeakerIconSvg48,
} as const;

export function SpeakerIcon({ size = 20, className = '' }: IconProps) {
  const svg = SPEAKER_ICON_SVG_BY_SIZE[size] ?? SpeakerIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
