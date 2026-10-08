import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

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
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        mb: dense ? 3 : { xs: 5, md: 7 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'flex-end' },
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Box sx={{ maxWidth: 720 }}>
        {eyebrow && <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow>}
        <Typography
          id={id}
          variant={level}
          component={level}
          sx={{ mt: eyebrow ? 2 : 0, color: inverse ? 'common.white' : 'primary.main' }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="subtitle1"
            sx={{ mt: 2.5, color: inverse ? 'grey.400' : 'text.secondary' }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}
