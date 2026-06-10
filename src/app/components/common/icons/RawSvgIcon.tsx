import type { IconSize } from './iconSize';
import { iconSizeClassName } from './iconSize';

type RawSvgIconProps = {
  svg: string;
  size?: IconSize;
  className?: string;
};

export function RawSvgIcon({ svg, size = 20, className = '' }: RawSvgIconProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        iconSizeClassName[size],
        'flex shrink-0 [&>svg]:size-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
