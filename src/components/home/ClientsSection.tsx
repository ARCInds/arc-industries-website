import { Box } from '@mui/material';
import { clients } from '../../data/clients';
import ArcRings from '../common/ArcRings';
import ClientCard from '../common/ClientCard';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import { SHORT_SCREEN } from '../../theme/theme';

// Light section (after the navy Selected Projects); text-only cards until approved client
// logos are available.
export default function ClientsSection() {
  return (
    <Section
      labelledBy="clients-heading"
      tone="muted"
      fill
      decoration={
        <ArcRings
          size={640}
          animate
          sx={{ display: { xs: 'none', md: 'block' }, left: -300, bottom: -300, opacity: 0.35 }}
        />
      }
    >
      <SectionHeading
        id="clients-heading"
        eyebrow="Clients"
        title="A Few Of Our Prestigious Clients"
        highlight="Prestigious Clients"
        subtitle="Government, PSU and other organizations associated with ARC Industries."
      />

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
          gridAutoRows: '1fr',
          // The two rows of cards stretch to fill the screen.
          flexGrow: { md: 1 },
          gap: { xs: 2, md: 3 },
          [SHORT_SCREEN]: { gap: 2 },
        }}
      >
        {clients.map((client, index) => (
          <ClientCard key={`${client.name}-${String(index)}`} client={client} index={index} />
        ))}
      </Box>
    </Section>
  );
}
