import {
  getPaymentMethodCardIconAsset,
  getPaymentMethodIconAsset,
  getPaymentMethodIconSizeClassName,
  type PaymentMethodBrandIconId,
  type PaymentMethodCardIconVariant,
  type PaymentMethodIconId,
  type PaymentMethodIconTokenId,
} from '../paymentMethodIconTokens';

type PaymentMethodIconTileProps = {
  id: PaymentMethodIconTokenId;
  size?: 'tile' | 'brand-badge';
  cardVariant?: PaymentMethodCardIconVariant;
  className?: string;
};

/** Figma Property 1 tile — fixed 48×48 artboard, inserted as a whole. */
function PaymentMethodIconTile({
  id,
  size = 'tile',
  cardVariant = 'neutral',
  className = '',
}: PaymentMethodIconTileProps) {
  const src =
    id === 'card'
      ? getPaymentMethodCardIconAsset(cardVariant)
      : getPaymentMethodIconAsset(id);

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
