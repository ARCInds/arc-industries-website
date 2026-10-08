import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import { hero } from '../../data/company';
import { siteImages } from '../../data/images';
import { paths } from '../../routes/paths';
import { imageAlt } from '../../utils/a11y';
import Eyebrow from '../common/Eyebrow';
import GridPattern from '../common/GridPattern';
import IllustrativeLabel from '../common/IllustrativeLabel';

const image = siteImages.hero;

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
      <Box
        component="img"
        src={image.src}
        srcSet={image.srcSet}
        sizes="100vw"
        alt={imageAlt(image.alt, image.isPlaceholder)}
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
      <Box
        aria-hidden
        sx={(theme) => {
          const overlay = theme.palette.primary.dark;
          return {
            position: 'absolute',
            inset: 0,
            background: {
              xs: alpha(overlay, 0.86),
              md: `linear-gradient(90deg, ${alpha(overlay, 0.95)} 0%, ${alpha(overlay, 0.85)} 45%, ${alpha(overlay, 0.35)} 100%)`,
            },
          };
        }}
      />
      <GridPattern />

      <Container
        sx={{
          position: 'relative',
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 20 },
          minHeight: { md: 640 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ maxWidth: 760 }}>
          <Eyebrow inverse>{hero.eyebrow}</Eyebrow>
          <Typography
            id="hero-heading"
            variant="h1"
            component="h1"
            sx={{ mt: 3, color: 'common.white' }}
          >
            {hero.headline}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 3, maxWidth: 620, color: 'grey.300' }}>
            {hero.text}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to={paths.contact}
              endIcon={<ArrowRight size={18} aria-hidden />}
            >
              Discuss Your Project
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to={paths.projects}
              sx={(theme) => ({
                color: 'common.white',
                borderColor: alpha(theme.palette.common.white, 0.45),
                '&:hover': {
                  borderColor: 'common.white',
                  bgcolor: alpha(theme.palette.common.white, 0.08),
                },
              })}
            >
              View Our Projects
            </Button>
          </Stack>
        </Box>

        <Typography
          variant="caption"
          aria-hidden
          sx={(theme) => ({
            display: { xs: 'none', lg: 'block' },
            position: 'absolute',
            top: theme.spacing(6),
            right: theme.spacing(4),
            pl: 1.5,
            borderLeft: 1,
            borderColor: 'secondary.main',
            color: alpha(theme.palette.common.white, 0.6),
            letterSpacing: '0.14em',
            fontVariantNumeric: 'tabular-nums',
          })}
        >
          BENGALURU · KARNATAKA
        </Typography>
      </Container>

      {image.isPlaceholder && <IllustrativeLabel placement="top-right" />}
    </Box>
  );
}
