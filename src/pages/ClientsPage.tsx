import { Box } from '@mui/material';
import ClientCard from '../components/common/ClientCard';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import { clients } from '../data/clients';
import { pageHeroImages } from '../data/images';
import { recentProjects } from '../data/projects';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Client } from '../types/content';

/** Projects in the project data whose client is this organisation. */
const relatedProjects = (client: Client) =>
  recentProjects.filter((project) => project.client?.includes(client.name));

export default function ClientsPage() {
  usePageMeta(pageMeta.clients);

  return (
    <>
      <PageHero
        breadcrumb="Clients"
        background={pageHeroImages.clients}
        eyebrow="Clients"
        title="Client relationships."
        subtitle="Selected Government, PSU and other organizations associated with ARC Industries."
      />

      <Section labelledBy="client-list-heading" fill>
        <SectionHeading
          id="client-list-heading"
          eyebrow="Clients"
          title="A Few Of Our Prestigious Clients"
          highlight="Prestigious Clients"
        />

        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' },
            gridAutoRows: '1fr',
            // The two rows of cards stretch to fill the screen.
            flexGrow: { md: 1 },
            gap: { xs: 2, md: 3 },
          }}
        >
          {clients.map((client, index) => (
            <ClientCard
              key={`${client.name}-${String(index)}`}
              client={client}
              index={index}
              projects={relatedProjects(client)}
            />
          ))}
        </Box>
      </Section>
    </>
  );
}
