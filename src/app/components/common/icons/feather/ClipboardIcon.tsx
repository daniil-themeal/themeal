import ClipboardIconSvg16 from '../svg/clipboard-16.svg?raw';
import ClipboardIconSvg20 from '../svg/clipboard-20.svg?raw';
import ClipboardIconSvg24 from '../svg/clipboard-24.svg?raw';
import ClipboardIconSvg32 from '../svg/clipboard-32.svg?raw';
import ClipboardIconSvg40 from '../svg/clipboard-40.svg?raw';
import ClipboardIconSvg48 from '../svg/clipboard-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CLIPBOARD_ICON_SVG_BY_SIZE = {
  16: ClipboardIconSvg16,
  20: ClipboardIconSvg20,
  24: ClipboardIconSvg24,
  32: ClipboardIconSvg32,
  40: ClipboardIconSvg40,
  48: ClipboardIconSvg48,
} as const;

export function ClipboardIcon({ size = 20, className = '' }: IconProps) {
  const svg = CLIPBOARD_ICON_SVG_BY_SIZE[size] ?? ClipboardIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
