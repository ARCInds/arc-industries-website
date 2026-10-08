import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import { paths } from '../../routes/paths';
import type { SiteImage } from '../../types/content';
import Eyebrow from './Eyebrow';
import GridPattern from './GridPattern';
import ProjectImage from './ProjectImage';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Short page name shown in the breadcrumb. */
  breadcrumb: string;
  image?: SiteImage;
}

/** Navy page header used at the top of every inner page. Contains the page's only h1. */
export default function PageHero({ eyebrow, title, subtitle, breadcrumb, image }: PageHeroProps) {
  return (
    <Box
      component="section"
      aria-labelledby="page-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'primary.main',
        color: 'common.white',
      }}
    >
      <GridPattern />
      <Container sx={{ position: 'relative', py: { xs: 7, md: image ? 10 : 12 } }}>
        <Box component="nav" aria-label="Breadcrumb" sx={{ mb: { xs: 4, md: 6 } }}>
          <Box
            component="ol"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              typography: 'body2',
              color: 'grey.400',
            }}
          >
            <li>
              <Link
                component={RouterLink}
                to={paths.home}
                sx={{ color: 'grey.400', '&:hover': { color: 'common.white' } }}
              >
                Home
              </Link>
            </li>
            <Box component="li" aria-hidden sx={{ display: 'flex' }}>
              <ChevronRight size={14} />
            </Box>
            <Box component="li" aria-current="page" sx={{ color: 'common.white' }}>
              {breadcrumb}
            </Box>
          </Box>
        </Box>

        <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: image ? 7 : 10 }}>
            <Eyebrow inverse>{eyebrow}</Eyebrow>
            <Typography
              id="page-heading"
              variant="h1"
              component="h1"
              sx={{ mt: 3, color: 'common.white', fontSize: { md: '3.25rem' } }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="subtitle1" sx={{ mt: 3, maxWidth: 640, color: 'grey.300' }}>
                {subtitle}
              </Typography>
            )}
          </Grid>
          {image && (
            <Grid size={{ xs: 12, md: 5 }}>
              <ProjectImage
                src={image.src}
                alt={image.alt}
                isPlaceholder={image.isPlaceholder}
                priority
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
