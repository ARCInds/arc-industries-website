import { Box, ButtonBase, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { LucideIcon } from 'lucide-react';
import { BadgeCheck } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import IconBadge from './IconBadge';
import Reveal from './Reveal';
import { SHORT_SCREEN } from '../../theme/theme';

const VERY_SHORT_SCREEN = '@media (min-width: 900px) and (max-height: 660px)';

interface NumberedListItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface NumberedListProps {
  items: NumberedListItem[];
  /**
   * On desktop, shorten long descriptions to a few lines with a "Read more" toggle, so the
   * cards fit on one screen (and fill it).
   */
  collapsible?: boolean;
}

/** Description that is clamped on desktop until expanded; the toggle shows only when cut off. */
function CollapsibleDescription({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const check = () => {
      if (!expanded) setClamped(element.scrollHeight > element.clientHeight + 1);
    };
    const observer = new ResizeObserver(check);
    observer.observe(element);
    // Web fonts change the line breaks without resizing the element, so check again.
    void document.fonts.ready.then(check);
    return () => {
      observer.disconnect();
    };
  }, [expanded]);

  return (
    <>
      <Typography
        ref={ref}
        id={id}
        variant="body2"
        sx={{
          mt: 1.5,
          [SHORT_SCREEN]: { mt: 1 },
          color: 'text.secondary',
          ...(!expanded && {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: { md: 3 },
            [SHORT_SCREEN]: { mt: 1 },
            [VERY_SHORT_SCREEN]: { WebkitLineClamp: 2 },
          }),
        }}
      >
        {text}
      </Typography>
      {(clamped || expanded) && (
        <ButtonBase
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => {
            setExpanded((value) => !value);
          }}
          sx={{
            mt: 1,
            alignSelf: 'flex-start',
            fontSize: '0.875rem',
            fontWeight: 650,
            color: 'secondary.main',
            borderRadius: 0.5,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </ButtonBase>
      )}
    </>
  );
}

/**
 * Grid of numbered cards (icon, number, title, description), matching the homepage card style.
 * Items without an icon get a neutral badge icon.
 */
export default function NumberedList({ items, collapsible = false }: NumberedListProps) {
  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gridAutoRows: '1fr',
        // In a full-screen section, the card rows stretch to fill it.
        flexGrow: { md: 1 },
        gap: { xs: 2, md: 3 },
        [SHORT_SCREEN]: { gap: 2 },
      }}
    >
      {items.map(({ title, description, icon }, index) => (
        <Reveal
          component="li"
          delay={(index % 4) * 80}
          key={title}
          sx={(theme) => ({
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 3, md: 'clamp(20px, 2.8vh, 28px)' },
            [SHORT_SCREEN]: { p: 2 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.brand.cardShadow,
            transition: theme.transitions.create(['transform', 'box-shadow', 'border-color']),
            '&::before': {
              content: '""',
              position: 'absolute',
              insetInline: 0,
              top: 0,
              height: 3,
              backgroundImage: theme.brand.gradient,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.standard,
              }),
            },
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.brand.cardShadowHover,
              borderColor: alpha(theme.palette.secondary.main, 0.3),
            },
            '&:hover::before': { transform: 'scaleX(1)' },
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconBadge icon={icon ?? BadgeCheck} size={44} />
            <Typography variant="h6" component="h3" sx={{ color: 'primary.main', lineHeight: 1.3 }}>
              {title}
            </Typography>
          </Box>
          {collapsible ? (
            <CollapsibleDescription text={description} />
          ) : (
            <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary' }}>
              {description}
            </Typography>
          )}
        </Reveal>
      ))}
    </Box>
  );
}
