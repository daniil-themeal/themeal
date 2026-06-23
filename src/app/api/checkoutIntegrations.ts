import type { CheckoutOrderPayload } from '../components/checkout/checkoutOrderTypes';

// TODO: wire to checkout/order API when backend is ready
export async function submitCheckoutOrder(_payload: CheckoutOrderPayload): Promise<void> {
  return Promise.resolve();
}
