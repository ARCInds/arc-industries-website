import { Box, Container, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ChevronRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import { paths } from '../../routes/paths';
import type { SiteImage } from '../../types/content';
import { imageAlt } from '../../utils/a11y';
import { HeroWave } from '../home/HeroGraphics';
import ArcRings from './ArcRings';
import Eyebrow from './Eyebrow';
import IllustrativeLabel from './IllustrativeLabel';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Short page name shown in the breadcrumb. */
  breadcrumb: string;
  /** Background photograph, shown behind a blue fade like the homepage hero. */
  background: SiteImage;
}

/**
 * Photo header used at the top of every inner page, in the same style as the homepage hero
 * (blue fade, logo rings, bottom swooshes). Contains the page's only h1.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  background,
}: PageHeroProps) {
  return (
    <Box
      component="section"
      aria-labelledby="page-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'primary.dark',
        color: 'common.white',
      }}
    >
      <Box
        component="img"
        src={background.src}
        srcSet={background.srcSet}
        sizes="100vw"
        alt={imageAlt(background.alt, background.isPlaceholder)}
        fetchPriority="high"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '70% center',
        }}
      />
      {/* Royal-blue fade for readable text, clearing so the photo shows on the right. */}
      <Box
        aria-hidden
        sx={(theme) => {
          const navy = theme.palette.primary.dark;
          const blueDark = theme.palette.secondary.dark;
          const blue = theme.palette.secondary.main;
          return {
            position: 'absolute',
            inset: 0,
            background: {
              xs: `linear-gradient(180deg, ${alpha(navy, 0.88)} 0%, ${alpha(blueDark, 0.8)} 100%)`,
              md: `linear-gradient(90deg, ${alpha(navy, 0.95)} 0%, ${alpha(blueDark, 0.85)} 38%, ${alpha(blue, 0.4)} 65%, transparent 90%)`,
            },
          };
        }}
      />
      <ArcRings
        size={620}
        onDark
        animate
        sx={{ display: { xs: 'none', md: 'block' }, right: -180, top: -200, opacity: 0.5 }}
      />

      <Container
        sx={(theme) => {
          // Fill the first screen exactly (below the top bar and header) so the next section
          // does not peek in; capped for very tall screens.
          const { headerHeight, topBarHeight, heroWaveHeight } = theme.layout;
          const fill = (unit: string, bp: 'xs' | 'md') =>
            `min(calc(100${unit} - ${String(headerHeight[bp] + topBarHeight[bp])}px), 1080px)`;
          return {
            position: 'relative',
            pt: { xs: 6, md: 'clamp(24px, 5vh, 72px)' },
            pb: {
              xs: `calc(${heroWaveHeight.xs} + 24px)`,
              md: `calc(${heroWaveHeight.md} + 16px)`,
            },
            minHeight: { xs: fill('vh', 'xs'), md: fill('vh', 'md') },
            '@supports (height: 100svh)': {
              minHeight: { xs: fill('svh', 'xs'), md: fill('svh', 'md') },
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textShadow: `0 2px 18px ${alpha(theme.palette.primary.dark, 0.55)}`,
          };
        }}
      >
        <Box component="nav" aria-label="Breadcrumb" sx={{ mb: { xs: 4, md: 5 } }}>
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
              color: 'grey.300',
            }}
          >
            <li>
              <Link
                component={RouterLink}
                to={paths.home}
                sx={{ color: 'grey.300', '&:hover': { color: 'common.white' } }}
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

        <Box sx={{ maxWidth: 820 }}>
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
            <Typography variant="subtitle1" sx={{ mt: 3, maxWidth: 640, color: 'grey.100' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Container>

      <HeroWave />
      {background.isPlaceholder && <IllustrativeLabel placement="top-right" />}
    </Box>
  );
}
