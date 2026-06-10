import MessageSquareIconSvg16 from '../svg/message-square-16.svg?raw';
import MessageSquareIconSvg20 from '../svg/message-square-20.svg?raw';
import MessageSquareIconSvg24 from '../svg/message-square-24.svg?raw';
import MessageSquareIconSvg32 from '../svg/message-square-32.svg?raw';
import MessageSquareIconSvg40 from '../svg/message-square-40.svg?raw';
import MessageSquareIconSvg48 from '../svg/message-square-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MESSAGE_SQUARE_ICON_SVG_BY_SIZE = {
  16: MessageSquareIconSvg16,
  20: MessageSquareIconSvg20,
  24: MessageSquareIconSvg24,
  32: MessageSquareIconSvg32,
  40: MessageSquareIconSvg40,
  48: MessageSquareIconSvg48,
} as const;

export function MessageSquareIcon({ size = 20, className = '' }: IconProps) {
  const svg = MESSAGE_SQUARE_ICON_SVG_BY_SIZE[size] ?? MessageSquareIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
