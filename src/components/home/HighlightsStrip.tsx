import { Box, Container, Typography } from '@mui/material';
import { highlights } from '../../data/company';
import { visuallyHidden } from '../../utils/a11y';

/** Credibility statement directly below the hero; overlaps the hero on larger screens. */
export default function HighlightsStrip() {
  return (
    <Box component="section" aria-labelledby="highlights-heading" sx={{ position: 'relative' }}>
      <Typography id="highlights-heading" component="h2" sx={visuallyHidden}>
        Key Highlights
      </Typography>
      <Container sx={{ mt: { md: -9 }, position: 'relative' }}>
        <Box
          component="ul"
          sx={(theme) => ({
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            bgcolor: 'background.paper',
            borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: 0 },
            borderTop: { xs: 0, md: `3px solid ${theme.palette.secondary.main}` },
            boxShadow: { md: 3 },
          })}
        >
          {highlights.map(({ value, label, icon: Icon }, index) => (
            <Box
              component="li"
              key={label}
              sx={(theme) => {
                // Full border values: a width-only responsive border would reset the colour.
                const line = `1px solid ${theme.palette.divider}`;
                return {
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  px: { xs: 0, sm: 3, md: 4 },
                  py: { xs: 3, md: 4.5 },
                  borderTop: { xs: index === 0 ? 0 : line, sm: index < 2 ? 0 : line, md: 0 },
                  borderLeft: { xs: 0, sm: index % 2 === 1 ? line : 0, md: index === 0 ? 0 : line },
                };
              }}
            >
              <Box sx={{ color: 'secondary.dark', display: 'flex', pt: 0.5, flexShrink: 0 }}>
                <Icon size={24} strokeWidth={1.5} aria-hidden />
              </Box>
              <Box>
                <Typography
                  component="p"
                  sx={{
                    fontSize: { xs: '1.375rem', md: '1.5rem' },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                    color: 'primary.main',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {value}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                  {label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
