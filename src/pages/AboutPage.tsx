import { Box, Grid, Typography } from '@mui/material';
import FactList from '../components/common/FactList';
import PageHero from '../components/common/PageHero';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import PurposeSection from '../components/home/PurposeSection';
import QualitySafetySection from '../components/home/QualitySafetySection';
import { aboutOverview, companySnapshot } from '../data/company';
import { pageHeroImages } from '../data/images';
import { pageMeta } from '../data/seo';
import { usePageMeta } from '../hooks/usePageMeta';

export default function AboutPage() {
  usePageMeta(pageMeta.about);

  return (
    <>
      <PageHero
        breadcrumb="About"
        background={pageHeroImages.about}
        eyebrow="About ARC Industries"
        title="Building with experience. Executing with responsibility."
        subtitle="ARC Industries is a Bengaluru-based construction company working across Government, PSU and Private sector projects."
      />

      <Section labelledBy="overview-heading" fill>
        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <SectionHeading
              id="overview-heading"
              eyebrow="Company Overview"
              title="Construction for Government, PSU and Private sector projects"
              dense
            />
            {aboutOverview.map((paragraph) => (
              <Typography key={paragraph} sx={{ mb: 2.5, color: 'text.secondary' }}>
                {paragraph}
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={(theme) => ({
                position: 'relative',
                overflow: 'hidden',
                p: { xs: 3, md: 4 },
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.brand.cardShadowHover,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  insetInline: 0,
                  top: 0,
                  height: 4,
                  backgroundImage: theme.brand.gradient,
                },
              })}
            >
              <Typography
                variant="overline"
                component="h3"
                sx={{ display: 'block', mb: 2, color: 'secondary.dark' }}
              >
                Company Snapshot
              </Typography>
              <FactList facts={companySnapshot} />
            </Box>
          </Grid>
        </Grid>
      </Section>

      <PurposeSection />
      <QualitySafetySection />
    </>
  );
}
