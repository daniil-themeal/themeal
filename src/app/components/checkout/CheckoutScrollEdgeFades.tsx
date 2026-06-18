import { COLOR_TOKENS } from '../common/colorTokens';

import {
  CHECKOUT_SCROLL_EDGE_FADE_END_POSITION_CLASS_NAME,
  CHECKOUT_SCROLL_EDGE_FADE_START_POSITION_CLASS_NAME,
} from './checkoutStepPageLayoutTokens';

type CheckoutScrollEdgeFadesProps = {
  showStart: boolean;
  showEnd: boolean;
  edgeColor?: string;
  className?: string;
  fadeWidthClassName?: string;
  startPositionClassName?: string;
  endPositionClassName?: string;
};

const defaultFadeWidthClassName =
  'w-[length:var(--checkout-scroll-edge-fade-width)]';

export function CheckoutScrollEdgeFades({
  showStart,
  showEnd,
  edgeColor = COLOR_TOKENS.base.white,
  className = '',
  fadeWidthClassName = defaultFadeWidthClassName,
  startPositionClassName = CHECKOUT_SCROLL_EDGE_FADE_START_POSITION_CLASS_NAME,
  endPositionClassName = CHECKOUT_SCROLL_EDGE_FADE_END_POSITION_CLASS_NAME,
}: CheckoutScrollEdgeFadesProps) {
  const verticalClassName = className ? className : 'bottom-0';
  const edgeFadeBaseClassName = [
    'pointer-events-none absolute top-0 z-20 transition-opacity duration-150',
    fadeWidthClassName,
  ].join(' ');

  return (
    <>
      <div
        className={[
          edgeFadeBaseClassName,
          startPositionClassName,
          verticalClassName,
          showStart ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{ background: `linear-gradient(to left, transparent, ${edgeColor})` }}
      />
      <div
        className={[
          edgeFadeBaseClassName,
          endPositionClassName,
          verticalClassName,
          showEnd ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{ background: `linear-gradient(to right, transparent, ${edgeColor})` }}
      />
    </>
  );
}
