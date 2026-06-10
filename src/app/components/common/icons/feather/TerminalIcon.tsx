import TerminalIconSvg16 from '../svg/terminal-16.svg?raw';
import TerminalIconSvg20 from '../svg/terminal-20.svg?raw';
import TerminalIconSvg24 from '../svg/terminal-24.svg?raw';
import TerminalIconSvg32 from '../svg/terminal-32.svg?raw';
import TerminalIconSvg40 from '../svg/terminal-40.svg?raw';
import TerminalIconSvg48 from '../svg/terminal-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TERMINAL_ICON_SVG_BY_SIZE = {
  16: TerminalIconSvg16,
  20: TerminalIconSvg20,
  24: TerminalIconSvg24,
  32: TerminalIconSvg32,
  40: TerminalIconSvg40,
  48: TerminalIconSvg48,
} as const;

export function TerminalIcon({ size = 20, className = '' }: IconProps) {
  const svg = TERMINAL_ICON_SVG_BY_SIZE[size] ?? TerminalIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
