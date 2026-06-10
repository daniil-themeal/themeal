import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CompareSection from './components/CompareSection';
import HowDoesTheMealWorkSection from './components/HowDoesTheMealWorkSection';
import WhatYouEatEveryDaySection from './components/WhatYouEatEveryDaySection';
import { WhatsAppMenuSection } from './components/WhatsAppMenuSection';
import CustomersSection from './components/CustomersSection';
import FreshSection from './components/FreshSection';
import GallerySection from './components/GallerySection';
import CompareBenefitsSection from './components/CompareBenefitsSection';
import DeliverySection from './components/DeliverySection';
import QaSection from './components/QaSection';
import TotalOfferBlock from './components/TotalOfferBlock';
import Footer from './components/Footer';
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
  const [isHovered, setIsHovered] = useState(false);
  const [headerShown, setHeaderShown] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [designSystemOpen, setDesignSystemOpen] = useState(false);
  const [initialCheckoutStep, setInitialCheckoutStep] =
    useState<InitialCheckoutStep>('plan');
  const [initialDeliveryStep, setInitialDeliveryStep] =
    useState<InitialDeliveryStep>('address');
  const [checkoutInitialPhone, setCheckoutInitialPhone] = useState<string | undefined>();

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY === 0) {
        setHeaderShown(true);
      } else {
        setHeaderShown(currentY < lastScrollY.current);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const openDeliveryDetails = () => {
    setInitialCheckoutStep('delivery');
    setInitialDeliveryStep('details');
    setCheckoutOpen(true);
  };

  const openPayment = () => {
    setInitialCheckoutStep('payment');
    setInitialDeliveryStep('details');
    setCheckoutOpen(true);
  };

  const openSuccess = () => {
    setCheckoutInitialPhone(undefined);
    setInitialCheckoutStep('success');
    setInitialDeliveryStep('details');
    setCheckoutOpen(true);
  };

  const openFailed = () => {
    setCheckoutInitialPhone(undefined);
    setInitialCheckoutStep('failed');
    setInitialDeliveryStep('details');
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

  // Если открыта демо-страница, показываем только её
  if (designSystemOpen) {
    return <DesignSystemDemo onClose={closeDesignSystem} />;
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="absolute top-0 left-0 right-0 h-2"
          onMouseEnter={() => setIsHovered(true)}
        />

        <div
          className={`transition-transform duration-300 ease-in-out ${
            headerShown || isHovered ? 'translate-y-0' : '-translate-y-full'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Header
            onDeliveryDetailsClick={openDeliveryDetails}
            onPaymentClick={openPayment}
            onSuccessClick={openSuccess}
            onFailedClick={openFailed}
            onDesignSystemClick={openDesignSystem}
          />
        </div>
      </div>

      <HeroSection onOrderClick={openCheckout} />
      <CompareSection />
      <HowDoesTheMealWorkSection />
      <WhatYouEatEveryDaySection onOrderClick={openCheckout} />
      <WhatsAppMenuSection onGetMenuClick={openCheckoutFromWhatsApp} />
      <CustomersSection />
      <FreshSection />
      <GallerySection />
      <CompareBenefitsSection />
      <DeliverySection onOrderClick={openCheckout} />
      <QaSection />
      <TotalOfferBlock onOrderClick={openCheckout} />
      <Footer />

      <CheckoutPage
        isOpen={checkoutOpen}
        onClose={closeCheckout}
        initialCheckoutStep={initialCheckoutStep}
        initialDeliveryStep={initialDeliveryStep}
        initialPhone={checkoutInitialPhone}
      />
    </div>
  );
}