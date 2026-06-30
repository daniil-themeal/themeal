import { Link, useParams } from 'react-router';

import { Chip } from '../../components/common/Chip';
import { mealContentEn } from '../../main-landing/content/mealContentEn';
import { Footer } from '../../main-landing/components/sections/sections3';
import { landingLayoutStyle } from '../../main-landing/landingLayoutTokens';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import NotFoundPage from '../../NotFoundPage';
import { LegalHeader } from '../../legal/LegalHeader';
import { LegalBreadcrumbs } from '../../legal/LegalBreadcrumbs';
import { legalText, legalTypographyVars } from '../../legal/legalTypography';
import '../../main-landing/styles/index.css';
import '../../legal/legal-page.css';
import { renderBlogSectionBlocks } from '../components/BlogPostContentBlocks';
import { formatPublishedDate } from '../components/BlogPostCard';
import { getPostBySlug } from '../content/posts';
import { BLOG_ROUTES } from '../routes';
import '../blog-page.css';

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);
  const t = mealContentEn;

  useSiteMetadata(
    post
      ? { title: `${post.title} | TheMeal`, description: post.excerpt }
      : { title: 'Page not found | TheMeal', description: t.blog.notFoundDescription },
  );

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div
      className="main-landing legal-page blog-page min-h-screen w-full font-sans"
      style={{ ...legalTypographyVars, ...landingLayoutStyle }}
    >
      <LegalHeader t={t} />

      <main className="legal-main">
        <div className="wrap legal-main__inner">
          <LegalBreadcrumbs
            items={[
              { type: 'link', to: '/', label: 'Home' },
              { type: 'link', to: BLOG_ROUTES.index, label: t.footer.blog },
              { type: 'current', label: post.title },
            ]}
          />

          <article className="legal-article">
            <header className="legal-article__head">
              <div className="blog-post__meta">
                <Chip>{post.category}</Chip>
                <time className={legalText.caption} dateTime={post.publishedAt}>
                  {formatPublishedDate(post.publishedAt)}
                </time>
              </div>

              <h1 className={`legal-article__title ${legalText.pageTitle}`}>{post.title}</h1>
            </header>

            <div className="blog-post__hero">
              <img src={post.imageUrl} alt={post.imageAlt} className="blog-post__hero-image" />
            </div>

            <div className="legal-article__intro">
              {post.intro.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={`legal-paragraph ${legalText.body}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {post.sections.map((section) => (
              <section key={section.title} className="legal-section blog-section">
                <h2 className={`legal-section__title blog-section__title ${legalText.sectionTitle}`}>
                  {section.title}
                </h2>
                <div className="legal-section__body">
                  {renderBlogSectionBlocks(section.blocks)}
                </div>
              </section>
            ))}
          </article>

          <p className={`blog-post__back ${legalText.caption}`}>
            <Link to={BLOG_ROUTES.index} className={legalText.link}>
              {t.blog.backToBlog}
            </Link>
          </p>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
