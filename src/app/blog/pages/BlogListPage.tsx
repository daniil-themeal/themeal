import { mealContentEn } from '../../main-landing/content/mealContentEn';
import { Footer } from '../../main-landing/components/sections/sections3';
import { landingLayoutStyle } from '../../main-landing/landingLayoutTokens';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import { LegalHeader } from '../../legal/LegalHeader';
import { legalText, legalTypographyVars } from '../../legal/legalTypography';
import '../../main-landing/styles/index.css';
import '../../legal/legal-page.css';
import { blogListMeta, getAllPosts } from '../content/posts';
import { BlogPostCard } from '../components/BlogPostCard';
import '../blog-page.css';

export function BlogListPage() {
  const t = mealContentEn;
  const posts = getAllPosts();

  useSiteMetadata({
    title: blogListMeta.title,
    description: blogListMeta.description,
  });

  return (
    <div
      className="main-landing legal-page blog-page blog-page--list min-h-screen w-full font-sans"
      style={{ ...legalTypographyVars, ...landingLayoutStyle }}
    >
      <LegalHeader t={t} />

      <main className="legal-main">
        <div className="wrap legal-main__inner">
          <header className="blog-list__head">
            <h1 className={`legal-article__title ${legalText.pageTitle}`}>{blogListMeta.pageTitle}</h1>
            <p className={`legal-paragraph ${legalText.body}`}>{blogListMeta.pageLead}</p>
          </header>

          <div className="blog-list__grid">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} readLabel={t.blog.readArticle} />
            ))}
          </div>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
}
