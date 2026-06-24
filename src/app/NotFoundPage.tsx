import { useNavigate } from 'react-router';
import { Button } from './components/common/Button';
import { Footer } from './main-landing/components/sections/sections3';
import { mealContentEn } from './main-landing/content/mealContentEn';
import { LegalHeader } from './legal/LegalHeader';
import { legalText, legalTypographyVars } from './legal/legalTypography';
import './main-landing/styles/index.css';
import './legal/legal-page.css';
import './not-found-page.css';

export default function NotFoundPage() {
  const t = mealContentEn;
  const navigate = useNavigate();

  return (
    <div
      className="main-landing legal-page not-found-page min-h-screen w-full font-sans"
      style={legalTypographyVars}
    >
      <LegalHeader t={t} />

      <main className="legal-main not-found-main">
        <div className="wrap not-found-main__inner">
          <p className="not-found__code" aria-hidden="true">
            404
          </p>

          <div className="not-found__content">
            <div className="not-found__text">
              <h1 className={`not-found__title ${legalText.pageTitle}`}>Page not found</h1>
              <p className={`not-found__message ${legalText.body}`}>
                The page you are looking for does not exist or may have been moved.
              </p>
            </div>
            <Button
              type="button"
              variant="primary"
              size="medium"
              onClick={() => navigate('/')}
            >
              Back to home
            </Button>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
