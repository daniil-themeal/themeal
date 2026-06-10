import GitlabIconSvg16 from '../svg/gitlab-16.svg?raw';
import GitlabIconSvg20 from '../svg/gitlab-20.svg?raw';
import GitlabIconSvg24 from '../svg/gitlab-24.svg?raw';
import GitlabIconSvg32 from '../svg/gitlab-32.svg?raw';
import GitlabIconSvg40 from '../svg/gitlab-40.svg?raw';
import GitlabIconSvg48 from '../svg/gitlab-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GITLAB_ICON_SVG_BY_SIZE = {
  16: GitlabIconSvg16,
  20: GitlabIconSvg20,
  24: GitlabIconSvg24,
  32: GitlabIconSvg32,
  40: GitlabIconSvg40,
  48: GitlabIconSvg48,
} as const;

export function GitlabIcon({ size = 20, className = '' }: IconProps) {
  const svg = GITLAB_ICON_SVG_BY_SIZE[size] ?? GitlabIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
