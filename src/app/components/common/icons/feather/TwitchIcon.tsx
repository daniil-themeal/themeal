import TwitchIconSvg16 from '../svg/twitch-16.svg?raw';
import TwitchIconSvg20 from '../svg/twitch-20.svg?raw';
import TwitchIconSvg24 from '../svg/twitch-24.svg?raw';
import TwitchIconSvg32 from '../svg/twitch-32.svg?raw';
import TwitchIconSvg40 from '../svg/twitch-40.svg?raw';
import TwitchIconSvg48 from '../svg/twitch-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TWITCH_ICON_SVG_BY_SIZE = {
  16: TwitchIconSvg16,
  20: TwitchIconSvg20,
  24: TwitchIconSvg24,
  32: TwitchIconSvg32,
  40: TwitchIconSvg40,
  48: TwitchIconSvg48,
} as const;

export function TwitchIcon({ size = 20, className = '' }: IconProps) {
  const svg = TWITCH_ICON_SVG_BY_SIZE[size] ?? TwitchIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
