import { Grid, Stack, Typography } from '@mui/material';
import { recentProjects } from '../../data/projects';
import { paths } from '../../routes/paths';
import ArrowLink from '../common/ArrowLink';
import ProjectCard from '../common/ProjectCard';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

// The first project in the data is shown as the featured project.
const [featuredProject, ...otherProjects] = recentProjects;
const hasIllustrativeImages = recentProjects.some((project) => project.isPlaceholderImage);

export default function ProjectsSection() {
  return (
    <Section labelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        eyebrow="Our Work"
        title="Selected Projects"
        subtitle="Selected civil and infrastructure works associated with ARC Industries."
        action={<ArrowLink to={paths.projects}>View All Projects</ArrowLink>}
      />

      <Grid container spacing={{ xs: 7, md: 5 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <ProjectCard project={featuredProject} variant="featured" />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={{ xs: 7, md: 5 }}>
            {otherProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </Stack>
        </Grid>
      </Grid>

      {hasIllustrativeImages && (
        <Typography variant="caption" component="p" sx={{ mt: 6, color: 'text.secondary' }}>
          Images marked “Illustrative image” are representative visuals. Actual project photographs
          will be added.
        </Typography>
      )}
    </Section>
  );
}
