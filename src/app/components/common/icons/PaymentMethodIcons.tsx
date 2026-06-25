import {
  PAYMENT_METHOD_ICON_LABELS,
  PAYMENT_METHOD_SVG_IDS,
  PAYMENT_METHOD_SVG_NATIVE_SIZE,
  getPaymentMethodCardIconAsset,
  getPaymentMethodIconSizeClassName,
  getPaymentMethodRasterAsset,
  getPaymentMethodSvgAsset,
  type PaymentMethodBrandIconId,
  type PaymentMethodCardIconVariant,
  type PaymentMethodIconId,
  type PaymentMethodIconTokenId,
  type PaymentMethodSvgId,
  type PaymentMethodSvgVariant,
} from '../paymentMethodIconTokens';

const SVG_ID_SET = new Set<PaymentMethodIconTokenId>(PAYMENT_METHOD_SVG_IDS);

function isPaymentMethodSvgId(
  id: PaymentMethodIconTokenId,
): id is PaymentMethodSvgId {
  return SVG_ID_SET.has(id);
}

type PaymentMethodIconTileProps = {
  id: PaymentMethodIconTokenId;
  size?: 'tile' | 'brand-badge';
  cardVariant?: PaymentMethodCardIconVariant;
  className?: string;
};

/**
 * Figma Property 1 tile — fixed 48×48 (or 32×32 brand-badge) artboard, inserted
 * as a whole. Routes SVG brands (Apple Pay / Google Pay / Tabby) through
 * inline raw markup so they stay crisp at any DPR and can be recolored via
 * `currentColor` if a `mono` variant is requested elsewhere.
 */
function PaymentMethodIconTile({
  id,
  size = 'tile',
  cardVariant = 'neutral',
  className = '',
}: PaymentMethodIconTileProps) {
  if (isPaymentMethodSvgId(id)) {
    const svg = getPaymentMethodSvgAsset(id, 'colored');
    return (
      <span
        aria-hidden
        className={[
          getPaymentMethodIconSizeClassName(size),
          'flex shrink-0 items-center justify-center [&>svg]:max-h-full [&>svg]:max-w-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  const src =
    id === 'card'
      ? getPaymentMethodCardIconAsset(cardVariant)
      : getPaymentMethodRasterAsset(id);

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={[
        getPaymentMethodIconSizeClassName(size),
        'shrink-0 object-contain',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

export function PaymentMethodCardIcon({
  variant = 'neutral',
}: {
  variant?: PaymentMethodCardIconVariant;
}) {
  return <PaymentMethodIconTile id="card" cardVariant={variant} />;
}

export function PaymentMethodApplePayIcon() {
  return <PaymentMethodIconTile id="apple-pay" />;
}

export function PaymentMethodGooglePayIcon() {
  return <PaymentMethodIconTile id="google-pay" />;
}

export function PaymentMethodTabbyIcon() {
  return <PaymentMethodIconTile id="tabby" />;
}

export function PaymentMethodVisaIcon() {
  return <PaymentMethodIconTile id="visa" size="brand-badge" />;
}

export function PaymentMethodMastercardIcon() {
  return <PaymentMethodIconTile id="mastercard" size="brand-badge" />;
}

export type { PaymentMethodCardIconVariant, PaymentMethodIconId };

export function PaymentMethodIcon({
  method,
  cardVariant = 'neutral',
  className = '',
}: {
  method: PaymentMethodIconId;
  cardVariant?: PaymentMethodCardIconVariant;
  className?: string;
}) {
  return (
    <PaymentMethodIconTile
      id={method}
      cardVariant={cardVariant}
      className={className}
    />
  );
}

export function PaymentMethodBrandIcon({
  brand,
}: {
  brand: PaymentMethodBrandIconId;
}) {
  return <PaymentMethodIconTile id={brand} size="brand-badge" />;
}

type PaymentBrandLogoProps = {
  id: PaymentMethodSvgId;
  variant?: PaymentMethodSvgVariant;
  /** Target height in px. Defaults to native artwork height. */
  height?: number;
  className?: string;
};

/**
 * Inline SVG wordmark for a payment brand. Use this when you want the logo
 * sized to a specific height (e.g. inside a CTA button) and, in the `mono`
 * variant, recolored via the parent's `color`/`currentColor`.
 */
export function PaymentBrandLogo({
  id,
  variant = 'colored',
  height,
  className = '',
}: PaymentBrandLogoProps) {
  const svg = getPaymentMethodSvgAsset(id, variant);
  const native = PAYMENT_METHOD_SVG_NATIVE_SIZE[id];
  const h = height ?? native.height;
  const w = (h * native.width) / native.height;
  return (
    <span
      role="img"
      aria-label={PAYMENT_METHOD_ICON_LABELS[id]}
      className={[
        'inline-flex shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: `${w}px`, height: `${h}px` }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
