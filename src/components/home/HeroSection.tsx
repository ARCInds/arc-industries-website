import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import { hero, heroFeatures } from '../../data/company';
import { heroSlides } from '../../data/images';
import { paths } from '../../routes/paths';
import ArcRings from '../common/ArcRings';
import Eyebrow from '../common/Eyebrow';
import GradientText from '../common/GradientText';
import IllustrativeLabel from '../common/IllustrativeLabel';
import Reveal from '../common/Reveal';
import { HeroWave } from './HeroGraphics';
import HeroSlideshow from './HeroSlideshow';

// The headline is set as two lines; the second (the accent) is shown in the brand gradient.
const headlineFirstLine = hero.headline.replace(hero.headlineAccent, '').trim();
const hasIllustrativeSlides = heroSlides.some((slide) => slide.isPlaceholder);

export default function HeroSection() {
  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'primary.dark',
        color: 'common.white',
      }}
    >
      <HeroSlideshow slides={heroSlides} />
      {/* Royal-blue fade on the left for readable text, clearing so the photo shows vividly. */}
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
              xs: `linear-gradient(180deg, ${alpha(navy, 0.86)} 0%, ${alpha(blueDark, 0.78)} 60%, ${alpha(navy, 0.86)} 100%)`,
              md: [
                `linear-gradient(0deg, ${alpha(navy, 0.6)} 0%, transparent 38%)`,
                `linear-gradient(90deg, ${alpha(navy, 0.95)} 0%, ${alpha(blueDark, 0.84)} 34%, ${alpha(blue, 0.42)} 57%, transparent 78%)`,
              ].join(', '),
            },
          };
        }}
      />
      {/* Slowly rotating logo rings on the right. */}
      <ArcRings
        size={760}
        onDark
        animate
        sx={{ display: { xs: 'none', md: 'block' }, right: -160, top: -120, opacity: 0.6 }}
      />

      <Container
        sx={(theme) => {
          // Fill the first screen exactly (capped for very tall screens).
          const { headerHeight, topBarHeight, heroWaveHeight } = theme.layout;
          const fill = (unit: string, bp: 'xs' | 'md') =>
            `min(calc(100${unit} - ${String(headerHeight[bp] + topBarHeight[bp])}px), 1440px)`;
          return {
            position: 'relative',
            // Spacing scales with screen height on desktop so the content, icon row and bottom
            // swooshes all fit on the first screen, even on short or zoomed-in screens.
            pt: { xs: 7, md: 'clamp(24px, 6vh, 72px)' },
            pb: {
              xs: `calc(${heroWaveHeight.xs} + 24px)`,
              md: `calc(${heroWaveHeight.md} + 8px)`,
            },
            minHeight: { xs: fill('vh', 'xs'), md: fill('vh', 'md') },
            // Small-viewport units ignore mobile browser toolbars where supported.
            '@supports (height: 100svh)': {
              minHeight: { xs: fill('svh', 'xs'), md: fill('svh', 'md') },
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // Very short desktop windows: tighten the layout so the hero still fits.
            ['@media (min-width: 900px) and (max-height: 700px)']: {
              pt: 3,
              '& h1': { fontSize: '2rem' },
              '& h1 + p': { fontSize: '0.9375rem', mt: 1.5 },
            },
          };
        }}
      >
        <Reveal
          sx={(theme) => ({
            maxWidth: { xs: 780, md: 'none' },
            // Soft shadow keeps the text crisp over bright parts of the photos.
            textShadow: `0 2px 18px ${alpha(theme.palette.primary.dark, 0.55)}`,
          })}
        >
          <Eyebrow inverse size="large">
            {hero.eyebrow}
          </Eyebrow>
          <Typography
            id="hero-heading"
            variant="h1"
            component="h1"
            sx={{
              mt: { xs: 3, md: 'clamp(12px, 2.4vh, 24px)' },
              color: 'common.white',
              fontWeight: 700,
              // Scales with the viewport so each sentence stays on one line from tablet up.
              fontSize: { xs: '2rem', md: 'clamp(2.25rem, min(0.9rem + 3.1vw, 6.4vh), 3.25rem)' },
              '& > span': { display: 'block', whiteSpace: { md: 'nowrap' } },
            }}
          >
            <span>{headlineFirstLine}</span>{' '}
            <GradientText onDark>{hero.headlineAccent}</GradientText>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mt: { xs: 3, md: 'clamp(12px, 2.4vh, 24px)' },
              maxWidth: 580,
              fontSize: { xs: '1.0625rem', md: 'clamp(1rem, 2.3vh, 1.25rem)' },
              fontWeight: 450,
              lineHeight: 1.6,
              color: 'grey.100',
            }}
          >
            {hero.text}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: { xs: 4.5, md: 'clamp(20px, 3.6vh, 36px)' } }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to={paths.contact}
              endIcon={<ArrowRight size={18} aria-hidden />}
              sx={(theme) => ({
                backgroundImage: theme.brand.brightGradient,
                boxShadow: theme.brand.glow,
              })}
            >
              Discuss Your Project
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to={paths.projects}
              endIcon={<ArrowRight size={18} aria-hidden />}
              sx={(theme) => ({
                color: 'common.white',
                borderColor: alpha(theme.palette.common.white, 0.6),
                bgcolor: alpha(theme.palette.primary.dark, 0.25),
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  borderColor: 'common.white',
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                },
              })}
            >
              View Our Projects
            </Button>
          </Stack>
        </Reveal>

        {/* Icon row of key qualities, styled like the reference: icon above a two-line label. */}
        <Reveal delay={250} sx={{ mt: { xs: 5, md: 'clamp(24px, 5vh, 56px)' } }}>
          <Box
            component="ul"
            aria-label="Key qualities"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(5, max-content)' },
              rowGap: 3,
            }}
          >
            {heroFeatures.map(({ lines: [first, second], icon: Icon }, index) => (
              <Box
                component="li"
                key={first + second}
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.25,
                  px: { xs: 1, sm: 3, md: 4 },
                  // First item lines up with the buttons above (set at every breakpoint so md doesn't override).
                  ...(index === 0 && { pl: { xs: 0, sm: 0, md: 0 } }),
                  borderLeft: {
                    xs: 0,
                    sm: index === 0 ? 0 : `1px solid ${alpha(theme.palette.common.white, 0.28)}`,
                  },
                })}
              >
                <Box sx={{ display: 'flex', color: 'secondary.light' }}>
                  <Icon size={34} strokeWidth={1.5} aria-hidden />
                </Box>
                <Typography
                  component="p"
                  sx={{
                    color: 'common.white',
                    fontSize: { xs: '0.875rem', md: '0.9375rem' },
                    fontWeight: 500,
                    lineHeight: 1.35,
                  }}
                >
                  {first}
                  <br />
                  {second}
                </Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Container>

      <HeroWave />
      {hasIllustrativeSlides && <IllustrativeLabel placement="top-right" />}
    </Box>
  );
}
