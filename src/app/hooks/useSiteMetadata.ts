import { useEffect } from 'react';

type SiteMetadata = {
  title: string;
  description: string;
};

function setMetaDescription(content: string) {
  let element = document.querySelector<HTMLMetaElement>('meta[name="description"]');

  if (!element) {
    element = document.createElement('meta');
    element.name = 'description';
    document.head.appendChild(element);
  }

  element.content = content;
}

export function useSiteMetadata({ title, description }: SiteMetadata) {
  useEffect(() => {
    document.title = title;
    setMetaDescription(description);
  }, [title, description]);
}
