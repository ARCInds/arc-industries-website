/** Hides content visually while keeping it available to screen readers. */
export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;

/** Alt text that tells screen-reader users when an image is only illustrative. */
export function imageAlt(alt: string, isPlaceholder: boolean): string {
  return isPlaceholder ? `Illustrative image: ${alt}` : alt;
}
