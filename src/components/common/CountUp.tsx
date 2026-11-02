import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { visuallyHidden } from '../../utils/a11y';

interface CountUpProps {
  /** Display value, e.g. "13+". A leading number counts up; other text shows as-is. */
  value: string;
  durationMs?: number;
}

/** Counts a leading number up from zero when it scrolls into view (e.g. "0+" → "13+"). */
export default function CountUp({ value, durationMs = 1200 }: CountUpProps) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? '';
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setCurrent(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [inView, target, durationMs]);

  if (target === null) return value;

  return (
    <Box component="span" ref={ref}>
      {/* Screen readers get the final value, not every intermediate number. */}
      <Box component="span" aria-hidden>
        {inView ? current : 0}
        {suffix}
      </Box>
      <Box component="span" sx={visuallyHidden}>
        {value}
      </Box>
    </Box>
  );
}
