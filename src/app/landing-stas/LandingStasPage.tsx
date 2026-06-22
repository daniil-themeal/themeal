import { useEffect } from 'react';
import { mealContentEn } from './content/mealContentEn';
import { useScrollReveal } from './useScrollReveal';
import { OrderFab } from './components/OrderFab';
import { ScrollToTopFab } from './components/ScrollToTopFab';
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
  onContinueClick: () => void;
  onResumeVerification?: () => void;
  onResetPhone?: () => void;
  onDesignSystemClick?: () => void;
  onSignInClick?: () => void;
  checkoutOpen?: boolean;
  isPhoneVerified?: boolean;
  verifiedPhone?: string;
  pendingPhone?: string;
};

export default function LandingStasPage({
  onOrderClick,
  onPhoneSubmit,
  onContinueClick,
  onResumeVerification,
  onResetPhone,
  onDesignSystemClick,
  onSignInClick,
  checkoutOpen = false,
  isPhoneVerified = false,
  verifiedPhone,
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
      <Header
        {...shared}
        dark
        onDesignSystemClick={onDesignSystemClick}
        isPhoneVerified={isPhoneVerified}
        verifiedPhone={verifiedPhone}
        pendingPhone={pendingPhone}
        onSignInClick={onSignInClick}
        onResetPhone={onResetPhone}
        onResumeVerification={onResumeVerification}
      />
      <main>
        <Hero t={t} onOrder={onOrderClick} />
        <Compare t={t} />
        <HowItWorks t={t} />
        <Menu t={t} onOrder={onOrderClick} />
        <LeadCapture
          t={t}
          onPhoneSubmit={onPhoneSubmit}
          onContinue={onContinueClick}
          onResumeVerification={onResumeVerification}
          onResetPhone={onResetPhone}
          isPhoneVerified={isPhoneVerified}
          verifiedPhone={verifiedPhone}
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
      <ScrollToTopFab hidden={checkoutOpen} />
      <DevToolsOverlays />
    </div>
  );
}
