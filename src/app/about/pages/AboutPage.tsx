import { useNavigate } from 'react-router';

import { Button } from '../../components/common/Button';
import { Chip } from '../../components/common/Chip';
import { PageShareButtons } from '../../components/common/PageShareButtons';
import { renderBlogSectionBlocks } from '../../blog/components/BlogPostContentBlocks';
import { mealContentEn } from '../../main-landing/content/mealContentEn';
import { Footer } from '../../main-landing/components/sections/sections3';
import { landingLayoutStyle } from '../../main-landing/landingLayoutTokens';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { LegalHeader } from '../../legal/LegalHeader';
import { LegalBreadcrumbs } from '../../legal/LegalBreadcrumbs';
import { legalText, legalTypographyVars } from '../../legal/legalTypography';
import '../../main-landing/styles/index.css';
import '../../legal/legal-page.css';
import '../../blog/blog-page.css';
import { aboutPageContent } from '../content/aboutContent';
import { ABOUT_ROUTES } from '../routes';
import '../about-page.css';

export function AboutPage() {
  const navigate = useNavigate();
  const t = mealContentEn;
  const content = aboutPageContent;

  useSiteMetadata({
    title: content.title,
    description: content.description,
  });

  const shareLabels = {
    ...t.blog,
    shareLabel: t.about.shareLabel,
  };

  return (
    <div
      className="main-landing legal-page blog-page about-page min-h-screen w-full font-sans"
      style={{ ...legalTypographyVars, ...landingLayoutStyle }}
    >
      <LegalHeader t={t} />

      <main className="legal-main">
        <div className="wrap legal-main__inner">
          <LegalBreadcrumbs
            items={[
              { type: 'link', to: '/', label: 'Home' },
              { type: 'current', label: t.footer.about },
            ]}
          />

          <article className="legal-article">
            <header className="legal-article__head">
              <div className="blog-post__meta">
                <Chip>{content.eyebrow}</Chip>
              </div>

              <h1 className={`legal-article__title ${legalText.pageTitle}`}>{content.pageTitle}</h1>
            </header>

            <div className="blog-post__hero">
              <img
                src={content.heroImageUrl}
                alt={content.heroImageAlt}
                className="blog-post__hero-image"
              />
            </div>

            <div className="legal-article__intro">
              {content.intro.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={`legal-paragraph ${legalText.body}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            <PageShareButtons
              title={content.pageTitle}
              path={ABOUT_ROUTES.about}
              labels={shareLabels}
            />

            {content.sections.map((section, index) => (
              <section key={section.title} className="legal-section blog-section">
                <h2 className={`legal-section__title blog-section__title ${legalText.sectionTitle}`}>
                  {section.title}
                </h2>
                <div className="legal-section__body">
                  {renderBlogSectionBlocks(section.blocks)}
                </div>

                {section.title === 'Trusted across the UAE' ? (
                  <div className="about-stats" aria-label="TheMeal at a glance">
                    {content.stats.map((stat) => (
                      <div key={stat.label} className="about-stats__item">
                        <p className={`about-stats__value ${legalText.sectionTitle}`}>{stat.value}</p>
                        <p className={`about-stats__label ${legalText.caption}`}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {index === content.sections.length - 1 ? (
                  <div className="about-cta">
                    <Button
                      type="button"
                      variant="primary"
                      size="large"
                      onClick={() => navigate({ pathname: '/', hash: '#menu' })}
                    >
                      {t.nav.order}
                    </Button>
                  </div>
                ) : null}
              </section>
            ))}

            <PageShareButtons
              title={content.pageTitle}
              path={ABOUT_ROUTES.about}
              labels={shareLabels}
            />
          </article>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
