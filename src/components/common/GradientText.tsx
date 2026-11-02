import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  /** Use the brighter gradient on dark backgrounds. */
  onDark?: boolean;
}

interface HighlightedTextProps {
  text: string;
  /** Part of `text` to fill with the gradient. Ignored if not found. */
  highlight?: string;
  onDark?: boolean;
  /** Wrap the text before the highlight in its own span, so each part can sit on its own line. */
  splitLines?: boolean;
}

/** Renders `text` with its `highlight` phrase in gradient text. */
export function HighlightedText({
  text,
  highlight,
  onDark = false,
  splitLines = false,
}: HighlightedTextProps) {
  const start = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || start < 0) return text;
  if (splitLines) {
    return (
      <>
        <span>{text.slice(0, start).trim()}</span>{' '}
        <GradientText onDark={onDark}>{highlight}</GradientText>
      </>
    );
  }
  return (
    <>
      {text.slice(0, start)}
      <GradientText onDark={onDark}>{highlight}</GradientText>
      {text.slice(start + highlight.length)}
    </>
  );
}

/** Inline text filled with the logo's blue gradient, for highlighting a key phrase. */
export default function GradientText({ children, onDark = false }: GradientTextProps) {
  return (
    <Box
      component="span"
      sx={(theme) => ({
        backgroundImage: onDark ? theme.brand.textGradientOnDark : theme.brand.textGradientOnLight,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        // A text-shadow would show through the transparent fill and dull the gradient.
        textShadow: 'none',
        // Keeps the text visible in forced-colours / high-contrast modes.
        '@media (forced-colors: active)': { color: 'CanvasText', backgroundImage: 'none' },
      })}
    >
      {children}
    </Box>
  );
}
