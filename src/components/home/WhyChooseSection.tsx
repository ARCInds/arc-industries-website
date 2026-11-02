import { Box, Grid, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { company, whyChooseArc } from '../../data/company';
import { siteImages } from '../../data/images';
import { formatIndex } from '../../utils/format';
import ProjectImage from '../common/ProjectImage';
import Reveal from '../common/Reveal';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import { SHORT_SCREEN } from '../../theme/theme';

const image = siteImages.whyChoose;

export default function WhyChooseSection() {
  return (
    <Section labelledBy="why-heading" fill>
      <Grid container spacing={{ xs: 6, md: 6 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
            <SectionHeading
              id="why-heading"
              eyebrow="Why Choose ARC"
              title="Built on experience. Driven by responsibility."
              highlight="Driven by responsibility."
              splitLines
              titleSize="min(2.25rem, 3vw, 5vh)"
              dense
            />
            <Typography sx={{ color: 'text.secondary', maxWidth: 440 }}>{company.focus}</Typography>
            <Box
              sx={(theme) => ({
                mt: 'clamp(20px, 4vh, 40px)',
                borderRadius: 2,
                '& > div': { aspectRatio: { md: '16 / 10' } },
                // Short screens: the image is dropped so the six reasons fit on one screen.
                [SHORT_SCREEN]: { display: 'none' },
                boxShadow: theme.brand.cardShadowHover,
                display: { xs: 'none', sm: 'block' },
              })}
            >
              <ProjectImage src={image.src} alt={image.alt} isPlaceholder={image.isPlaceholder} />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            component="ol"
            sx={{
              listStyle: 'none',
              m: 0,
              p: 0,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gridAutoRows: '1fr',
              gap: { xs: 2, md: 2.5 },
              [SHORT_SCREEN]: { gap: 1.75 },
            }}
          >
            {whyChooseArc.map(({ title, description }, index) => (
              <Reveal
                component="li"
                delay={index * 70}
                key={title}
                sx={(theme) => ({
                  p: { xs: 3, md: 'clamp(18px, 2.6vh, 28px)' },
                  display: 'flex',
                  gap: 2,
                  [SHORT_SCREEN]: { p: 2, gap: 1.5 },
                  alignItems: 'flex-start',
                  borderRadius: 2,
                  bgcolor: 'background.muted',
                  border: `1px solid ${theme.palette.divider}`,
                  transition: theme.transitions.create([
                    'background-color',
                    'box-shadow',
                    'transform',
                  ]),
                  '&:hover': {
                    bgcolor: 'background.paper',
                    boxShadow: theme.brand.cardShadowHover,
                    transform: 'translateY(-3px)',
                  },
                })}
              >
                <Box
                  aria-hidden
                  sx={(theme) => ({
                    width: 44,
                    height: 44,
                    [SHORT_SCREEN]: { width: 38, height: 38, fontSize: '0.875rem' },
                    flexShrink: 0,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 1.5,
                    backgroundImage: theme.brand.gradient,
                    boxShadow: `0 8px 18px ${alpha(theme.palette.secondary.main, 0.25)}`,
                    color: 'common.white',
                    fontWeight: 750,
                    fontVariantNumeric: 'tabular-nums',
                  })}
                >
                  {formatIndex(index)}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ color: 'primary.main', lineHeight: 1.3 }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, [SHORT_SCREEN]: { mt: 0.5 }, color: 'text.secondary' }}
                  >
                    {description}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
