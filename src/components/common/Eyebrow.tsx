import { Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  /** Use on dark backgrounds. */
  inverse?: boolean;
}

/** Small uppercase label with an accent rule, placed above section headings. */
export default function Eyebrow({ children, inverse = false }: EyebrowProps) {
  return (
    <Typography
      variant="overline"
      component="p"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        color: inverse ? 'secondary.light' : 'secondary.dark',
        '&::before': {
          content: '""',
          width: 28,
          height: 2,
          flexShrink: 0,
          bgcolor: 'secondary.main',
        },
      }}
    >
      {children}
    </Typography>
  );
}
