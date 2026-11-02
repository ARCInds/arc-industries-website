import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../hooks/useInView';
import type { SiteImage } from '../../types/content';

const INTERVAL_MS = 4000;

interface HeroSlideshowProps {
  slides: SiteImage[];
}

/**
 * Cross-fading background slideshow with a slow zoom. Decorative (empty alt text).
 * It does not auto-advance for visitors who prefer reduced motion, or while the tab is hidden.
 * Only the current and next images are requested, so later photos load just in time.
 */
export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const count = slides.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (count < 2 || prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % count);
    }, INTERVAL_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, [count]);

  // The current slide and the next one may load; once the loop has wrapped, all are loaded.
  const [loaded, setLoaded] = useState(Math.min(count, 2));
  if (loaded < count && active + 2 > loaded) setLoaded(Math.min(count, active + 2));

  return (
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {slides.slice(0, loaded).map((slide, index) => {
        const isActive = index === active;
        return (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            srcSet={slide.srcSet}
            sizes="100vw"
            alt=""
            fetchPriority={index === 0 ? 'high' : 'low'}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '70% center',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1)' : 'scale(1.06)',
              transition: `opacity 1s ease, transform ${String(INTERVAL_MS + 1000)}ms ease-out`,
            }}
          />
        );
      })}
    </Box>
  );
}
