import CommandIconSvg16 from '../svg/command-16.svg?raw';
import CommandIconSvg20 from '../svg/command-20.svg?raw';
import CommandIconSvg24 from '../svg/command-24.svg?raw';
import CommandIconSvg32 from '../svg/command-32.svg?raw';
import CommandIconSvg40 from '../svg/command-40.svg?raw';
import CommandIconSvg48 from '../svg/command-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const COMMAND_ICON_SVG_BY_SIZE = {
  16: CommandIconSvg16,
  20: CommandIconSvg20,
  24: CommandIconSvg24,
  32: CommandIconSvg32,
  40: CommandIconSvg40,
  48: CommandIconSvg48,
} as const;

export function CommandIcon({ size = 20, className = '' }: IconProps) {
  const svg = COMMAND_ICON_SVG_BY_SIZE[size] ?? CommandIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
