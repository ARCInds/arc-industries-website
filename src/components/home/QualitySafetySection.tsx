import { Box, Grid, Typography } from '@mui/material';
import { Check } from 'lucide-react';
import { qualityAndSafety } from '../../data/company';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

export default function QualitySafetySection() {
  return (
    <Section labelledBy="quality-heading" tone="muted">
      <SectionHeading id="quality-heading" eyebrow="Our Commitment" title="Quality & Safety" />

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {qualityAndSafety.map(({ title, text, points, icon: Icon }) => (
          <Grid key={title} size={{ xs: 12, md: 6 }}>
            <Box
              component="article"
              sx={{
                height: '100%',
                p: { xs: 3.5, md: 5 },
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                borderTop: 3,
                borderTopColor: 'primary.main',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'grid',
                    placeItems: 'center',
                    border: 1,
                    borderColor: 'divider',
                    color: 'secondary.dark',
                  }}
                >
                  <Icon size={24} strokeWidth={1.5} aria-hidden />
                </Box>
                <Typography variant="h4" component="h3" sx={{ color: 'primary.main' }}>
                  {title}
                </Typography>
              </Box>
              <Typography sx={{ mt: 3, color: 'text.secondary' }}>{text}</Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  m: 0,
                  mt: 3,
                  p: 0,
                  pt: 3,
                  borderTop: 1,
                  borderColor: 'divider',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 1.5,
                }}
              >
                {points.map((point) => (
                  <Box
                    component="li"
                    key={point}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}
                  >
                    <Box sx={{ color: 'secondary.dark', display: 'flex', flexShrink: 0 }}>
                      <Check size={16} strokeWidth={2.25} aria-hidden />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
