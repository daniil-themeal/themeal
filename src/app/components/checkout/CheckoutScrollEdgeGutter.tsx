import { CHECKOUT_SCROLL_EDGE_GUTTER_CLASS_NAME } from './checkoutStepPageLayoutTokens';

export function CheckoutScrollEdgeGutter({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={className ?? CHECKOUT_SCROLL_EDGE_GUTTER_CLASS_NAME}
    />
  );
}
