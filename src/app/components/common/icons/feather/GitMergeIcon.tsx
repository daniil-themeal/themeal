import GitMergeIconSvg16 from '../svg/git-merge-16.svg?raw';
import GitMergeIconSvg20 from '../svg/git-merge-20.svg?raw';
import GitMergeIconSvg24 from '../svg/git-merge-24.svg?raw';
import GitMergeIconSvg32 from '../svg/git-merge-32.svg?raw';
import GitMergeIconSvg40 from '../svg/git-merge-40.svg?raw';
import GitMergeIconSvg48 from '../svg/git-merge-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const GIT_MERGE_ICON_SVG_BY_SIZE = {
  16: GitMergeIconSvg16,
  20: GitMergeIconSvg20,
  24: GitMergeIconSvg24,
  32: GitMergeIconSvg32,
  40: GitMergeIconSvg40,
  48: GitMergeIconSvg48,
} as const;

export function GitMergeIcon({ size = 20, className = '' }: IconProps) {
  const svg = GIT_MERGE_ICON_SVG_BY_SIZE[size] ?? GitMergeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
