import { Box, Container, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { useId } from 'react';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import emblem from '../../assets/logo/arc-emblem.png';
import { company, contact } from '../../data/company';
import { siteImages } from '../../data/images';
import { footerNavigation } from '../../data/navigation';
import { paths } from '../../routes/paths';
import { SHORT_SCREEN } from '../../theme/theme';

const TAGLINE = 'Building Infrastructure. Delivering Trust.';

const CYAN = '#33C3FF';
const CYAN_RULE = 'linear-gradient(90deg, #00B8FF 0%, #0787F5 100%)';

// Construction photo blended into the top-right of the footer.
const backdrop = siteImages.footer;

// Brushed-silver finish for "INDUSTRIES", with a bright highlight and a darker band.
const metallicText = (stops: string) =>
  ({
    backgroundImage: `linear-gradient(180deg, ${stops})`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  }) as const;

// "ARC": the electric-blue gradient with a glossy highlight over the upper half and a slightly
// deeper lower half, for a polished-metal look.
const arcText = {
  backgroundImage: [
    'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 46%, rgba(0,20,70,0.22) 54%, rgba(0,20,70,0) 100%)',
    'linear-gradient(90deg, #00B8FF 0%, #0787F5 45%, #0750B5 100%)',
  ].join(', '),
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
} as const;

const silverText = metallicText(
  '#FFFFFF 0%, #F4F6F9 38%, #B3BCC8 50%, #8E99A9 58%, #C9D0D9 78%, #FFFFFF 100%',
);

/** Column heading with a short brand-blue rule beneath it. */
function FooterHeading({ children }: { children: string }) {
  return (
    <Typography
      variant="h4"
      component="h2"
      sx={{
        color: 'common.white',
        fontWeight: 700,
        fontSize: '1.5rem',
        mb: 2.5,
        [SHORT_SCREEN]: { mb: 1.75, fontSize: '1.25rem' },
        '&::after': {
          content: '""',
          display: 'block',
          width: 48,
          height: 3,
          mt: 1,
          borderRadius: 2,
          backgroundImage: CYAN_RULE,
        },
      }}
    >
      {children}
    </Typography>
  );
}

/** Emblem, a thin divider and the name set as "ARC / INDUSTRIES", linking to the home page. */
function FooterBrand() {
  return (
    <Box
      component={RouterLink}
      to={paths.home}
      aria-label={`${company.name} – Home`}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: { xs: 2, md: 3 },
        textDecoration: 'none',
      }}
    >
      <Box
        component="img"
        src={emblem}
        alt=""
        width={161}
        height={144}
        sx={{
          display: 'block',
          height: { xs: 72, md: 'clamp(80px, 13vh, 120px)' },
          width: 'auto',
          filter: 'drop-shadow(0 0 22px rgba(80, 160, 255, 0.5))',
        }}
      />
      <Box
        aria-hidden
        sx={(theme) => ({
          alignSelf: 'stretch',
          width: '1px',
          my: 1.5,
          bgcolor: alpha(theme.palette.common.white, 0.4),
        })}
      />
      <Box aria-hidden sx={(theme) => ({ fontFamily: theme.typography.h1.fontFamily })}>
        <Box
          component="span"
          sx={{
            ...arcText,
            display: 'block',
            width: 'fit-content',
            lineHeight: 1,
            fontSize: { xs: '2.25rem', md: 'clamp(2.25rem, 6.4vh, 3.375rem)' },
            fontWeight: 800,
            letterSpacing: '0.02em',
            // Extended letterforms, like the printed wordmark.
            transform: 'scaleX(1.3)',
            transformOrigin: 'left center',
            // A thin dark edge for depth, then a soft glow, as on the printed logo.
            filter:
              'drop-shadow(0 2px 0 rgba(2, 18, 60, 0.6)) drop-shadow(0 4px 14px rgba(40, 140, 255, 0.45))',
          }}
        >
          ARC
        </Box>
        <Box
          component="span"
          sx={{
            ...silverText,
            display: 'block',
            mt: 0.75,
            lineHeight: 1,
            fontSize: { xs: '1.375rem', md: 'clamp(1.375rem, 4vh, 2.125rem)' },
            fontWeight: 700,
            letterSpacing: '4px',
            filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.45))',
          }}
        >
          INDUSTRIES
        </Box>
      </Box>
    </Box>
  );
}

function ContactItem({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1.75 }}>
      <Box
        aria-hidden
        sx={(theme) => ({
          width: 34,
          height: 34,
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          color: 'common.white',
          backgroundImage: theme.brand.brightGradient,
          boxShadow: `0 6px 16px ${alpha(theme.palette.secondary.main, 0.45)}`,
        })}
      >
        <Icon size={16} />
      </Box>
      {children}
    </Box>
  );
}

/**
 * Decorative backdrop: a light curved edge and blue bands along the top, the construction
 * photo fading in at the top right, and swooshes in the bottom corners.
 */
function FooterArt() {
  const id = useId().replace(/:/g, '');
  return (
    <Box aria-hidden sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Photo, tinted blue and faded towards the text on the left and below. */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          right: 0,
          top: 0,
          width: '66%',
          height: '80%',
          backgroundImage: `url(${backdrop.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          filter: 'grayscale(1) sepia(1) hue-rotate(178deg) saturate(2.8) brightness(0.9)',
          mixBlendMode: 'normal',
          opacity: 0.78,
          maskImage:
            'linear-gradient(to right, transparent 0%, transparent 18%, black 42%), linear-gradient(to bottom, black 55%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      {/* Light curved edge and blue bands along the top. */}
      <Box
        component="svg"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        sx={{
          position: 'absolute',
          left: 0,
          top: -1,
          width: '100%',
          height: { xs: 96, md: 'clamp(130px, 30vh, 260px)' },
        }}
      >
        <defs>
          {/* Light area: white, cooling to a pale blue-grey towards its lower edge. */}
          <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E3EAF3" />
          </linearGradient>
          {/* Blue band under the light edge: deep blue on the left, brightening to cyan in the
              top-right corner. */}
          <linearGradient id={`${id}-band`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0F4CB2" />
            <stop offset="35%" stopColor="#0B3D98" />
            <stop offset="62%" stopColor="#0E4DB4" />
            <stop offset="84%" stopColor="#1C7BE6" />
            <stop offset="100%" stopColor="#2EC5FF" />
          </linearGradient>
          {/* Swoosh on the left: brighter blue at the top, deeper below. */}
          <linearGradient id={`${id}-swoosh`} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#2A72E0" />
            <stop offset="100%" stopColor="#0E47AE" />
          </linearGradient>
        </defs>
        {/* Two shapes meeting the light edge at one point: a swoosh curving down to the left
            edge, and a band sweeping up into the top-right corner. */}
        <path
          d="M0 138 C150 150 300 163 410 163 C280 180 90 210 0 258 Z"
          fill={`url(#${id}-swoosh)`}
        />
        <path
          d="M410 163 C620 163 860 100 1090 0 H1330 C1120 80 800 150 410 163 Z"
          fill={`url(#${id}-band)`}
        />
        {/* Light edge along the lower curves. */}
        <path
          d="M1330 0 C1120 80 800 150 410 163 C280 180 90 210 0 258"
          stroke="#7CC4FF"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Light area continuing the page above: dips gently, then sweeps up to the right. */}
        <path
          d="M0 0 H1090 C860 100 620 163 410 163 C300 163 150 150 0 138 Z"
          fill={`url(#${id}-light)`}
        />
      </Box>

      {/* Angular accents along the bottom bar: a blue shard in the bottom-left corner, and a
          blue wedge with a brushed-silver blade across it in the bottom-right corner. */}
      <Box
        component="svg"
        viewBox="0 0 1440 170"
        preserveAspectRatio="none"
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: { xs: 64, md: 'clamp(96px, 17vh, 150px)' },
        }}
      >
        <defs>
          <linearGradient id={`${id}-shard`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2A8BF5" />
            <stop offset="100%" stopColor="#0B4CBC" />
          </linearGradient>
          <linearGradient id={`${id}-wedge`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A3C9E" stopOpacity="0" />
            <stop offset="45%" stopColor="#0E52C4" />
            <stop offset="100%" stopColor="#2A8BF5" />
          </linearGradient>
          <linearGradient id={`${id}-silver`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8D99AB" />
            <stop offset="40%" stopColor="#D5DBE3" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E9EDF2" />
          </linearGradient>
          <linearGradient id={`${id}-blade`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0E52C4" />
            <stop offset="55%" stopColor="#1E8BFF" />
            <stop offset="100%" stopColor="#2AA8FF" />
          </linearGradient>
        </defs>

        {/* Faint lighter sweep across the bottom middle. */}
        <path
          d="M520 170 C760 140 1000 128 1240 118 L1240 170 Z"
          fill="#0E4DB4"
          fillOpacity="0.3"
        />

        {/* Bottom-left shard, with a brighter strip along its upper edge. */}
        <path d="M0 52 L250 170 H0 Z" fill={`url(#${id}-shard)`} />
        <path d="M0 52 L250 170 L205 170 L0 82 Z" fill="#5BB8FF" fillOpacity="0.55" />

        {/* Bottom-right blue wedge, the silver blade, and the blue corner below it. */}
        {/* Bottom-right: a soft blue sweep, a silver blade tapering to a point on the left, and
            a bright blue wedge directly beneath it. */}
        <path
          d="M800 170 C1000 150 1250 86 1440 28 V38 L940 170 Z"
          fill={`url(#${id}-wedge)`}
          fillOpacity="0.55"
        />
        <path d="M940 170 L1440 38 V88 L1050 170 Z" fill={`url(#${id}-silver)`} />
        <path d="M1050 170 L1440 88 V170 Z" fill={`url(#${id}-blade)`} />
      </Box>
    </Box>
  );
}

const columnDivider = (theme: Theme) => ({
  pl: { lg: 5 },
  borderLeft: { lg: `1px solid ${alpha(theme.palette.common.white, 0.4)}` },
});

const linkSx = {
  color: 'grey.200',
  fontSize: '1rem',
  transition: 'color 0.2s',
  '&:hover': { color: CYAN },
} as const;

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'primary.dark',
        backgroundImage: `radial-gradient(ellipse at 78% 20%, ${alpha('#00B8FF', 0.1)}, transparent 50%), linear-gradient(135deg, #051634 0%, #07214D 40%, #0A3373 72%, #031633 100%)`,
        color: 'grey.200',
        display: 'flex',
        flexDirection: 'column',
        // The footer is the last screen of every page on desktop.
        minHeight: { md: `calc(100vh - ${String(theme.layout.headerHeight.md)}px)` },
        '@supports (height: 100svh)': {
          minHeight: { md: `calc(100svh - ${String(theme.layout.headerHeight.md)}px)` },
        },
      })}
    >
      <FooterArt />
      {backdrop.isPlaceholder && (
        <Typography
          variant="caption"
          sx={(theme) => ({
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            right: 16,
            // Just below the bright band at the right-hand edge.
            top: 'calc(clamp(130px, 30vh, 260px) * 0.12 + 8px)',
            px: 1,
            py: 0.25,
            borderRadius: 0.5,
            fontSize: '0.6875rem',
            color: 'common.white',
            bgcolor: alpha(theme.palette.primary.dark, 0.7),
          })}
        >
          Illustrative image
        </Typography>
      )}

      <Container
        sx={{
          position: 'relative',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 'clamp(130px, 27vh, 230px)' },
          pb: { xs: 5, md: 'clamp(24px, 5vh, 48px)' },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            // Desktop: three columns. Tablet: brand on its own row, Explore and Contact below.
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '48fr 28fr 24fr' },
            alignItems: 'end',
            gap: { xs: 5, lg: 5 },
            '& > :first-of-type': { gridColumn: { sm: '1 / -1', lg: 'auto' } },
          }}
        >
          <Box>
            <FooterBrand />
            <Typography
              component="p"
              sx={{
                mt: { xs: 2, md: 'clamp(12px, 2.4vh, 22px)' },
                color: 'common.white',
                fontSize: { xs: '0.75rem', md: '0.8125rem' },
                fontWeight: 500,
                letterSpacing: { xs: '2px', md: '3px' },
                textTransform: 'uppercase',
                whiteSpace: { md: 'nowrap' },
              }}
            >
              {TAGLINE}
            </Typography>
            <Box
              aria-hidden
              sx={{
                width: 110,
                height: 3,
                mt: 1.5,
                borderRadius: 2,
                backgroundImage: CYAN_RULE,
              }}
            />
            <Typography
              sx={{
                mt: { xs: 2.5, md: 'clamp(14px, 2.6vh, 24px)' },
                maxWidth: 580,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'grey.200',
              }}
            >
              {company.summary}
            </Typography>
          </Box>

          <Box sx={columnDivider}>
            <FooterHeading>Explore</FooterHeading>
            <Box component="nav" aria-label="Footer">
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, max-content)',
                  columnGap: 4,
                  rowGap: 1.5,
                  [SHORT_SCREEN]: { rowGap: 1 },
                }}
              >
                {footerNavigation.map((item) => (
                  <li key={item.path}>
                    <Link
                      component={RouterLink}
                      to={item.path}
                      sx={{
                        ...linkSx,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        '& svg': { color: '#1E8FFF', transition: 'transform 0.2s' },
                        '&:hover svg': { transform: 'translateX(3px)' },
                      }}
                    >
                      <ChevronRight size={20} strokeWidth={3} aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={columnDivider}>
            <FooterHeading>Contact</FooterHeading>
            <Box component="address" sx={{ fontStyle: 'normal' }}>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                  display: 'grid',
                  rowGap: 1.5,
                  [SHORT_SCREEN]: { rowGap: 1 },
                  '& p, & a': { whiteSpace: { md: 'nowrap' } },
                }}
              >
                <ContactItem icon={MapPin}>
                  <Typography sx={{ color: 'grey.200' }}>{contact.location}</Typography>
                </ContactItem>
                <ContactItem icon={Phone}>
                  <Link href={contact.phoneHref} sx={linkSx}>
                    {contact.phoneInternational}
                  </Link>
                </ContactItem>
                <ContactItem icon={Mail}>
                  <Link href={contact.emailHref} sx={linkSx}>
                    {contact.email}
                  </Link>
                </ContactItem>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Bottom bar. */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: alpha('#040F26', 0.35),
          // Bright cyan line along the top of the bar.
          '&::before': {
            content: '""',
            position: 'absolute',
            insetInline: 0,
            top: 0,
            height: '2px',
            backgroundImage: 'linear-gradient(90deg, #1E9BFF 0%, #33C3FF 50%, #1E9BFF 100%)',
            boxShadow: `0 0 8px ${alpha('#33C3FF', 0.5)}`,
          },
        }}
      >
        <Container
          sx={(theme) => ({
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 3 },
            pt: { xs: 3, md: 'clamp(16px, 3vh, 28px)' },
            pb: { xs: 7, md: 'clamp(40px, 9vh, 88px)' },
            '& > :last-of-type': {
              pl: { sm: 3 },
              borderLeft: { sm: `1px solid ${alpha(theme.palette.common.white, 0.35)}` },
            },
          })}
        >
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {company.registration} - {company.location}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
