import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import ContactCta from '../components/home/ContactCta';
import { governmentClients } from '../data/clients';
import { recentProjects } from '../data/projects';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';
import { paths } from '../routes/paths';
import type { Client } from '../types/content';
import { formatIndex } from '../utils/format';

/** Projects in the project data whose client is this organisation. */
const relatedProjects = (client: Client) =>
  recentProjects.filter((project) => project.client?.includes(client.name));

export default function ClientsPage() {
  usePageMeta(pageMeta.clients);

  return (
    <>
      <PageHero
        breadcrumb="Clients"
        eyebrow="Clients"
        title="Government & PSU relationships."
        subtitle="Selected Government and public-sector organizations associated with ARC Industries."
      />

      <Section labelledBy="client-list-heading">
        <SectionHeading
          id="client-list-heading"
          eyebrow="Government & PSU"
          title="Selected Government & PSU Clients"
        />

        <Box
          component="ol"
          sx={{ listStyle: 'none', m: 0, p: 0, borderBottom: 1, borderColor: 'divider' }}
        >
          {governmentClients.map((client, index) => {
            const projects = relatedProjects(client);
            return (
              <Box
                component="li"
                key={client.name}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '96px 3fr 4fr 4fr' },
                  alignItems: 'baseline',
                  columnGap: 4,
                  rowGap: 1,
                  py: { xs: 3.5, md: 5 },
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <Typography
                  aria-hidden
                  sx={{
                    fontWeight: 600,
                    color: 'secondary.dark',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatIndex(index)}
                </Typography>
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ color: 'primary.main', fontSize: { xs: '1.75rem', md: '2rem' } }}
                >
                  {client.shortName ?? client.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {client.shortName ? client.name : ''}
                </Typography>
                <Box>
                  {projects.map((project) => (
                    <Typography
                      key={project.title}
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Related project:{' '}
                      <Link component={RouterLink} to={paths.projects} sx={{ fontWeight: 600 }}>
                        {project.title}
                      </Link>
                    </Typography>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Section>

      <ContactCta />
    </>
  );
}
