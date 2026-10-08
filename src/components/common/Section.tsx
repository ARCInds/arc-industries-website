import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';
import GridPattern from './GridPattern';

type SectionTone = 'default' | 'muted' | 'dark';

interface SectionProps {
  children: ReactNode;
  /** Id of the section's heading, used to label the region for assistive technology. */
  labelledBy?: string;
  tone?: SectionTone;
  /** Adds the faint engineering grid (dark tone only). */
  withGrid?: boolean;
}

const backgrounds: Record<SectionTone, string> = {
  default: 'background.default',
  muted: 'background.muted',
  dark: 'primary.main',
};

/** Consistent vertical rhythm, background tone and page width for a content section. */
export default function Section({
  children,
  labelledBy,
  tone = 'default',
  withGrid = false,
}: SectionProps) {
  return (
    <Box
      component="section"
      aria-labelledby={labelledBy}
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        py: theme.layout.sectionPaddingY,
        bgcolor: backgrounds[tone],
        color: tone === 'dark' ? 'common.white' : 'text.primary',
      })}
    >
      {withGrid && tone === 'dark' && <GridPattern />}
      <Container sx={{ position: 'relative' }}>{children}</Container>
    </Box>
  );
}
