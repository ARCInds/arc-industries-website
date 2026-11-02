import { Box } from '@mui/material';
import { useId } from 'react';

/**
 * Two swooshes along the bottom edge of the hero, as in the reference design:
 * - bottom-left: a blue band and a lighter band rising from the left edge and tapering into
 *   the bottom about 40% across;
 * - bottom-right, top to bottom: a thin white streak, a deep blue band, a medium blue band and
 *   a light-blue corner, all curving up steeply to the right edge.
 * Decorative only.
 */
export function HeroWave() {
  const id = useId().replace(/:/g, '');
  return (
    <Box
      component="svg"
      aria-hidden
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      sx={(theme) => ({
        position: 'absolute',
        left: 0,
        bottom: -1,
        width: '100%',
        height: theme.layout.heroWaveHeight,
        pointerEvents: 'none',
      })}
    >
      <defs>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6CC4FF" />
          <stop offset="100%" stopColor="#2F86F5" />
        </linearGradient>
        <linearGradient id={`${id}-streak`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="35%" stopColor="#F2F5F8" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id={`${id}-deep`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0A3FA8" />
          <stop offset="100%" stopColor="#0B52C4" />
        </linearGradient>
        <linearGradient id={`${id}-corner`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A8CF0" />
          <stop offset="100%" stopColor="#6CB9FF" />
        </linearGradient>
      </defs>

      {/* Bottom-left: medium blue band, then the lighter band beneath it */}
      <path
        d="M0 112 C 210 140, 410 182, 640 220 L 540 220 C 360 196, 180 174, 0 160 Z"
        fill="#1B67DB"
        opacity="0.92"
      />
      <path d="M0 160 C 180 174, 360 196, 540 220 L 0 220 Z" fill={`url(#${id}-light)`} />

      {/* Bottom-right: thin white streak */}
      <path
        d="M560 220 C 920 214, 1220 150, 1440 30 L 1440 46 C 1230 160, 940 216, 620 220 Z"
        fill={`url(#${id}-streak)`}
      />
      {/* Deep blue band */}
      <path
        d="M620 220 C 940 216, 1230 160, 1440 46 L 1440 92 C 1260 180, 1010 218, 760 220 Z"
        fill={`url(#${id}-deep)`}
      />
      {/* Medium blue band */}
      <path
        d="M760 220 C 1010 218, 1260 180, 1440 92 L 1440 122 C 1290 192, 1080 219, 880 220 Z"
        fill="#2A7CEB"
      />
      {/* Light-blue corner */}
      <path d="M880 220 C 1080 219, 1290 192, 1440 122 L 1440 220 Z" fill={`url(#${id}-corner)`} />
    </Box>
  );
}
