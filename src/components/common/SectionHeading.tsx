import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';
import { HighlightedText } from './GradientText';
import Reveal from './Reveal';
import { SHORT_SCREEN } from '../../theme/theme';

interface SectionHeadingProps {
  id?: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Semantic heading level. Use `h1` only once per page. */
  level?: 'h1' | 'h2';
  /** Use on dark backgrounds. */
  inverse?: boolean;
  /** Optional link or button aligned to the right of the heading on larger screens. */
  action?: ReactNode;
  /** Smaller gap below the heading, for when body text follows directly. */
  dense?: boolean;
  /** Phrase within `title` to show in the brand gradient. */
  highlight?: string;
  /**
   * On desktop, show the text before `highlight` and the highlight itself as one unbroken line
   * each, at `titleSize` so both fit.
   */
  splitLines?: boolean;
  titleSize?: string;
}

export default function SectionHeading({
  id,
  title,
  eyebrow,
  subtitle,
  level = 'h2',
  inverse = false,
  action,
  dense = false,
  highlight,
  splitLines = false,
  titleSize,
}: SectionHeadingProps) {
  return (
    <Reveal
      sx={{
        mb: dense ? 3 : { xs: 5, md: 'clamp(28px, 5vh, 56px)' },
        [SHORT_SCREEN]: { mb: dense ? 2 : 2.5 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'flex-end' },
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Box sx={{ maxWidth: 840 }}>
        {eyebrow && <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>}
        <Typography
          id={id}
          variant={level}
          component={level}
          sx={{
            mt: eyebrow ? 2 : 0,
            color: inverse ? 'common.white' : 'primary.main',
            ...(splitLines && {
              '& > span': { display: { md: 'block' }, whiteSpace: { md: 'nowrap' } },
            }),
            // Doubled selector outranks the compact short-screen heading size in the theme.
            ...(titleSize && { '&&': { fontSize: { md: titleSize } } }),
          }}
        >
          <HighlightedText
            text={title}
            highlight={highlight}
            onDark={inverse}
            splitLines={splitLines}
          />
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle1"
            sx={{ mt: 2.5, color: inverse ? 'grey.300' : 'text.secondary' }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Reveal>
  );
}
