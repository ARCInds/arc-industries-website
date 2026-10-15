import { useEffect } from 'react';
import { IS_REVIEW_BUILD, SITE_URL } from '../data/seo';
import type { PageMeta } from '../types/content';

/** Creates or updates a <meta> tag identified by `name` or `property`. */
function setMeta(key: 'name' | 'property', id: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${id}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(key, id);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function removeHeadTag(selector: string): void {
  document.head.querySelector(selector)?.remove();
}

/**
 * Sets the document title, meta description, canonical URL, robots directive and
 * Open Graph / Twitter metadata for the current page.
 */
export function usePageMeta({ title, description, path, noIndex = false }: PageMeta): void {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    if (noIndex || IS_REVIEW_BUILD) setMeta('name', 'robots', 'noindex');
    else removeHeadTag('meta[name="robots"]');

    if (path) {
      const url = `${SITE_URL}${path}`;
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
      setMeta('property', 'og:url', url);
    } else {
      removeHeadTag('link[rel="canonical"]');
      removeHeadTag('meta[property="og:url"]');
    }
  }, [title, description, path, noIndex]);
}
