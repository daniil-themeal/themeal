import { PageShareButtons, type PageShareLabels } from '../../components/common/PageShareButtons';
import { BLOG_ROUTES } from '../routes';

type BlogShareButtonsProps = {
  title: string;
  slug: string;
  labels: PageShareLabels;
};

export function BlogShareButtons({ title, slug, labels }: BlogShareButtonsProps) {
  return (
    <PageShareButtons title={title} path={BLOG_ROUTES.post(slug)} labels={labels} />
  );
}
