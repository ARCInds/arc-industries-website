import { Box, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import { services } from '../../data/services';
import { paths } from '../../routes/paths';
import ArcRings from '../common/ArcRings';
import ArrowLink from '../common/ArrowLink';
import IconBadge from '../common/IconBadge';
import Reveal from '../common/Reveal';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import { SHORT_SCREEN } from '../../theme/theme';

export default function ServicesSection() {
  return (
    <Section labelledBy="services-heading" tone="muted" fill>
      <SectionHeading
        id="services-heading"
        eyebrow="Our Capabilities"
        title="What We Do"
        highlight="We Do"
        action={<ArrowLink to={paths.services}>All Services</ArrowLink>}
      />

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gridAutoRows: '1fr',
          // The card rows stretch to fill the screen.
          flexGrow: { md: 1 },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {services.map(({ title, description, icon }, index) => (
          <Reveal
            component="li"
            delay={index * 70}
            key={title}
            sx={(theme) => ({
              position: 'relative',
              overflow: 'hidden',
              p: { xs: 3, md: 'clamp(20px, 2.8vh, 28px)' },
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.brand.cardShadow,
              transition: theme.transitions.create(['transform', 'box-shadow', 'border-color']),
              '&::before': {
                content: '""',
                position: 'absolute',
                insetInline: 0,
                top: 0,
                height: 3,
                backgroundImage: theme.brand.gradient,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: theme.transitions.create('transform', {
                  duration: theme.transitions.duration.standard,
                }),
              },
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.brand.cardShadowHover,
                borderColor: alpha(theme.palette.secondary.main, 0.3),
              },
              '&:hover::before': { transform: 'scaleX(1)' },
            })}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconBadge icon={icon} size={44} />
              <Typography
                variant="h6"
                component="h3"
                sx={{ color: 'primary.main', lineHeight: 1.3 }}
              >
                {title}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                color: 'text.secondary',
                // Short preview on the homepage; the Services page shows the full text.
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: { md: 3 },
                overflow: 'hidden',
              }}
            >
              {description}
            </Typography>
          </Reveal>
        ))}

        <Reveal
          component="li"
          delay={services.length * 70}
          sx={(theme) => ({
            position: 'relative',
            overflow: 'hidden',
            p: { xs: 3, md: 'clamp(20px, 2.8vh, 28px)' },
            borderRadius: 2,
            bgcolor: 'secondary.dark',
            backgroundImage: theme.brand.deepGradient,
            color: 'common.white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            // Compact on short screens so this card does not set a taller height for every row.
            [SHORT_SCREEN]: { gap: 1 },
            boxShadow: theme.brand.glow,
          })}
        >
          <ArcRings size={260} onDark sx={{ right: -90, bottom: -110, opacity: 0.7 }} />
          <Box sx={{ position: 'relative' }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ color: 'common.white', [SHORT_SCREEN]: { fontSize: '0.9375rem' } }}
            >
              Have a specific requirement?
            </Typography>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mt: 1.25,
                [SHORT_SCREEN]: { mt: 0.75 },
                color: alpha(theme.palette.common.white, 0.88),
              })}
            >
              Share your project scope and we will discuss how ARC Industries can support it.
            </Typography>
          </Box>
          <Link
            component={RouterLink}
            to={paths.contact}
            underline="none"
            sx={(theme) => ({
              position: 'relative',
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              [SHORT_SCREEN]: { py: 0.625 },
              borderRadius: 1,
              whiteSpace: 'nowrap',
              fontWeight: 650,
              color: 'secondary.dark',
              bgcolor: 'common.white',
              '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.9) },
            })}
          >
            Discuss Your Project
            <ArrowRight size={18} aria-hidden />
          </Link>
        </Reveal>
      </Box>
    </Section>
  );
}
