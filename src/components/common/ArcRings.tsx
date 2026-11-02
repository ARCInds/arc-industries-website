import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { keyframes } from '@mui/material/styles';
import { useId } from 'react';

const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;

interface ArcRingsProps {
  /** Rendered width and height in px (the graphic is square). */
  size?: number;
  /** Use brighter strokes for dark backgrounds. */
  onDark?: boolean;
  /** Rotate very slowly (stopped automatically for reduced motion). */
  animate?: boolean;
  /** Positioning and opacity, set by the parent (a single style object or function). */
  sx?: Exclude<SxProps<Theme>, readonly unknown[]>;
}

/**
 * Decorative graphic echoing the logo: partial blue rings with a silver orbital swoosh.
 * Purely decorative, so it is hidden from assistive technology.
 */
export default function ArcRings({
  size = 480,
  onDark = false,
  animate = false,
  sx,
}: ArcRingsProps) {
  const id = useId().replace(/:/g, '');
  return (
    <Box
      component="svg"
      aria-hidden
      viewBox="0 0 400 400"
      width={size}
      height={size}
      sx={[
        {
          position: 'absolute',
          pointerEvents: 'none',
          animation: animate ? `${spin} 90s linear infinite` : 'none',
        },
        sx ?? false,
      ]}
    >
      <defs>
        <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#33A8F2" stopOpacity={onDark ? 0.9 : 0.75} />
          <stop offset="55%" stopColor="#0057B8" stopOpacity={onDark ? 0.55 : 0.45} />
          <stop offset="100%" stopColor="#0057B8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8A94A0" stopOpacity="0" />
          <stop offset="45%" stopColor={onDark ? '#E4E9EF' : '#8A94A0'} stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C9D1DA" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Outer ring, open at the lower right like the logo */}
      <circle
        cx="200"
        cy="200"
        r="180"
        fill="none"
        stroke={`url(#${id}-blue)`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="760 371"
        transform="rotate(150 200 200)"
      />
      {/* Inner ring */}
      <circle
        cx="200"
        cy="200"
        r="146"
        fill="none"
        stroke={`url(#${id}-blue)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="420 497"
        transform="rotate(200 200 200)"
      />
      {/* Orbital steel swoosh */}
      <ellipse
        cx="200"
        cy="210"
        rx="215"
        ry="56"
        fill="none"
        stroke={`url(#${id}-steel)`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="640 380"
        transform="rotate(-16 200 210)"
      />
    </Box>
  );
}
