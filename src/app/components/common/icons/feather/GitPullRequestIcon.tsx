import GitPullRequestIconSvg16 from '../svg/git-pull-request-16.svg?raw';
import GitPullRequestIconSvg20 from '../svg/git-pull-request-20.svg?raw';
import GitPullRequestIconSvg24 from '../svg/git-pull-request-24.svg?raw';
import GitPullRequestIconSvg32 from '../svg/git-pull-request-32.svg?raw';
import GitPullRequestIconSvg40 from '../svg/git-pull-request-40.svg?raw';
import GitPullRequestIconSvg48 from '../svg/git-pull-request-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GIT_PULL_REQUEST_ICON_SVG_BY_SIZE = {
  16: GitPullRequestIconSvg16,
  20: GitPullRequestIconSvg20,
  24: GitPullRequestIconSvg24,
  32: GitPullRequestIconSvg32,
  40: GitPullRequestIconSvg40,
  48: GitPullRequestIconSvg48,
} as const;

export function GitPullRequestIcon({ size = 20, className = '' }: IconProps) {
  const svg = GIT_PULL_REQUEST_ICON_SVG_BY_SIZE[size] ?? GitPullRequestIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
