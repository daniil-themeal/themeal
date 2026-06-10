import CodesandboxIconSvg16 from '../svg/codesandbox-16.svg?raw';
import CodesandboxIconSvg20 from '../svg/codesandbox-20.svg?raw';
import CodesandboxIconSvg24 from '../svg/codesandbox-24.svg?raw';
import CodesandboxIconSvg32 from '../svg/codesandbox-32.svg?raw';
import CodesandboxIconSvg40 from '../svg/codesandbox-40.svg?raw';
import CodesandboxIconSvg48 from '../svg/codesandbox-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CODESANDBOX_ICON_SVG_BY_SIZE = {
  16: CodesandboxIconSvg16,
  20: CodesandboxIconSvg20,
  24: CodesandboxIconSvg24,
  32: CodesandboxIconSvg32,
  40: CodesandboxIconSvg40,
  48: CodesandboxIconSvg48,
} as const;

export function CodesandboxIcon({ size = 20, className = '' }: IconProps) {
  const svg = CODESANDBOX_ICON_SVG_BY_SIZE[size] ?? CodesandboxIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
