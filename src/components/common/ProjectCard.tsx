import { Box, Grid, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MapPin } from 'lucide-react';
import type { Fact, Project } from '../../types/content';
import { formatIndex } from '../../utils/format';
import FactList from './FactList';
import { SHORT_SCREEN } from '../../theme/theme';
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
  /** Detailed variant only: position in the list, shown as "Project 01". */
  index?: number;
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
  index,
}: {
  project: Project;
  reverse: boolean;
  priority: boolean;
  index?: number;
}) {
  return (
    <Grid
      container
      component="article"
      className="zoom-on-hover"
      spacing={{ xs: 3.5, md: 8 }}
      sx={{ alignItems: 'center' }}
    >
      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          order: { md: reverse ? 2 : 1 },
          // Wider image on short screens so each project fits on one screen.
          [SHORT_SCREEN]: { '& > div': { aspectRatio: '16 / 10' } },
        }}
      >
        <ProjectImage
          src={project.image}
          alt={project.imageAlt}
          isPlaceholder={project.isPlaceholderImage}
          priority={priority}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }} sx={{ order: { md: reverse ? 1 : 2 } }}>
        {index !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              aria-hidden
              sx={(theme) => ({
                width: 44,
                height: 44,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 1.5,
                color: 'common.white',
                fontWeight: 750,
                backgroundImage: theme.brand.gradient,
                boxShadow: theme.brand.glow,
              })}
            >
              {formatIndex(index)}
            </Box>
            <Typography variant="overline" component="p" sx={{ color: 'secondary.main' }}>
              Project {formatIndex(index)}
            </Typography>
          </Box>
        )}
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
  index,
}: ProjectCardProps) {
  if (variant === 'detailed') {
    return (
      <DetailedProjectCard project={project} reverse={reverse} priority={priority} index={index} />
    );
  }

  const association = getAssociation(project);
  const featured = variant === 'featured';

  return (
    <Box
      component="article"
      className="zoom-on-hover"
      sx={(theme) => ({
        height: '100%',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.brand.cardShadow,
        transition: theme.transitions.create(['transform', 'box-shadow']),
        '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.brand.cardShadowHover },
        // The card provides the rounded corners for its image.
        '& > div:first-of-type': { borderRadius: 0 },
      })}
    >
      <ProjectImage
        src={project.image}
        alt={project.imageAlt}
        isPlaceholder={project.isPlaceholderImage}
        aspectRatio={featured ? '4 / 3' : '16 / 9'}
        priority={priority}
      />
      <Box sx={{ p: featured ? { xs: 3, md: 4 } : 3 }}>
        {association && (
          <Typography
            variant="body2"
            sx={(theme) => ({
              display: 'inline-block',
              px: 1.25,
              py: 0.25,
              borderRadius: 5,
              fontWeight: 650,
              fontSize: '0.8125rem',
              color: 'secondary.dark',
              bgcolor: alpha(theme.palette.secondary.main, 0.08),
            })}
          >
            {association}
          </Typography>
        )}
        <Typography
          variant={featured ? 'h4' : 'h5'}
          component="h3"
          sx={{ mt: 1.5, color: 'primary.main' }}
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
