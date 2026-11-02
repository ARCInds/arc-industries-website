import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MapPin } from 'lucide-react';
import type { Project } from '../../types/content';
import { imageAlt } from '../../utils/a11y';
import { formatIndex } from '../../utils/format';
import IllustrativeLabel from '../common/IllustrativeLabel';

interface ProjectTileProps {
  project: Project;
  index: number;
}

/**
 * Full-bleed photo tile with the project details over a navy gradient.
 * The description slides up on hover/focus on larger screens and is always shown on phones.
 */
export default function ProjectTile({ project, index }: ProjectTileProps) {
  const tag = project.client
    ? `Client: ${project.client}`
    : project.associatedProject
      ? `Project: ${project.associatedProject}`
      : undefined;

  return (
    <Box
      component="article"
      tabIndex={0}
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 440, md: 'clamp(300px, 46vh, 480px)' },
        borderRadius: 2,
        bgcolor: 'primary.dark',
        boxShadow: theme.brand.cardShadowHover,
        outline: 'none',
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.secondary.light}`,
          outlineOffset: 3,
        },
        '& .tile-image': {
          transition: theme.transitions.create('transform', { duration: 900 }),
        },
        '& .tile-description': {
          maxHeight: { xs: 200, md: 0 },
          opacity: { xs: 1, md: 0 },
          transition: theme.transitions.create(['max-height', 'opacity', 'margin'], {
            duration: theme.transitions.duration.standard,
          }),
        },
        '&:hover .tile-image, &:focus-visible .tile-image': { transform: 'scale(1.06)' },
        '&:hover .tile-description, &:focus-visible .tile-description': {
          maxHeight: 200,
          opacity: 1,
        },
        '&:hover .tile-bar, &:focus-visible .tile-bar': { width: 72 },
      })}
    >
      {project.image && (
        <Box
          className="tile-image"
          component="img"
          src={project.image}
          alt={imageAlt(project.imageAlt, project.isPlaceholderImage)}
          loading="lazy"
          decoding="async"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      {/* Navy gradient so the text stays readable over any photo. */}
      <Box
        aria-hidden
        sx={(theme) => ({
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.dark, 0.1)} 0%, ${alpha(theme.palette.primary.dark, 0.45)} 40%, ${alpha(theme.palette.primary.dark, 0.96)} 100%)`,
        })}
      />
      {project.isPlaceholderImage && <IllustrativeLabel placement="top-right" />}

      <Typography
        aria-hidden
        sx={{
          position: 'absolute',
          top: 18,
          left: 24,
          fontSize: '2.5rem',
          fontWeight: 800,
          lineHeight: 1,
          color: 'common.white',
          opacity: 0.85,
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 2px 12px rgba(0,0,0,0.35)',
        }}
      >
        {formatIndex(index)}
      </Typography>

      <Box sx={{ position: 'absolute', insetInline: 0, bottom: 0, p: { xs: 3, md: 3.5 } }}>
        <Box
          className="tile-bar"
          aria-hidden
          sx={(theme) => ({
            width: 40,
            height: 3,
            mb: 2,
            borderRadius: 2,
            backgroundImage: theme.brand.textGradientOnDark,
            transition: theme.transitions.create('width'),
          })}
        />
        {tag && (
          <Typography
            variant="caption"
            component="p"
            sx={{
              fontWeight: 650,
              letterSpacing: '0.04em',
              color: 'secondary.light',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </Typography>
        )}
        <Typography
          variant="h5"
          component="h3"
          sx={{ mt: 1, color: 'common.white', lineHeight: 1.3 }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.75, color: 'grey.300' }}
        >
          <MapPin size={14} aria-hidden />
          {project.location}
        </Typography>
        <Box className="tile-description" sx={{ overflow: 'hidden' }}>
          <Typography variant="body2" sx={{ pt: 1.5, color: 'grey.200' }}>
            {project.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
