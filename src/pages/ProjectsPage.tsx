import { Typography } from '@mui/material';
import ArcRings from '../components/common/ArcRings';
import DotGrid from '../components/common/DotGrid';
import PageHero from '../components/common/PageHero';
import ProjectCard from '../components/common/ProjectCard';
import Section from '../components/common/Section';
import { recentProjects } from '../data/projects';
import { pageHeroImages } from '../data/images';
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
        background={pageHeroImages.projects}
        eyebrow="Our Projects"
        title="Selected civil and infrastructure works."
        subtitle="A selection of works associated with ARC Industries in Bengaluru. This is not a complete list of the company's projects."
      />

      {/* One full-screen block per project on desktop, so each project snaps into view. */}
      {recentProjects.map((project, index) => {
        const isFirst = index === 0;
        const isLast = index === recentProjects.length - 1;
        return (
          <Section
            key={project.title}
            labelledBy={isFirst ? 'project-list-heading' : undefined}
            fill
            decoration={
              index % 2 === 0 ? (
                <>
                  <ArcRings size={620} animate sx={{ right: -280, top: 60, opacity: 0.3 }} />
                  <DotGrid sx={{ left: 20, bottom: 40 }} />
                </>
              ) : (
                <>
                  <ArcRings size={520} animate sx={{ left: -260, bottom: 40, opacity: 0.25 }} />
                  <DotGrid sx={{ right: 20, top: 60 }} />
                </>
              )
            }
          >
            {isFirst && (
              <Typography id="project-list-heading" component="h2" sx={visuallyHidden}>
                Project details
              </Typography>
            )}
            <ProjectCard
              project={project}
              variant="detailed"
              reverse={index % 2 === 1}
              priority={isFirst}
              index={index}
            />

            {isLast && hasIllustrativeImages && (
              <Typography
                variant="caption"
                component="p"
                sx={{
                  mt: { xs: 8, md: 'clamp(24px, 5vh, 48px)' },
                  pt: 2,
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
        );
      })}
    </>
  );
}
