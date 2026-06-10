import GitBranchIconSvg16 from '../svg/git-branch-16.svg?raw';
import GitBranchIconSvg20 from '../svg/git-branch-20.svg?raw';
import GitBranchIconSvg24 from '../svg/git-branch-24.svg?raw';
import GitBranchIconSvg32 from '../svg/git-branch-32.svg?raw';
import GitBranchIconSvg40 from '../svg/git-branch-40.svg?raw';
import GitBranchIconSvg48 from '../svg/git-branch-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GIT_BRANCH_ICON_SVG_BY_SIZE = {
  16: GitBranchIconSvg16,
  20: GitBranchIconSvg20,
  24: GitBranchIconSvg24,
  32: GitBranchIconSvg32,
  40: GitBranchIconSvg40,
  48: GitBranchIconSvg48,
} as const;

export function GitBranchIcon({ size = 20, className = '' }: IconProps) {
  const svg = GIT_BRANCH_ICON_SVG_BY_SIZE[size] ?? GitBranchIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
