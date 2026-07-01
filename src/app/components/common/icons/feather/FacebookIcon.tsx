import type { CSSProperties } from 'react';

import type { IconProps } from '../iconProps';

const FACEBOOK_ICON_URL = '/main-landing/assets/social/facebook.png';

export function FacebookIcon({ size = 20, className = '' }: IconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    display: 'block',
    flexShrink: 0,
    backgroundColor: 'currentColor',
    WebkitMaskImage: `url(${FACEBOOK_ICON_URL})`,
    maskImage: `url(${FACEBOOK_ICON_URL})`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  };

  return <span className={className} style={style} aria-hidden="true" />;
}
