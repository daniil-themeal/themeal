export type BlogPostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; url: string; alt: string; caption?: string };

export type BlogPostSection = {
  title: string;
  blocks: readonly BlogPostBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  publishedAt: string;
  intro: string;
  sections: readonly BlogPostSection[];
};

export type BlogListMeta = {
  title: string;
  description: string;
  pageTitle: string;
  pageLead: string;
};
