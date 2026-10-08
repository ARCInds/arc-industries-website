import { Box, Grid, Typography } from '@mui/material';
import { MapPin } from 'lucide-react';
import type { Fact, Project } from '../../types/content';
import FactList from './FactList';
import ProjectImage from './ProjectImage';

interface ProjectCardProps {
  project: Project;
  /**
   * `featured`: larger image and heading. `compact`: smaller stacked card.
   * `detailed`: image beside a full details list.
   */
  variant?: 'featured' | 'compact' | 'detailed';
  /** Detailed variant only: place the image on the right on larger screens. */
  reverse?: boolean;
  /** Load the image immediately; use for a card visible on first paint. */
  priority?: boolean;
}

function getAssociation({ client, associatedProject }: Project): string | undefined {
  if (client) return `Client: ${client}`;
  if (associatedProject) return `Project: ${associatedProject}`;
  return undefined;
}

function getFacts({ client, associatedProject, location }: Project): Fact[] {
  const facts: Fact[] = [];
  if (client) facts.push({ label: 'Client', value: client });
  else if (associatedProject) facts.push({ label: 'Project', value: associatedProject });
  facts.push({ label: 'Location', value: location });
  return facts;
}

/** Side-by-side image and project details, used on the Projects page. */
function DetailedProjectCard({
  project,
  reverse,
  priority,
}: {
  project: Project;
  reverse: boolean;
  priority: boolean;
}) {
  return (
    <Grid
      container
      component="article"
      className="zoom-on-hover"
      spacing={{ xs: 3.5, md: 8 }}
      sx={{ alignItems: 'center' }}
    >
      <Grid size={{ xs: 12, md: 7 }} sx={{ order: { md: reverse ? 2 : 1 } }}>
        <ProjectImage
          src={project.image}
          alt={project.imageAlt}
          isPlaceholder={project.isPlaceholderImage}
          priority={priority}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }} sx={{ order: { md: reverse ? 1 : 2 } }}>
        <Typography variant="h4" component="h3" sx={{ color: 'primary.main' }}>
          {project.title}
        </Typography>
        <Typography sx={{ mt: 2, mb: 3.5, color: 'text.secondary' }}>
          {project.description}
        </Typography>
        <FactList facts={getFacts(project)} />
      </Grid>
    </Grid>
  );
}

export default function ProjectCard({
  project,
  variant = 'compact',
  reverse = false,
  priority = false,
}: ProjectCardProps) {
  if (variant === 'detailed') {
    return <DetailedProjectCard project={project} reverse={reverse} priority={priority} />;
  }

  const association = getAssociation(project);
  const featured = variant === 'featured';

  return (
    <Box component="article" className="zoom-on-hover">
      <ProjectImage
        src={project.image}
        alt={project.imageAlt}
        isPlaceholder={project.isPlaceholderImage}
        aspectRatio={featured ? '4 / 3' : '16 / 9'}
        priority={priority}
      />
      <Box sx={{ pt: featured ? 3.5 : 2.5, pr: { md: featured ? 4 : 0 } }}>
        {association && (
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: 'secondary.dark', fontSize: '0.8125rem' }}
          >
            {association}
          </Typography>
        )}
        <Typography
          variant={featured ? 'h4' : 'h5'}
          component="h3"
          sx={{ mt: 1, color: 'primary.main' }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}
        >
          <MapPin size={14} aria-hidden />
          {project.location}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1.5, color: 'text.secondary', maxWidth: featured ? 560 : undefined }}
        >
          {project.description}
        </Typography>
      </Box>
    </Box>
  );
}
