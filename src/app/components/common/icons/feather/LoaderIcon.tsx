import LoaderIconSvg16 from '../svg/loader-16.svg?raw';
import LoaderIconSvg20 from '../svg/loader-20.svg?raw';
import LoaderIconSvg24 from '../svg/loader-24.svg?raw';
import LoaderIconSvg32 from '../svg/loader-32.svg?raw';
import LoaderIconSvg40 from '../svg/loader-40.svg?raw';
import LoaderIconSvg48 from '../svg/loader-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LOADER_ICON_SVG_BY_SIZE = {
  16: LoaderIconSvg16,
  20: LoaderIconSvg20,
  24: LoaderIconSvg24,
  32: LoaderIconSvg32,
  40: LoaderIconSvg40,
  48: LoaderIconSvg48,
} as const;

export function LoaderIcon({ size = 20, className = '' }: IconProps) {
  const svg = LOADER_ICON_SVG_BY_SIZE[size] ?? LoaderIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
