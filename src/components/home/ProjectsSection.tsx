import { Box, Typography } from '@mui/material';
import { recentProjects } from '../../data/projects';
import { paths } from '../../routes/paths';
import ArcRings from '../common/ArcRings';
import ArrowLink from '../common/ArrowLink';
import Reveal from '../common/Reveal';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import ProjectTile from './ProjectTile';
import { SHORT_SCREEN } from '../../theme/theme';

const hasIllustrativeImages = recentProjects.some((project) => project.isPlaceholderImage);

export default function ProjectsSection() {
  return (
    <Section
      labelledBy="projects-heading"
      tone="dark"
      fill
      decoration={
        <ArcRings size={640} onDark animate sx={{ right: -260, top: -220, opacity: 0.4 }} />
      }
    >
      <SectionHeading
        id="projects-heading"
        eyebrow="Our Work"
        title="Selected Projects"
        highlight="Projects"
        subtitle="Selected civil and infrastructure works associated with ARC Industries."
        action={
          <ArrowLink to={paths.projects} inverse>
            View All Projects
          </ArrowLink>
        }
        inverse
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: { xs: 3, md: 3.5 },
        }}
      >
        {recentProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 120}>
            <ProjectTile project={project} index={index} />
          </Reveal>
        ))}
      </Box>

      {hasIllustrativeImages && (
        <Typography
          variant="caption"
          component="p"
          sx={{ mt: 5, color: 'grey.400', [SHORT_SCREEN]: { mt: 2.5 } }}
        >
          Images marked “Illustrative image” are representative visuals. Actual project photographs
          will be added.
        </Typography>
      )}
    </Section>
  );
}
