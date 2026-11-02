import { Box } from '@mui/material';
import { useState } from 'react';
import { imageAlt } from '../../utils/a11y';
import IllustrativeLabel from './IllustrativeLabel';
import ImagePlaceholder from './ImagePlaceholder';

interface ProjectImageProps {
  src?: string;
  alt: string;
  /** Marks the image as illustrative rather than an actual project photograph. */
  isPlaceholder: boolean;
  aspectRatio?: string;
  /** Load immediately with high priority. Use only for images visible on first paint. */
  priority?: boolean;
}

/**
 * Image with a subtle "Illustrative image" label for temporary images. Falls back to a
 * placeholder box when no image is set or it fails to load. The image zooms slightly when
 * an ancestor with the `zoom-on-hover` class is hovered.
 */
export default function ProjectImage({
  src,
  alt,
  isPlaceholder,
  aspectRatio = '4 / 3',
  priority = false,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <ImagePlaceholder alt={alt} aspectRatio={aspectRatio} />;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio,
        overflow: 'hidden',
        borderRadius: 1.5,
        bgcolor: 'background.muted',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={imageAlt(alt, isPlaceholder)}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onError={() => {
          setFailed(true);
        }}
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.complex * 2,
            easing: theme.transitions.easing.easeOut,
          }),
          '.zoom-on-hover:hover &': { transform: 'scale(1.035)' },
        })}
      />
      {isPlaceholder && <IllustrativeLabel />}
    </Box>
  );
}
