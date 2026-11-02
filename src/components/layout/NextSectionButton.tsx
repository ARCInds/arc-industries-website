import { Box, ButtonBase } from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../hooks/useInView';

const nudge = keyframes`0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); }`;

/** Header height on desktop: sections are aligned just below it. */
const HEADER_OFFSET = 80;

/** Top-level page sections plus the footer, in page order. */
function getBlocks(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>('main > section, footer')];
}

/**
 * Where the next click should scroll to: the rest of the current section if it continues
 * below the screen, otherwise the start of the next section. Null at the end of the page.
 */
function nextTarget(): number | null {
  const viewBottom = window.innerHeight;
  for (const block of getBlocks()) {
    const rect = block.getBoundingClientRect();
    // Where this block sits when aligned (its scroll margin; the header height by default).
    const offset = parseFloat(getComputedStyle(block).scrollMarginTop) || HEADER_OFFSET;
    // The block being read continues below the screen: show more of it.
    if (rect.top <= offset + 8 && rect.bottom > viewBottom + 24) {
      return window.scrollY + Math.min(rect.bottom - viewBottom, viewBottom - HEADER_OFFSET - 80);
    }
    // First block that starts below its aligned position: bring it into place.
    if (rect.top > offset + 8) {
      const top = window.scrollY + rect.top - offset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Nothing to do if the page cannot scroll any further.
      return Math.min(top, maxScroll) > window.scrollY + 4 ? Math.min(top, maxScroll) : null;
    }
  }
  return null;
}

/** Desktop-only "next section" arrow, shown in the floating button stack (bottom right). */
export default function NextSectionButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setVisible(!atBottom && nextTarget() !== null);
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
  }, []);

  return (
    <ButtonBase
      aria-label="Scroll to the next section"
      onClick={() => {
        const top = nextTarget();
        if (top !== null) {
          window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        }
      }}
      sx={(theme) => ({
        display: { xs: 'none', md: visible ? 'flex' : 'none' },
        width: 44,
        height: 44,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'common.white',
        bgcolor: alpha(theme.palette.primary.main, 0.85),
        border: `1px solid ${alpha(theme.palette.common.white, 0.35)}`,
        backdropFilter: 'blur(6px)',
        boxShadow: theme.brand.cardShadowHover,
        transition: theme.transitions.create('background-color'),
        '&:hover': { bgcolor: 'secondary.main' },
      })}
    >
      <Box sx={{ display: 'flex', animation: `${nudge} 1.8s ease-in-out infinite` }}>
        <ChevronDown size={22} aria-hidden />
      </Box>
    </ButtonBase>
  );
}
