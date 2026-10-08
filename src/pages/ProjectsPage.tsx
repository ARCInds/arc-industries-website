import { Stack, Typography } from '@mui/material';
import PageHero from '../components/common/PageHero';
import ProjectCard from '../components/common/ProjectCard';
import Section from '../components/common/Section';
import ContactCta from '../components/home/ContactCta';
import { recentProjects } from '../data/projects';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';
import { visuallyHidden } from '../utils/a11y';

const hasIllustrativeImages = recentProjects.some((project) => project.isPlaceholderImage);

export default function ProjectsPage() {
  usePageMeta(pageMeta.projects);

  return (
    <>
      <PageHero
        breadcrumb="Projects"
        eyebrow="Our Projects"
        title="Selected civil and infrastructure works."
        subtitle="A selection of works associated with ARC Industries in Bengaluru. This is not a complete list of the company's projects."
      />

      <Section labelledBy="project-list-heading">
        <Typography id="project-list-heading" component="h2" sx={visuallyHidden}>
          Project details
        </Typography>
        <Stack spacing={{ xs: 9, md: 14 }}>
          {recentProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              variant="detailed"
              reverse={index % 2 === 1}
              priority={index === 0}
            />
          ))}
        </Stack>

        {hasIllustrativeImages && (
          <Typography
            variant="caption"
            component="p"
            sx={{
              mt: { xs: 8, md: 12 },
              pt: 3,
              borderTop: 1,
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          >
            Images marked “Illustrative image” are representative visuals. Actual project
            photographs will be added.
          </Typography>
        )}
      </Section>

      <ContactCta />
    </>
  );
}
