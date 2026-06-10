import ServerIconSvg16 from '../svg/server-16.svg?raw';
import ServerIconSvg20 from '../svg/server-20.svg?raw';
import ServerIconSvg24 from '../svg/server-24.svg?raw';
import ServerIconSvg32 from '../svg/server-32.svg?raw';
import ServerIconSvg40 from '../svg/server-40.svg?raw';
import ServerIconSvg48 from '../svg/server-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SERVER_ICON_SVG_BY_SIZE = {
  16: ServerIconSvg16,
  20: ServerIconSvg20,
  24: ServerIconSvg24,
  32: ServerIconSvg32,
  40: ServerIconSvg40,
  48: ServerIconSvg48,
} as const;

export function ServerIcon({ size = 20, className = '' }: IconProps) {
  const svg = SERVER_ICON_SVG_BY_SIZE[size] ?? ServerIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
