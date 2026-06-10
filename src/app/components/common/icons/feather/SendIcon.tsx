import SendIconSvg16 from '../svg/send-16.svg?raw';
import SendIconSvg20 from '../svg/send-20.svg?raw';
import SendIconSvg24 from '../svg/send-24.svg?raw';
import SendIconSvg32 from '../svg/send-32.svg?raw';
import SendIconSvg40 from '../svg/send-40.svg?raw';
import SendIconSvg48 from '../svg/send-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SEND_ICON_SVG_BY_SIZE = {
  16: SendIconSvg16,
  20: SendIconSvg20,
  24: SendIconSvg24,
  32: SendIconSvg32,
  40: SendIconSvg40,
  48: SendIconSvg48,
} as const;

export function SendIcon({ size = 20, className = '' }: IconProps) {
  const svg = SEND_ICON_SVG_BY_SIZE[size] ?? SendIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
