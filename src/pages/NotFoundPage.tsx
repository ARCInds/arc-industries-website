import { Box, Button, Stack, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import Eyebrow from '../components/common/Eyebrow';
import Section from '../components/common/Section';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';
import { paths } from '../routes/paths';

export default function NotFoundPage() {
  usePageMeta(pageMeta.notFound);

  return (
    <Section labelledBy="not-found-heading">
      <Box sx={{ maxWidth: 640, py: { md: 6 } }}>
        <Eyebrow>404</Eyebrow>
        <Typography
          id="not-found-heading"
          variant="h1"
          component="h1"
          sx={{ mt: 3, color: 'primary.main' }}
        >
          Page not found.
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 3, color: 'text.secondary' }}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5 }}>
          <Button variant="contained" size="large" component={RouterLink} to={paths.home}>
            Back to Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to={paths.contact}
            endIcon={<ArrowRight size={18} aria-hidden />}
          >
            Contact ARC Industries
          </Button>
        </Stack>
      </Box>
    </Section>
  );
}
