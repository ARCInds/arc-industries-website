import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';
import { SHORT_SCREEN } from '../../theme/theme';
import GridPattern from './GridPattern';

type SectionTone = 'default' | 'muted' | 'dark';

interface SectionProps {
  children: ReactNode;
  /** Id of the section's heading, used to label the region for assistive technology. */
  labelledBy?: string;
  tone?: SectionTone;
  /** Adds the faint engineering grid (dark tone only). */
  withGrid?: boolean;
  /** Decorative graphics positioned against the full-width section (e.g. ArcRings). */
  decoration?: ReactNode;
  /** Full-width content attached to the bottom edge of the section (e.g. a banner strip). */
  footer?: ReactNode;
  /** On desktop, fill exactly one screen below the header (always on when there is a footer). */
  fill?: boolean;
}

/** Consistent vertical rhythm, background tone and page width for a content section. */
export default function Section({
  children,
  labelledBy,
  tone = 'default',
  withGrid = false,
  decoration,
  footer,
  fill = Boolean(footer),
}: SectionProps) {
  return (
    <Box
      component="section"
      aria-labelledby={labelledBy}
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        pt: theme.layout.sectionPaddingY,
        pb: footer ? 0 : theme.layout.sectionPaddingY,
        bgcolor: {
          default: 'background.default',
          muted: 'background.muted',
          dark: 'primary.main',
        }[tone],
        backgroundImage: tone === 'dark' ? theme.brand.navyGradient : 'none',
        color: tone === 'dark' ? 'common.white' : 'text.primary',
        // Fills exactly one screen below the header on desktop, so a footer strip sits flush on
        // the bottom edge of the screen and the next section does not peek in underneath.
        // Responsive values (not a breakpoint block) so they merge with the padding above
        // instead of replacing its desktop value.
        ...(fill && {
          minHeight: { md: `calc(100vh - ${String(theme.layout.headerHeight.md)}px)` },
          '@supports (height: 100svh)': {
            minHeight: { md: `calc(100svh - ${String(theme.layout.headerHeight.md)}px)` },
          },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
        }),
      })}
    >
      {withGrid && tone === 'dark' && <GridPattern />}
      {decoration}
      <Container
        sx={{
          position: 'relative',
          // Content takes the space above the footer strip, centred vertically.
          ...(fill && {
            flexGrow: 1,
            display: { md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
          }),
        }}
      >
        {children}
      </Container>
      {footer && (
        <Box
          sx={(theme) => ({
            position: 'relative',
            mt: theme.layout.sectionPaddingY,
            [SHORT_SCREEN]: { mt: 2 },
          })}
        >
          {footer}
        </Box>
      )}
    </Box>
  );
}
