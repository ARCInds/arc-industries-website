import { Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';

interface ArrowLinkProps {
  to: string;
  children: ReactNode;
  /** Use on dark backgrounds. */
  inverse?: boolean;
}

/** Understated text link with an arrow that moves on hover, used for secondary actions. */
export default function ArrowLink({ to, children, inverse = false }: ArrowLinkProps) {
  return (
    <Button
      component={RouterLink}
      to={to}
      endIcon={<ArrowRight size={18} aria-hidden />}
      sx={(theme) => ({
        px: 0,
        minWidth: 0,
        color: inverse ? 'secondary.light' : 'primary.main',
        borderBottom: 1,
        borderColor: inverse ? 'secondary.light' : 'secondary.main',
        borderRadius: 0,
        '&:hover': { bgcolor: 'transparent' },
        '& .MuiButton-endIcon': {
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shorter,
          }),
        },
        '&:hover .MuiButton-endIcon': { transform: 'translateX(4px)' },
      })}
    >
      {children}
    </Button>
  );
}
