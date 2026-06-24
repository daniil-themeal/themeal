import { useEffect } from 'react';
import { isDevToolsEnabled } from '../devToolsEnabled';
import { mealContentEn } from './content/mealContentEn';
import { landingLayoutStyle } from './landingLayoutTokens';
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

type MainLandingPageProps = {
  onOrderClick: () => void;
  onQuizClick: () => void;
  onPhoneSubmit: (phone: string) => void;
  onContinueClick: () => void;
  onResumeVerification?: () => void;
  onResetPhone?: () => void;
  onDesignSystemClick?: () => void;
  onSignInClick?: () => void;
  checkoutOpen?: boolean;
  quizOpen?: boolean;
  isPhoneVerified?: boolean;
  verifiedPhone?: string;
  pendingPhone?: string;
};

export default function MainLandingPage({
  onOrderClick,
  onQuizClick,
  onPhoneSubmit,
  onContinueClick,
  onResumeVerification,
  onResetPhone,
  onDesignSystemClick,
  onSignInClick,
  checkoutOpen = false,
  quizOpen = false,
  isPhoneVerified = false,
  verifiedPhone,
  pendingPhone,
}: MainLandingPageProps) {
  const t = mealContentEn;

  useScrollReveal();

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  const shared = { t, onOrder: onOrderClick };

  return (
    <div className="landing-stas min-h-screen w-full" style={landingLayoutStyle}>
      <Header
        {...shared}
        dark
        onDesignSystemClick={onDesignSystemClick}
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
        <Benefits t={t} onQuizClick={onQuizClick} />
        <Delivery t={t} onOrder={onOrderClick} />
        <FAQ t={t} />
        <FinalOffer t={t} onOrder={onOrderClick} />
      </main>
      <Footer t={t} />
      <OrderFab t={t} onOrderClick={onOrderClick} onQuizClick={onQuizClick} hidden={checkoutOpen || quizOpen} />
      <ScrollToTopFab hidden={checkoutOpen || quizOpen} />
      {isDevToolsEnabled ? <DevToolsOverlays /> : null}
    </div>
  );
}
