import { useEffect, useState } from 'react';
import { paths } from '../routes/paths';

/** Homepage section (by heading id) → the navigation path it belongs to. */
const SECTION_NAV: Record<string, string> = {
  'hero-heading': paths.home,
  'about-heading': paths.about,
  'services-heading': paths.services,
  'projects-heading': paths.projects,
  'clients-heading': paths.clients,
  'why-heading': paths.about,
  'quality-heading': paths.about,
  'purpose-heading': paths.about,
};

/**
 * While `enabled` (on the homepage), returns the navigation path of the section currently
 * being read: the last section whose top has passed 35% of the way down the screen.
 * Returns null when disabled.
 */
export function useHomeScrollSpy(enabled: boolean): string | null {
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string = paths.home;
      for (const section of document.querySelectorAll<HTMLElement>(
        'main section[aria-labelledby]',
      )) {
        const path = SECTION_NAV[section.getAttribute('aria-labelledby') ?? ''];
        if (path && section.getBoundingClientRect().top <= line) current = path;
      }
      // At the very bottom of the page the last section may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = paths.contact;
      }
      setActivePath(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  // A stale value from a previous homepage visit is ignored on other pages.
  return enabled ? activePath : null;
}
