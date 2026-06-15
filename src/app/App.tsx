import { useState } from 'react';
import LandingStasPage from './landing-stas/LandingStasPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import DesignSystemDemo from './components/DesignSystemDemo';

type InitialCheckoutStep =
  | 'plan'
  | 'verification'
  | 'delivery'
  | 'payment'
  | 'success'
  | 'failed';
type InitialDeliveryStep = 'address' | 'details';

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const [initialCheckoutStep, setInitialCheckoutStep] =
    useState<InitialCheckoutStep>('plan');
  const [initialDeliveryStep, setInitialDeliveryStep] =
    useState<InitialDeliveryStep>('address');
  const [checkoutInitialPhone, setCheckoutInitialPhone] = useState<string | undefined>();

  const openCheckout = () => {
    setCheckoutInitialPhone(undefined);
    setInitialCheckoutStep('plan');
    setInitialDeliveryStep('address');
    setCheckoutOpen(true);
  };

  const openCheckoutFromWhatsApp = (phone: string) => {
    setCheckoutInitialPhone(phone);
    setInitialCheckoutStep('verification');
    setInitialDeliveryStep('address');
    setCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setCheckoutOpen(false);
  };

  const openDesignSystem = () => {
    setDesignSystemOpen(true);
  };

  const closeDesignSystem = () => {
    setDesignSystemOpen(false);
  };

  if (designSystemOpen) {
    return <DesignSystemDemo onClose={closeDesignSystem} />;
  }

  return (
    <>
      <LandingStasPage
        onOrderClick={openCheckout}
        onWhatsAppClick={openCheckoutFromWhatsApp}
        onDesignSystemClick={openDesignSystem}
        checkoutOpen={checkoutOpen}
      />

      <CheckoutPage
        isOpen={checkoutOpen}
        onClose={closeCheckout}
        initialCheckoutStep={initialCheckoutStep}
        initialDeliveryStep={initialDeliveryStep}
        initialPhone={checkoutInitialPhone}
      />
    </>
  );
}
