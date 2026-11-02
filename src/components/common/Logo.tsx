import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import emblem from '../../assets/logo/arc-emblem.png';
import wordmarkLight from '../../assets/logo/arc-wordmark-light.png';
import wordmark from '../../assets/logo/arc-wordmark.png';
import { company } from '../../data/company';
import { paths } from '../../routes/paths';

interface LogoProps {
  /** Use the light wordmark for dark backgrounds (e.g. the footer). */
  inverse?: boolean;
}

/**
 * ARC Industries logo (emblem beside the wordmark), linking to the home page. The images are
 * transparent cut-outs of src/assets/arc-logo.PNG; the link carries the accessible name,
 * so the images themselves are decorative.
 */
export default function Logo({ inverse = false }: LogoProps) {
  return (
    <Box
      component={RouterLink}
      to={paths.home}
      aria-label={`${company.name} – Home`}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: { xs: 1, md: 1.5, lg: 1.75 },
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src={emblem}
        alt=""
        width={161}
        height={144}
        sx={{ display: 'block', height: { xs: 44, md: 52, lg: 60 }, width: 'auto' }}
      />
      <Box
        component="img"
        src={inverse ? wordmarkLight : wordmark}
        alt=""
        width={661}
        height={54}
        sx={{ display: 'block', height: { xs: 16, md: 18, lg: 24 }, width: 'auto' }}
      />
    </Box>
  );
}
