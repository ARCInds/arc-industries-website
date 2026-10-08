import { Box, Typography } from '@mui/material';
import type { LucideIcon } from 'lucide-react';
import { formatIndex } from '../../utils/format';

interface NumberedListItem {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface NumberedListProps {
  items: NumberedListItem[];
}

/** Editorial list of numbered rows (number, title, description, optional icon). */
export default function NumberedList({ items }: NumberedListProps) {
  return (
    <Box
      component="ol"
      sx={{ listStyle: 'none', m: 0, p: 0, borderBottom: 1, borderColor: 'divider' }}
    >
      {items.map(({ title, description, icon: Icon }, index) => (
        <Box
          component="li"
          key={title}
          sx={(theme) => ({
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '96px 5fr 6fr 40px' },
            alignItems: 'start',
            columnGap: 4,
            rowGap: 1,
            py: { xs: 3.5, md: 4.5 },
            borderTop: 1,
            borderColor: 'divider',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -1,
              left: 0,
              width: '100%',
              height: 2,
              bgcolor: 'secondary.main',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.standard,
              }),
            },
            '&:hover::before': { transform: 'scaleX(1)' },
          })}
        >
          <Typography
            aria-hidden
            sx={{
              fontSize: { xs: '1rem', md: '1.75rem' },
              fontWeight: 600,
              lineHeight: 1.2,
              color: 'secondary.dark',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatIndex(index)}
          </Typography>
          <Typography variant="h5" component="h3" sx={{ color: 'primary.main' }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
          {Icon && (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                color: 'secondary.dark',
              }}
            >
              <Icon size={26} strokeWidth={1.5} aria-hidden />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
