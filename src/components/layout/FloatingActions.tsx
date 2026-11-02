import { Box, Fab, Tooltip, Zoom } from '@mui/material';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { contact } from '../../data/company';
import { prefersReducedMotion } from '../../hooks/useInView';
import NextSectionButton from './NextSectionButton';

const WHATSAPP_NUMBER = contact.phoneHref.replace(/\D/g, '');
const WHATSAPP_MESSAGE = 'Hello ARC Industries, I would like to discuss a project.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** WhatsApp brand glyph (inline SVG; Lucide has no brand icons). */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44Zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.36-11.37 0-3.03-1.18-5.89-3.33-8.03Z" />
    </svg>
  );
}

/** Floating WhatsApp chat button and a back-to-top button (shown after scrolling). */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24 },
        bottom: { xs: 16, md: 24 },
        zIndex: (theme) => theme.zIndex.appBar + 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <NextSectionButton />
      <Zoom in={showTop}>
        <Fab
          size="small"
          aria-label="Back to top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
          }}
          sx={(theme) => ({
            color: 'common.white',
            bgcolor: 'primary.main',
            boxShadow: theme.brand.cardShadowHover,
            '&:hover': { bgcolor: 'primary.light' },
          })}
        >
          <ArrowUp size={20} aria-hidden />
        </Fab>
      </Zoom>
      <Tooltip title="Chat on WhatsApp" placement="left">
        <Fab
          component="a"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ARC Industries on WhatsApp (opens in a new tab)"
          sx={{
            width: 58,
            height: 58,
            color: 'common.white',
            // WhatsApp brand green, darkened slightly for contrast with the white icon.
            bgcolor: '#1FAF54',
            boxShadow: '0 8px 22px rgba(31, 175, 84, 0.4)',
            '&:hover': { bgcolor: '#17964A' },
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
