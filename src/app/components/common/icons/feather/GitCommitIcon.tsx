import GitCommitIconSvg16 from '../svg/git-commit-16.svg?raw';
import GitCommitIconSvg20 from '../svg/git-commit-20.svg?raw';
import GitCommitIconSvg24 from '../svg/git-commit-24.svg?raw';
import GitCommitIconSvg32 from '../svg/git-commit-32.svg?raw';
import GitCommitIconSvg40 from '../svg/git-commit-40.svg?raw';
import GitCommitIconSvg48 from '../svg/git-commit-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GIT_COMMIT_ICON_SVG_BY_SIZE = {
  16: GitCommitIconSvg16,
  20: GitCommitIconSvg20,
  24: GitCommitIconSvg24,
  32: GitCommitIconSvg32,
  40: GitCommitIconSvg40,
  48: GitCommitIconSvg48,
} as const;

export function GitCommitIcon({ size = 20, className = '' }: IconProps) {
  const svg = GIT_COMMIT_ICON_SVG_BY_SIZE[size] ?? GitCommitIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
