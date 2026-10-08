import { Box, Typography } from '@mui/material';
import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  /** Describes the photograph that will replace this placeholder. */
  alt: string;
  aspectRatio?: string;
}

/** Reserved space for a photograph that has not been supplied yet. */
export default function ImagePlaceholder({ alt, aspectRatio = '4 / 3' }: ImagePlaceholderProps) {
  return (
    <Box
      role="img"
      aria-label={`Image placeholder: ${alt}`}
      sx={{
        aspectRatio,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        bgcolor: 'background.muted',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        color: 'text.secondary',
      }}
    >
      <ImageIcon size={32} strokeWidth={1.5} aria-hidden />
      <Typography variant="body2" aria-hidden>
        Photograph coming soon
      </Typography>
    </Box>
  );
}
