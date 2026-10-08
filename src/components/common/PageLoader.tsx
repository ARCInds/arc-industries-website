import { LinearProgress } from '@mui/material';

/** Thin progress bar shown while a page is loading. */
export default function PageLoader() {
  return (
    <LinearProgress
      color="secondary"
      aria-label="Loading page"
      sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'tooltip' }}
    />
  );
}
