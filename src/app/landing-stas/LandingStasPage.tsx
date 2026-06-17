import { useEffect } from 'react';
import { mealContentEn } from './content/mealContentEn';
import { useScrollReveal } from './useScrollReveal';
import { OrderFab } from './components/OrderFab';
import { DevToolsOverlays } from './components/DevToolsOverlays';
import {
  Header,
  Hero,
  Compare,
  HowItWorks,
} from './components/sections/sections1';
import {
  Menu,
  Customers,
  Fresh,
  LeadCapture,
} from './components/sections/sections2';
import {
  Benefits,
  Delivery,
  FAQ,
  FinalOffer,
  Footer,
} from './components/sections/sections3';
import './styles/landing-stas.css';

type LandingStasPageProps = {
  onOrderClick: () => void;
  onPhoneSubmit: (phone: string) => void;
  onSmsVerified: (phone: string) => void;
  onContinueClick: () => void;
  onResetPhone?: () => void;
  onDesignSystemClick?: () => void;
  checkoutOpen?: boolean;
  isPhoneVerified?: boolean;
  pendingPhone?: string;
};

export default function LandingStasPage({
  onOrderClick,
  onPhoneSubmit,
  onSmsVerified,
  onContinueClick,
  onResetPhone,
  onDesignSystemClick,
  checkoutOpen = false,
  isPhoneVerified = false,
  pendingPhone,
}: LandingStasPageProps) {
  const t = mealContentEn;

  useScrollReveal();

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  const shared = { t, onOrder: onOrderClick };

  return (
    <div className="landing-stas min-h-screen w-full">
      <Header {...shared} dark onDesignSystemClick={onDesignSystemClick} />
      <main>
        <Hero t={t} onOrder={onOrderClick} />
        <Compare t={t} />
        <HowItWorks t={t} />
        <Menu t={t} onOrder={onOrderClick} />
        <LeadCapture
          t={t}
          onPhoneSubmit={onPhoneSubmit}
          onSmsVerified={onSmsVerified}
          onContinue={onContinueClick}
          onResetPhone={onResetPhone}
          isPhoneVerified={isPhoneVerified}
          pendingPhone={pendingPhone}
        />
        <Customers t={t} />
        <Fresh t={t} />
        <Benefits t={t} onOrder={onOrderClick} />
        <Delivery t={t} onOrder={onOrderClick} />
        <FAQ t={t} />
        <FinalOffer t={t} onOrder={onOrderClick} />
      </main>
      <Footer t={t} />
      <OrderFab t={t} onOrderClick={onOrderClick} hidden={checkoutOpen} />
      <DevToolsOverlays />
    </div>
  );
}
