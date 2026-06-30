import { Link } from 'react-router';

import { Chip } from '../../components/common/Chip';
import { legalText } from '../../legal/legalTypography';
import { BLOG_ROUTES } from '../routes';
import type { BlogPost } from '../types/blog.types';

type BlogPostCardProps = {
  post: BlogPost;
  readLabel: string;
};

function formatPublishedDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate));
}

export function BlogPostCard({ post, readLabel }: BlogPostCardProps) {
  const postHref = BLOG_ROUTES.post(post.slug);

  return (
    <article className="blog-card">
      <Link to={postHref} className="blog-card__media-link">
        <img src={post.imageUrl} alt={post.imageAlt} className="blog-card__image" loading="lazy" />
      </Link>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <Chip>{post.category}</Chip>
          <time className={legalText.caption} dateTime={post.publishedAt}>
            {formatPublishedDate(post.publishedAt)}
          </time>
        </div>

        <h2 className={`blog-card__title ${legalText.sectionTitle}`}>
          <Link to={postHref} className="blog-card__title-link">
            {post.title}
          </Link>
        </h2>

        <p className={`blog-card__excerpt ${legalText.body}`}>{post.excerpt}</p>

        <Link to={postHref} className={`blog-card__read ${legalText.link}`}>
          {readLabel}
        </Link>
      </div>
    </article>
  );
}

export { formatPublishedDate };
