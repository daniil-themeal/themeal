export const BLOG_ROUTES = {
  index: '/blog',
  post: (slug: string) => `/blog/${slug}`,
} as const;
