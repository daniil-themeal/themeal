import MessageCircleIconSvg16 from '../svg/message-circle-16.svg?raw';
import MessageCircleIconSvg20 from '../svg/message-circle-20.svg?raw';
import MessageCircleIconSvg24 from '../svg/message-circle-24.svg?raw';
import MessageCircleIconSvg32 from '../svg/message-circle-32.svg?raw';
import MessageCircleIconSvg40 from '../svg/message-circle-40.svg?raw';
import MessageCircleIconSvg48 from '../svg/message-circle-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MESSAGE_CIRCLE_ICON_SVG_BY_SIZE = {
  16: MessageCircleIconSvg16,
  20: MessageCircleIconSvg20,
  24: MessageCircleIconSvg24,
  32: MessageCircleIconSvg32,
  40: MessageCircleIconSvg40,
  48: MessageCircleIconSvg48,
} as const;

export function MessageCircleIcon({ size = 20, className = '' }: IconProps) {
  const svg = MESSAGE_CIRCLE_ICON_SVG_BY_SIZE[size] ?? MessageCircleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
