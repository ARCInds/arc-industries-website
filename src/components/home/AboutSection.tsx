import { Box, Grid, Typography } from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import { company, companySnapshot, highlights } from '../../data/company';
import { siteImages } from '../../data/images';
import { paths } from '../../routes/paths';
import ArcRings from '../common/ArcRings';
import ArrowLink from '../common/ArrowLink';
import CountUp from '../common/CountUp';
import FactList from '../common/FactList';
import IconBadge from '../common/IconBadge';
import ProjectImage from '../common/ProjectImage';
import Reveal from '../common/Reveal';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import ServicesMarquee from './ServicesMarquee';
import { SHORT_SCREEN } from '../../theme/theme';

// "13+ Years of Experience", shown as a floating badge on the image.
const experience = highlights[0];

const float = keyframes`0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); }`;

export default function AboutSection() {
  return (
    <Section
      labelledBy="about-heading"
      footer={<ServicesMarquee />}
      decoration={
        <ArcRings
          size={620}
          sx={{ display: { xs: 'none', md: 'block' }, right: -260, top: 40, opacity: 0.35 }}
        />
      }
    >
      <Grid container spacing={{ xs: 6, md: 10 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <SectionHeading
            id="about-heading"
            eyebrow="About ARC Industries"
            title="Professional execution for Public and Private sector projects"
            highlight="Public and Private sector projects"
            splitLines
            titleSize="min(2.25rem, 3vw, 5vh)"
            dense
          />
          <Typography sx={{ color: 'text.secondary' }}>
            {company.summary} {company.focus}
          </Typography>

          <Box sx={{ mt: 4, mb: 5, [SHORT_SCREEN]: { mt: 1.5, mb: 2 } }}>
            <FactList facts={companySnapshot} />
          </Box>

          <ArrowLink to={paths.about}>More About ARC</ArrowLink>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Reveal
            delay={150}
            sx={{ position: 'relative', pl: { xs: 2, md: 4 }, pb: { xs: 2, md: 4 } }}
          >
            {/* Offset gradient block behind the image. Decorative only. */}
            <Box
              aria-hidden
              sx={(theme) => ({
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '78%',
                height: '78%',
                borderRadius: 2,
                backgroundImage: theme.brand.gradient,
                opacity: 0.9,
              })}
            />
            <Box
              sx={(theme) => ({
                position: 'relative',
                borderRadius: 2,
                boxShadow: theme.brand.cardShadowHover,
                [SHORT_SCREEN]: { '& > div': { aspectRatio: '2 / 1' } },
              })}
            >
              <ProjectImage
                src={siteImages.about.src}
                alt={siteImages.about.alt}
                isPlaceholder={siteImages.about.isPlaceholder}
              />
            </Box>
            {/* Floating experience badge */}
            <Box
              sx={(theme) => ({
                position: 'absolute',
                top: { xs: -20, md: 32 },
                right: { xs: 12, md: -24 },
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2.25,
                py: 1.75,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.common.white, 0.96),
                boxShadow: theme.brand.cardShadowHover,
                animation: `${float} 6s ease-in-out infinite`,
              })}
            >
              <IconBadge icon={experience.icon} size={44} />
              <Box>
                <Typography
                  component="p"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: 'primary.main',
                  }}
                >
                  <CountUp value={experience.value} />
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.3 }}>
                  {experience.label}
                </Typography>
              </Box>
            </Box>
          </Reveal>
        </Grid>
      </Grid>
    </Section>
  );
}
