import GithubIconSvg16 from '../svg/github-16.svg?raw';
import GithubIconSvg20 from '../svg/github-20.svg?raw';
import GithubIconSvg24 from '../svg/github-24.svg?raw';
import GithubIconSvg32 from '../svg/github-32.svg?raw';
import GithubIconSvg40 from '../svg/github-40.svg?raw';
import GithubIconSvg48 from '../svg/github-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GITHUB_ICON_SVG_BY_SIZE = {
  16: GithubIconSvg16,
  20: GithubIconSvg20,
  24: GithubIconSvg24,
  32: GithubIconSvg32,
  40: GithubIconSvg40,
  48: GithubIconSvg48,
} as const;

export function GithubIcon({ size = 20, className = '' }: IconProps) {
  const svg = GITHUB_ICON_SVG_BY_SIZE[size] ?? GithubIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
