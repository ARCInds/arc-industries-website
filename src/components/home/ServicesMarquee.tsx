import { Box } from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import { services } from '../../data/services';
import { SHORT_SCREEN } from '../../theme/theme';

const scroll = keyframes`from { transform: translateX(0); } to { transform: translateX(-50%); }`;

/**
 * Slowly scrolling band of service names. Decorative and hidden from assistive technology,
 * because the same services are listed in full in the section that follows.
 */
export default function ServicesMarquee() {
  // Two copies side by side make the loop seamless.
  const items = [...services, ...services];
  return (
    <Box
      aria-hidden
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 2, md: 2.5 },
        [SHORT_SCREEN]: { py: 1.5 },
        bgcolor: 'primary.main',
        backgroundImage: theme.brand.deepGradient,
        borderBlock: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
        // Soft fade at both edges.
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        '&:hover > div': { animationPlayState: 'paused' },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: `${scroll} 60s linear infinite`,
        }}
      >
        {items.map(({ title, icon: Icon }, index) => (
          <Box
            key={`${title}-${String(index)}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: { xs: 3, md: 4 },
              whiteSpace: 'nowrap',
              color: 'common.white',
              fontWeight: 650,
              fontSize: { xs: '0.9375rem', md: '1.0625rem' },
              letterSpacing: '0.01em',
            }}
          >
            <Box sx={{ display: 'flex', color: 'secondary.light' }}>
              <Icon size={20} strokeWidth={1.75} />
            </Box>
            {title}
            <Box
              sx={(theme) => ({
                ml: { xs: 3, md: 4 },
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.secondary.light, 0.6),
              })}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
