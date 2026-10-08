/** Formats a zero-based list index as a two-digit label, e.g. 0 → "01". */
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}
