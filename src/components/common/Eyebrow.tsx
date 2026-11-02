import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  /** Use on dark backgrounds. */
  inverse?: boolean;
  /** `large` for prominent placements such as the homepage hero. */
  size?: 'default' | 'large';
}

/** Small uppercase label with a gradient accent rule, placed above section headings. */
export default function Eyebrow({ children, inverse = false, size = 'default' }: EyebrowProps) {
  const large = size === 'large';
  return (
    <Typography
      variant="overline"
      component="p"
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: large ? 2 : 1.5,
        color: inverse ? 'secondary.light' : 'secondary.main',
        ...(large && {
          fontSize: { xs: '1rem', md: '1.375rem' },
          letterSpacing: '0.22em',
        }),
        '&::before': {
          content: '""',
          width: large ? 48 : 32,
          height: large ? 4 : 3,
          flexShrink: 0,
          borderRadius: 2,
          backgroundImage: inverse ? theme.brand.textGradientOnDark : theme.brand.gradient,
        },
      })}
    >
      {children}
    </Typography>
  );
}
