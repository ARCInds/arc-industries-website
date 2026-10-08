import { Box, Grid, Typography } from '@mui/material';
import { company, whyChooseArc } from '../../data/company';
import { formatIndex } from '../../utils/format';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

export default function WhyChooseSection() {
  return (
    <Section labelledBy="why-heading">
      <Grid container spacing={{ xs: 6, md: 10 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
            <SectionHeading
              id="why-heading"
              eyebrow="Why Choose ARC"
              title="Built on experience. Driven by responsibility."
              dense
            />
            <Typography sx={{ color: 'text.secondary', maxWidth: 440 }}>{company.focus}</Typography>
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
              columnGap: 5,
              rowGap: { xs: 4, md: 6 },
            }}
          >
            {whyChooseArc.map(({ title, description }, index) => (
              <Box component="li" key={title} sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
                <Typography
                  variant="overline"
                  component="span"
                  aria-hidden
                  sx={{ color: 'secondary.dark', fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatIndex(index)}
                </Typography>
                <Typography variant="h6" component="h3" sx={{ mt: 1, color: 'primary.main' }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
