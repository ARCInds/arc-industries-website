import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface GridPatternProps {
  /** Grid cell size in px. */
  size?: number;
}

/** Faint engineering grid lines for dark surfaces, fading out to the right. Decorative only. */
export default function GridPattern({ size = 72 }: GridPatternProps) {
  return (
    <Box
      aria-hidden
      sx={(theme) => {
        const line = alpha(theme.palette.common.white, 0.05);
        return {
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: `${String(size)}px ${String(size)}px`,
          maskImage: 'linear-gradient(to right, black 0%, transparent 80%)',
        };
      }}
    />
  );
}
