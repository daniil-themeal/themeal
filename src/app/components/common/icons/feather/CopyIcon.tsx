import CopyIconSvg16 from '../svg/copy-16.svg?raw';
import CopyIconSvg20 from '../svg/copy-20.svg?raw';
import CopyIconSvg24 from '../svg/copy-24.svg?raw';
import CopyIconSvg32 from '../svg/copy-32.svg?raw';
import CopyIconSvg40 from '../svg/copy-40.svg?raw';
import CopyIconSvg48 from '../svg/copy-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const COPY_ICON_SVG_BY_SIZE = {
  16: CopyIconSvg16,
  20: CopyIconSvg20,
  24: CopyIconSvg24,
  32: CopyIconSvg32,
  40: CopyIconSvg40,
  48: CopyIconSvg48,
} as const;

export function CopyIcon({ size = 20, className = '' }: IconProps) {
  const svg = COPY_ICON_SVG_BY_SIZE[size] ?? CopyIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
