import InboxIconSvg16 from '../svg/inbox-16.svg?raw';
import InboxIconSvg20 from '../svg/inbox-20.svg?raw';
import InboxIconSvg24 from '../svg/inbox-24.svg?raw';
import InboxIconSvg32 from '../svg/inbox-32.svg?raw';
import InboxIconSvg40 from '../svg/inbox-40.svg?raw';
import InboxIconSvg48 from '../svg/inbox-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const INBOX_ICON_SVG_BY_SIZE = {
  16: InboxIconSvg16,
  20: InboxIconSvg20,
  24: InboxIconSvg24,
  32: InboxIconSvg32,
  40: InboxIconSvg40,
  48: InboxIconSvg48,
} as const;

export function InboxIcon({ size = 20, className = '' }: IconProps) {
  const svg = INBOX_ICON_SVG_BY_SIZE[size] ?? InboxIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
