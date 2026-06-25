import { formatAed } from '../../data/checkoutPricing';
import { Button } from '../common/Button';
import { PaymentBrandLogo } from '../common/icons/PaymentMethodIcons';
import type { PaymentMethodId } from '../common/PaymentMethodSelector';

type PaymentSubmitButtonProps = {
  method: PaymentMethodId;
  amount: number;
  onPay?: () => void;
};

export function PaymentSubmitButton({ method, amount, onPay }: PaymentSubmitButtonProps) {
  if (method === 'tabby') {
    return (
      <Button
        type="button"
        variant="primary"
        size="medium"
        fullWidth
        onClick={onPay}
        rightIcon={<PaymentBrandLogo id="tabby" variant="colored" height={20} />}
      >
        Place an Order
      </Button>
    );
  }

  const label = `Pay AED ${formatAed(amount)}`;

  if (method === 'apple-pay') {
    return (
      <Button
        type="button"
        variant="primary"
        size="medium"
        fullWidth
        onClick={onPay}
        rightIcon={
          <PaymentBrandLogo
            id="apple-pay"
            variant="mono"
            height={20}
            className="text-white"
          />
        }
      >
        {label}
      </Button>
    );
  }

  if (method === 'google-pay') {
    return (
      <Button
        type="button"
        variant="primary"
        size="medium"
        fullWidth
        onClick={onPay}
        rightIcon={
          <PaymentBrandLogo
            id="google-pay"
            variant="mono"
            height={21}
            className="text-white"
          />
        }
      >
        {label}
      </Button>
    );
  }

  return (
    <Button type="button" variant="primary" size="medium" fullWidth onClick={onPay}>
      {label}
    </Button>
  );
}
