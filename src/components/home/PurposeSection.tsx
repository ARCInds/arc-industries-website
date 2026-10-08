import { Box, Grid, Typography } from '@mui/material';
import { company, coreValues } from '../../data/company';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

const statements = [
  { label: 'Our Vision', text: company.vision },
  { label: 'Our Mission', text: company.mission },
];

export default function PurposeSection() {
  return (
    <Section labelledBy="purpose-heading">
      <SectionHeading id="purpose-heading" eyebrow="Who We Are" title="Vision, Mission & Values" />

      <Grid container spacing={{ xs: 5, md: 8 }}>
        {statements.map(({ label, text }) => (
          <Grid key={label} size={{ xs: 12, md: 6 }}>
            <Box sx={{ pl: { xs: 2.5, md: 3.5 }, borderLeft: 3, borderColor: 'secondary.main' }}>
              <Typography variant="overline" component="h3" sx={{ color: 'text.secondary' }}>
                {label}
              </Typography>
              <Typography
                component="p"
                sx={{
                  mt: 1.5,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 500,
                  lineHeight: 1.45,
                  letterSpacing: '-0.01em',
                  color: 'primary.main',
                }}
              >
                {text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="overline"
        component="h3"
        sx={{ display: 'block', mt: { xs: 7, md: 10 }, mb: 2.5, color: 'text.secondary' }}
      >
        Core Values
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' },
          gap: '1px',
          bgcolor: 'divider',
          border: 1,
          borderColor: 'divider',
        }}
      >
        {coreValues.map(({ name, icon: Icon }) => (
          <Box
            component="li"
            key={name}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              p: { xs: 2.5, md: 3 },
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ color: 'secondary.dark', display: 'flex' }}>
              <Icon size={22} strokeWidth={1.5} aria-hidden />
            </Box>
            <Typography sx={{ fontWeight: 600, color: 'primary.main' }}>{name}</Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
