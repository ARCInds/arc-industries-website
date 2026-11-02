import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  /** Badge size in px. */
  size?: number;
  /** `solid`: brand gradient with a white icon. `soft`: light blue tint with a blue icon. */
  variant?: 'solid' | 'soft';
}

/** Rounded tile holding a decorative icon in the brand colours. */
export default function IconBadge({ icon: Icon, size = 48, variant = 'solid' }: IconBadgeProps) {
  const solid = variant === 'solid';
  return (
    <Box
      aria-hidden
      sx={(theme) => ({
        width: size,
        height: size,
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 1.5,
        color: solid ? 'common.white' : 'secondary.main',
        backgroundImage: solid ? theme.brand.gradient : 'none',
        bgcolor: solid ? 'secondary.main' : alpha(theme.palette.secondary.main, 0.08),
        boxShadow: solid ? `0 8px 18px ${alpha(theme.palette.secondary.main, 0.28)}` : 'none',
      })}
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={1.75} />
    </Box>
  );
}
