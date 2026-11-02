import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { keyframes } from '@mui/material/styles';
import type { ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: none; }
`;

interface RevealProps {
  children: ReactNode;
  /** Element to render, e.g. "li" when the revealed item is a list item. */
  component?: ElementType;
  /** Delay in ms, for staggering items in a group. */
  delay?: number;
  /** Extra styles for the element (a single style object or function). */
  sx?: Exclude<SxProps<Theme>, readonly unknown[]>;
}

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * Uses a one-off animation (not a transition), so the element's own hover transitions
 * and transforms keep working once it has appeared.
 */
export default function Reveal({ children, component = 'div', delay = 0, sx }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Box
      ref={ref}
      component={component}
      sx={[
        inView
          ? {
              animation: `${fadeUp} 700ms cubic-bezier(0.2, 0.7, 0.2, 1) ${String(delay)}ms backwards`,
            }
          : { opacity: 0 },
        sx ?? false,
      ]}
    >
      {children}
    </Box>
  );
}
