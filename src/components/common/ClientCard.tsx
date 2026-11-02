import { Box, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Building2, Landmark } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { paths } from '../../routes/paths';
import type { Client, Project } from '../../types/content';
import GradientText from './GradientText';
import IconBadge from './IconBadge';
import Reveal from './Reveal';
import { SHORT_SCREEN } from '../../theme/theme';

interface ClientCardProps {
  client: Client;
  index: number;
  /** Projects in the project data for this client, listed at the bottom of the card. */
  projects?: Project[];
}

/** White card for a client: icon, abbreviation, full name, related project. */
export default function ClientCard({ client, index, projects = [] }: ClientCardProps) {
  let footer: ReactNode = null;
  if (projects.length) {
    footer = (
      <Box
        sx={{
          mt: 'auto',
          pt: 2.5,
          borderTop: 1,
          borderColor: 'divider',
          [SHORT_SCREEN]: { pt: 1.25 },
        }}
      >
        {projects.map((project) => (
          <Typography
            key={project.title}
            variant="body2"
            title={project.title}
            sx={{
              color: 'text.secondary',
              // One line on desktop so the two rows of clients fit on one screen (full title on hover).
              whiteSpace: { md: 'nowrap' },
              overflow: { md: 'hidden' },
              textOverflow: { md: 'ellipsis' },
            }}
          >
            Related project:{' '}
            <Link component={RouterLink} to={paths.projects} sx={{ fontWeight: 600 }}>
              {project.title}
            </Link>
          </Typography>
        ))}
      </Box>
    );
  }

  return (
    <Reveal
      component="li"
      delay={index * 90}
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        [SHORT_SCREEN]: { gap: 1 },
        p: { xs: 2.5, md: 'clamp(16px, 2.6vh, 24px)' },
        borderRadius: 2,
        border: client.placeholder
          ? `1px dashed ${alpha(theme.palette.secondary.main, 0.35)}`
          : `1px solid ${theme.palette.divider}`,
        boxShadow: client.placeholder ? 'none' : theme.brand.cardShadow,
        bgcolor: client.placeholder ? alpha(theme.palette.common.white, 0.6) : 'background.paper',
        transition: theme.transitions.create(['transform', 'box-shadow', 'border-color']),
        '&::before': client.placeholder
          ? { display: 'none' }
          : {
              content: '""',
              position: 'absolute',
              insetInline: 0,
              top: 0,
              height: 3,
              backgroundImage: theme.brand.gradient,
            },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.brand.cardShadowHover,
          borderColor: alpha(theme.palette.secondary.main, 0.3),
        },
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <IconBadge icon={client.government ? Landmark : Building2} size={40} variant="soft" />
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontSize: { xs: '1.375rem', md: '1.25rem' }, fontWeight: 700, lineHeight: 1.2 }}
        >
          {client.placeholder ? (
            <Box
              component="span"
              sx={{
                display: 'block',
                color: 'text.secondary',
                fontSize: '0.9375rem',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {client.name}
            </Box>
          ) : (
            <GradientText>{client.shortName ?? client.name}</GradientText>
          )}
        </Typography>
      </Box>
      <Box>
        {(client.shortName ?? client.note) && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {client.shortName ? client.name : client.note}
          </Typography>
        )}
      </Box>
      {footer}
    </Reveal>
  );
}
