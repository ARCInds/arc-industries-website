import { Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface IllustrativeLabelProps {
  placement?: 'bottom-left' | 'top-right';
}

/**
 * Subtle tag marking an image as illustrative rather than an actual ARC Industries
 * photograph. Hidden from screen readers because the image alt text already says so.
 */
export default function IllustrativeLabel({ placement = 'bottom-left' }: IllustrativeLabelProps) {
  const [vertical, horizontal] = placement === 'top-right' ? ['top', 'right'] : ['bottom', 'left'];

  return (
    <Typography
      variant="caption"
      aria-hidden
      title="Illustrative image. Actual project photograph to be added."
      sx={(theme) => ({
        position: 'absolute',
        [vertical]: 8,
        [horizontal]: 8,
        px: 1,
        py: 0.25,
        borderRadius: 0.5,
        color: 'common.white',
        bgcolor: alpha(theme.palette.primary.dark, 0.72),
        letterSpacing: '0.02em',
      })}
    >
      Illustrative image
    </Typography>
  );
}
