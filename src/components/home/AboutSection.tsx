import { Box, Grid, Typography } from '@mui/material';
import { company, companySnapshot } from '../../data/company';
import { siteImages } from '../../data/images';
import { paths } from '../../routes/paths';
import ArrowLink from '../common/ArrowLink';
import FactList from '../common/FactList';
import ProjectImage from '../common/ProjectImage';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

export default function AboutSection() {
  return (
    <Section labelledBy="about-heading">
      <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionHeading
            id="about-heading"
            eyebrow="About ARC Industries"
            title="Professional execution for public and private sector projects"
            dense
          />
          <Typography sx={{ color: 'text.secondary' }}>
            {company.summary} {company.focus}
          </Typography>

          <Box sx={{ mt: 4, mb: 5 }}>
            <FactList facts={companySnapshot} />
          </Box>

          <ArrowLink to={paths.about}>More About ARC</ArrowLink>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: 'relative', pl: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
            {/* Offset engineering frame behind the image. Decorative only. */}
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '72%',
                height: '72%',
                border: 1,
                borderColor: 'secondary.main',
              }}
            />
            <Box sx={{ position: 'relative' }}>
              <ProjectImage
                src={siteImages.about.src}
                alt={siteImages.about.alt}
                isPlaceholder={siteImages.about.isPlaceholder}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
}
