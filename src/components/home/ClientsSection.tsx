import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { governmentClients } from '../../data/clients';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

// Text-only blocks until approved client logos are available.
export default function ClientsSection() {
  return (
    <Section labelledBy="clients-heading" tone="dark">
      <SectionHeading
        id="clients-heading"
        eyebrow="Our Clients"
        title="Selected Government & PSU Clients"
        subtitle="Government and public-sector organizations associated with ARC Industries."
        inverse
      />

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          columnGap: 4,
        }}
      >
        {governmentClients.map((client) => (
          <Box
            component="li"
            key={client.name}
            sx={(theme) => ({
              py: { xs: 3, md: 4 },
              borderTop: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
              transition: theme.transitions.create('border-color'),
              '&:hover': { borderTopColor: theme.palette.secondary.main },
            })}
          >
            <Typography
              component="p"
              sx={{
                fontSize: { xs: '1.75rem', md: '2rem' },
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                color: 'common.white',
              }}
            >
              {client.shortName ?? client.name}
            </Typography>
            {client.shortName && (
              <Typography variant="body2" sx={{ mt: 1.5, color: 'grey.400', maxWidth: 240 }}>
                {client.name}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Section>
  );
}
