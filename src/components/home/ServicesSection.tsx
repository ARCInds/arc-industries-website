import { Box, Link, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router';
import { services } from '../../data/services';
import { paths } from '../../routes/paths';
import { formatIndex } from '../../utils/format';
import ArrowLink from '../common/ArrowLink';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';

export default function ServicesSection() {
  return (
    <Section labelledBy="services-heading" tone="muted">
      <SectionHeading
        id="services-heading"
        eyebrow="Our Capabilities"
        title="What We Do"
        subtitle="Civil, structural and infrastructure capabilities for Government, PSU and Private sector projects."
        action={<ArrowLink to={paths.services}>All Services</ArrowLink>}
      />

      {/* 1px gaps over a divider-coloured background draw the grid lines. */}
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: '1px',
          bgcolor: 'divider',
          border: 1,
          borderColor: 'divider',
        }}
      >
        {services.map(({ title, description, icon: Icon }, index) => (
          <Box
            component="li"
            key={title}
            sx={(theme) => ({
              position: 'relative',
              p: { xs: 3, md: 4 },
              bgcolor: 'background.paper',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -1,
                left: -1,
                right: -1,
                height: 3,
                bgcolor: 'secondary.main',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: theme.transitions.create('transform', {
                  duration: theme.transitions.duration.standard,
                }),
              },
              '&:hover::before': { transform: 'scaleX(1)' },
            })}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant="overline"
                sx={{ color: 'text.secondary', fontVariantNumeric: 'tabular-nums' }}
              >
                {formatIndex(index)}
              </Typography>
              <Box sx={{ color: 'secondary.dark', display: 'flex' }}>
                <Icon size={24} strokeWidth={1.5} aria-hidden />
              </Box>
            </Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: { xs: 2, md: 4 }, color: 'primary.main' }}
            >
              {title}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1.25, color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        ))}

        <Box
          component="li"
          sx={{
            p: { xs: 3, md: 4 },
            bgcolor: 'primary.main',
            color: 'common.white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h6" component="h3" sx={{ color: 'common.white' }}>
              Have a specific requirement?
            </Typography>
            <Typography variant="body2" sx={{ mt: 1.25, color: 'grey.400' }}>
              Share your project scope and we will discuss how ARC Industries can support it.
            </Typography>
          </Box>
          <Link
            component={RouterLink}
            to={paths.contact}
            underline="none"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 600,
              color: 'secondary.light',
              '&:hover': { color: 'common.white' },
            }}
          >
            Discuss Your Project
            <ArrowRight size={18} aria-hidden />
          </Link>
        </Box>
      </Box>
    </Section>
  );
}
