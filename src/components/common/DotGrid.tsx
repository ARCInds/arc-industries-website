import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

interface DotGridProps {
  /** Positioning (and size) set by the parent; a single style object. */
  sx?: Exclude<SxProps<Theme>, readonly unknown[]>;
}

/** Faint blue dot grid that fades out at the edges. Decorative only. */
export default function DotGrid({ sx }: DotGridProps) {
  return (
    <Box
      aria-hidden
      sx={[
        (theme) => ({
          position: 'absolute',
          width: 320,
          height: 320,
          pointerEvents: 'none',
          backgroundImage: `radial-gradient(${alpha(theme.palette.secondary.main, 0.22)} 1.5px, transparent 1.5px)`,
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 72%)',
        }),
        sx ?? false,
      ]}
    />
  );
}
