import SlashIconSvg16 from '../svg/slash-16.svg?raw';
import SlashIconSvg20 from '../svg/slash-20.svg?raw';
import SlashIconSvg24 from '../svg/slash-24.svg?raw';
import SlashIconSvg32 from '../svg/slash-32.svg?raw';
import SlashIconSvg40 from '../svg/slash-40.svg?raw';
import SlashIconSvg48 from '../svg/slash-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SLASH_ICON_SVG_BY_SIZE = {
  16: SlashIconSvg16,
  20: SlashIconSvg20,
  24: SlashIconSvg24,
  32: SlashIconSvg32,
  40: SlashIconSvg40,
  48: SlashIconSvg48,
} as const;

export function SlashIcon({ size = 20, className = '' }: IconProps) {
  const svg = SLASH_ICON_SVG_BY_SIZE[size] ?? SlashIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
