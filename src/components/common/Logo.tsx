import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { company } from '../../data/company';
import { paths } from '../../routes/paths';

interface LogoProps {
  /** Use light text when placed on a dark background. */
  inverse?: boolean;
}

/**
 * Temporary typographic wordmark. Replace the contents with the final ARC Industries
 * logo (e.g. an <img> of the SVG) once it is available.
 */
export default function Logo({ inverse = false }: LogoProps) {
  return (
    <Box
      component={RouterLink}
      to={paths.home}
      aria-label={`${company.name} – Home`}
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textDecoration: 'none',
        color: inverse ? 'common.white' : 'primary.main',
      }}
    >
      <Box
        component="span"
        sx={{ fontSize: '1.625rem', fontWeight: 800, lineHeight: 1, letterSpacing: '0.1em' }}
      >
        ARC
      </Box>
      <Box
        component="span"
        sx={{
          mt: 0.5,
          pt: 0.5,
          borderTop: 2,
          borderColor: 'secondary.main',
          fontSize: '0.5625rem',
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: '0.38em',
          color: inverse ? 'grey.300' : 'text.secondary',
        }}
      >
        INDUSTRIES
      </Box>
    </Box>
  );
}
