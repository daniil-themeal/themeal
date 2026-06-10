import PaperclipIconSvg16 from '../svg/paperclip-16.svg?raw';
import PaperclipIconSvg20 from '../svg/paperclip-20.svg?raw';
import PaperclipIconSvg24 from '../svg/paperclip-24.svg?raw';
import PaperclipIconSvg32 from '../svg/paperclip-32.svg?raw';
import PaperclipIconSvg40 from '../svg/paperclip-40.svg?raw';
import PaperclipIconSvg48 from '../svg/paperclip-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PAPERCLIP_ICON_SVG_BY_SIZE = {
  16: PaperclipIconSvg16,
  20: PaperclipIconSvg20,
  24: PaperclipIconSvg24,
  32: PaperclipIconSvg32,
  40: PaperclipIconSvg40,
  48: PaperclipIconSvg48,
} as const;

export function PaperclipIcon({ size = 20, className = '' }: IconProps) {
  const svg = PAPERCLIP_ICON_SVG_BY_SIZE[size] ?? PaperclipIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
