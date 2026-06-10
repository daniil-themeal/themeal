import SlackIconSvg16 from '../svg/slack-16.svg?raw';
import SlackIconSvg20 from '../svg/slack-20.svg?raw';
import SlackIconSvg24 from '../svg/slack-24.svg?raw';
import SlackIconSvg32 from '../svg/slack-32.svg?raw';
import SlackIconSvg40 from '../svg/slack-40.svg?raw';
import SlackIconSvg48 from '../svg/slack-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SLACK_ICON_SVG_BY_SIZE = {
  16: SlackIconSvg16,
  20: SlackIconSvg20,
  24: SlackIconSvg24,
  32: SlackIconSvg32,
  40: SlackIconSvg40,
  48: SlackIconSvg48,
} as const;

export function SlackIcon({ size = 20, className = '' }: IconProps) {
  const svg = SLACK_ICON_SVG_BY_SIZE[size] ?? SlackIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
