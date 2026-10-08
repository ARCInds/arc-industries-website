import { Box, Typography } from '@mui/material';
import type { Fact } from '../../types/content';

interface FactListProps {
  facts: Fact[];
}

/** Ruled label/value list for verified company facts. */
export default function FactList({ facts }: FactListProps) {
  return (
    <Box component="dl" sx={{ m: 0 }}>
      {facts.map(({ label, value }) => (
        <Box
          key={label}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '140px 1fr' },
            gap: { xs: 0.25, sm: 2 },
            py: 1.75,
            borderTop: 1,
            borderColor: 'divider',
            '&:last-of-type': { borderBottom: 1, borderColor: 'divider' },
          }}
        >
          <Typography
            component="dt"
            variant="overline"
            sx={{ color: 'text.secondary', lineHeight: 1.9 }}
          >
            {label}
          </Typography>
          <Typography component="dd" sx={{ m: 0, fontWeight: 600, color: 'primary.main' }}>
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
