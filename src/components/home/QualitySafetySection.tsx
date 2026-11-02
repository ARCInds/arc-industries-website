import { Box, Grid, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Check } from 'lucide-react';
import { qualityAndSafety } from '../../data/company';
import ArcRings from '../common/ArcRings';
import IconBadge from '../common/IconBadge';
import Reveal from '../common/Reveal';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

export default function QualitySafetySection() {
  return (
    <Section labelledBy="quality-heading" tone="muted" fill>
      <SectionHeading
        id="quality-heading"
        eyebrow="Our Commitment"
        title="Quality & Safety"
        highlight="Safety"
      />

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {qualityAndSafety.map(({ title, text, points, icon }, index) => {
          // Alternate a light and a navy card for visual rhythm.
          const dark = index % 2 === 1;
          return (
            <Grid key={title} size={{ xs: 12, md: 6 }}>
              <Reveal
                component="article"
                delay={index * 120}
                sx={(theme) => ({
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  p: { xs: 3.5, md: 5 },
                  borderRadius: 2,
                  bgcolor: dark ? 'primary.main' : 'background.paper',
                  backgroundImage: dark ? theme.brand.navyGradient : 'none',
                  color: dark ? 'common.white' : 'text.primary',
                  border: dark ? 'none' : `1px solid ${theme.palette.divider}`,
                  boxShadow: dark ? theme.brand.cardShadowHover : theme.brand.cardShadow,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    insetInline: 0,
                    top: 0,
                    height: 4,
                    backgroundImage: theme.brand.gradient,
                  },
                })}
              >
                {dark && (
                  <ArcRings size={360} onDark sx={{ right: -140, bottom: -170, opacity: 0.5 }} />
                )}
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconBadge icon={icon} size={56} />
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ color: dark ? 'common.white' : 'primary.main' }}
                  >
                    {title}
                  </Typography>
                </Box>
                <Typography
                  sx={{ position: 'relative', mt: 3, color: dark ? 'grey.300' : 'text.secondary' }}
                >
                  {text}
                </Typography>
                <Box
                  component="ul"
                  sx={(theme) => ({
                    position: 'relative',
                    listStyle: 'none',
                    m: 0,
                    mt: 3,
                    p: 0,
                    pt: 3,
                    borderTop: `1px solid ${dark ? alpha(theme.palette.common.white, 0.14) : theme.palette.divider}`,
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 1.5,
                  })}
                >
                  {points.map((point) => (
                    <Reveal
                      component="li"
                      delay={index * 120}
                      key={point}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}
                    >
                      <Box
                        aria-hidden
                        sx={(theme) => ({
                          width: 22,
                          height: 22,
                          flexShrink: 0,
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: '50%',
                          color: dark ? 'primary.main' : 'common.white',
                          bgcolor: dark ? 'secondary.light' : 'secondary.main',
                          boxShadow: `0 4px 10px ${alpha(theme.palette.secondary.main, 0.25)}`,
                        })}
                      >
                        <Check size={13} strokeWidth={3} />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 650, color: dark ? 'common.white' : 'primary.main' }}
                      >
                        {point}
                      </Typography>
                    </Reveal>
                  ))}
                </Box>
              </Reveal>
            </Grid>
          );
        })}
      </Grid>
    </Section>
  );
}
