import type { Shadows } from '@mui/material/styles';
import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';

/** Layout tokens shared by sections and the header. Values are MUI spacing units or px. */
interface LayoutTokens {
  headerHeight: { xs: number; md: number };
  /** Slim contact bar above the header (hidden on small screens). */
  topBarHeight: { xs: number; md: number };
  /** Vertical padding of content sections (CSS lengths; scales with screen height on desktop). */
  sectionPaddingY: { xs: string; md: string };
  /** Height of the homepage hero's bottom swooshes (CSS lengths). */
  heroWaveHeight: { xs: string; md: string };
}

/** Brand graphics derived from the ARC Industries logo (blue arcs and steel swoosh). */
interface BrandTokens {
  /** Royal-blue gradient for buttons, badges and accent bars (white text stays ≥4.5:1). */
  gradient: string;
  /** Deeper navy-to-blue gradient for large panels that hold body text. */
  deepGradient: string;
  /** Vivid blue for the hero call to action (white text stays ≥4.5:1). */
  brightGradient: string;
  /** Deep navy gradient for dark sections and page headers. */
  navyGradient: string;
  /** Gradient for highlighted words on dark backgrounds. */
  textGradientOnDark: string;
  /** Gradient for highlighted words on light backgrounds. */
  textGradientOnLight: string;
  /** Silver steel tones from the logo swoosh. */
  steel: { light: string; main: string; dark: string };
  /** Bright azure highlight from the logo ring. */
  azure: string;
  /** Soft blue glow for primary calls to action and raised cards. */
  glow: string;
  /** Resting and hover shadows for cards. */
  cardShadow: string;
  cardShadowHover: string;
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    /** Cool light tint used to alternate page sections. */
    muted: string;
  }
  interface Theme {
    layout: LayoutTokens;
    brand: BrandTokens;
  }
  interface ThemeOptions {
    layout?: LayoutTokens;
    brand?: BrandTokens;
  }
}

// ---------------------------------------------------------------------------
// Brand tokens, sampled from the ARC Industries logo. Change colours here only.
// ---------------------------------------------------------------------------
const navy = { main: '#0A1F44', light: '#15336B', dark: '#061532' };
// `light` is for text and accents on dark backgrounds (≥4.5:1 on navy and on blue.dark).
const blue = { main: '#0057B8', light: '#6CC0F7', dark: '#00408C' };
const azure = '#00A0F0';
const steel = { light: '#C9D1DA', main: '#8A94A0', dark: '#4A505A' };
const neutral = {
  white: '#FFFFFF',
  muted: '#F3F6FA',
  border: '#DFE5EE',
  text: '#0F1B2D',
  textSecondary: '#55606E',
};

const fontFamily =
  '"Inter Variable", Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// Headings: a wide, steady corporate sans; body text stays in Inter.
const headingFontFamily = `"Montserrat Variable", Montserrat, ${fontFamily}`;

// Blue-tinted elevation. Only the first few levels are distinct.
const shadows = [
  'none',
  `0 1px 2px ${alpha(navy.main, 0.06)}`,
  `0 4px 14px ${alpha(navy.main, 0.08)}`,
  `0 14px 36px ${alpha(navy.main, 0.12)}`,
  ...Array<string>(21).fill(`0 20px 48px ${alpha(navy.main, 0.16)}`),
] as Shadows;

const brand: BrandTokens = {
  gradient: `linear-gradient(135deg, ${blue.dark} 0%, ${blue.main} 55%, #0A73D1 100%)`,
  deepGradient: `linear-gradient(120deg, ${navy.main} 0%, ${blue.dark} 50%, ${blue.main} 100%)`,
  brightGradient: 'linear-gradient(90deg, #0057D9 0%, #0A6CF0 100%)',
  navyGradient: `linear-gradient(135deg, ${navy.dark} 0%, ${navy.main} 55%, #0F2E66 100%)`,
  textGradientOnDark: 'linear-gradient(90deg, #3DA9FF 0%, #6FE0FF 100%)',
  textGradientOnLight: `linear-gradient(90deg, ${blue.dark} 0%, ${blue.main} 55%, #0089D6 100%)`,
  steel,
  azure,
  glow: `0 10px 28px ${alpha(blue.main, 0.32)}`,
  cardShadow: `0 1px 2px ${alpha(navy.main, 0.04)}, 0 6px 20px ${alpha(navy.main, 0.06)}`,
  cardShadowHover: `0 2px 4px ${alpha(navy.main, 0.05)}, 0 18px 40px ${alpha(blue.main, 0.16)}`,
};

const baseTheme = createTheme({
  palette: {
    primary: { ...navy, contrastText: neutral.white },
    secondary: { ...blue, contrastText: neutral.white },
    background: { default: neutral.white, paper: neutral.white, muted: neutral.muted },
    text: { primary: neutral.text, secondary: neutral.textSecondary },
    divider: neutral.border,
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  spacing: 8,
  shape: {
    // Base radius (6px). Use `borderRadius: 0.5` for 3px and `2` for 12px in sx.
    borderRadius: 6,
  },
  shadows,
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250, standard: 300 },
  },
  layout: {
    headerHeight: { xs: 64, md: 80 },
    topBarHeight: { xs: 0, md: 40 },
    sectionPaddingY: { xs: '72px', md: 'clamp(32px, 6vh, 112px)' },
    heroWaveHeight: { xs: '80px', md: 'clamp(96px, 17vh, 180px)' },
  },
  brand,
  typography: {
    fontFamily,
    h1: {
      fontFamily: headingFontFamily,
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.12,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: headingFontFamily,
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.01em',
    },
    h3: { fontFamily: headingFontFamily, fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.25 },
    h4: { fontFamily: headingFontFamily, fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.35 },
    h5: { fontFamily: headingFontFamily, fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontFamily: headingFontFamily, fontSize: '1rem', fontWeight: 600, lineHeight: 1.45 },
    subtitle1: { fontSize: '1.1875rem', lineHeight: 1.65 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontWeight: 650, textTransform: 'none', letterSpacing: '0.005em' },
    overline: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', lineHeight: 1.6 },
  },
});

// Two-tone keyboard focus ring: dark blue (≥3:1 on light surfaces) around a white halo
// (≥3:1 on navy surfaces), so focus stays visible on every background.
const focusRing = {
  outline: `2px solid ${blue.dark}`,
  outlineOffset: 2,
  boxShadow: `0 0 0 2px ${neutral.white}`,
};

/**
 * Short desktop screens (e.g. 1536×690 at 125% Windows scaling). Components use this to switch
 * to a compact layout so each section still fits within one screen.
 */
export const SHORT_SCREEN = '@media (min-width: 900px) and (max-height: 780px)';

const theme = createTheme(baseTheme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFeatureSettings: '"cv11", "ss01"', textRendering: 'optimizeLegibility' },
        '::selection': { backgroundColor: alpha(blue.light, 0.3) },
        // Desktop: when scrolling stops near a section, settle it neatly under the sticky
        // header. 'proximity' never traps the reader inside long sections.
        [baseTheme.breakpoints.up('md')]: {
          html: { scrollSnapType: 'y proximity' },
          'main > section': { scrollSnapAlign: 'start', scrollMarginTop: '80px' },
          // The first section sits below the top bar too, so it snaps to the very top.
          'main > section:first-of-type': { scrollMarginTop: '120px' },
          footer: { scrollSnapAlign: 'end' },
        },
        // Compact type scale for short screens (see SHORT_SCREEN).
        [SHORT_SCREEN]: {
          'main .MuiTypography-h2': { fontSize: 'clamp(1.875rem, 5vh, 2.375rem)' },
          'main .MuiTypography-subtitle1': { fontSize: '1.0625rem', lineHeight: 1.55 },
          'main .MuiTypography-body2': { lineHeight: 1.55 },
        },
        ':focus-visible': focusRing,
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            transitionDuration: '0.01ms !important',
            animationDuration: '0.01ms !important',
            // Stop looping animations instead of running them at extreme speed.
            animationIterationCount: '1 !important',
          },
        },
      },
    },
    MuiTypography: {
      // MUI maps subtitles to <h6> by default; they are body text, not headings.
      defaultProps: { variantMapping: { subtitle1: 'p', subtitle2: 'p' } },
    },
    MuiButtonBase: {
      // ButtonBase removes the native outline; restore a visible keyboard focus ring.
      styleOverrides: { root: { '&.Mui-focusVisible': focusRing } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: baseTheme.shape.borderRadius,
          paddingInline: baseTheme.spacing(2.5),
          transition: baseTheme.transitions.create(
            ['background-color', 'border-color', 'color', 'box-shadow', 'transform', 'filter'],
            { duration: baseTheme.transitions.duration.shorter },
          ),
          // disableElevation removes box-shadow on focus, which would drop the ring's halo.
          '&.Mui-focusVisible': focusRing,
        },
        sizeLarge: {
          paddingBlock: baseTheme.spacing(1.6),
          paddingInline: baseTheme.spacing(3.5),
          fontSize: '0.9375rem',
        },
        containedPrimary: {
          '&:hover': { backgroundColor: navy.light },
        },
        // Brand-gradient call to action, echoing the logo's blue arc.
        containedSecondary: {
          backgroundImage: brand.gradient,
          boxShadow: brand.glow,
          '&:hover': {
            backgroundColor: blue.main,
            boxShadow: `0 14px 34px ${alpha(blue.main, 0.4)}`,
            filter: 'brightness(1.08)',
            transform: 'translateY(-1px)',
          },
        },
        outlinedPrimary: {
          borderColor: alpha(navy.main, 0.25),
          '&:hover': { borderColor: blue.main, backgroundColor: alpha(blue.main, 0.04) },
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'inherit' },
      styleOverrides: {
        root: {
          backgroundColor: alpha(neutral.white, 0.92),
          backdropFilter: 'saturate(180%) blur(12px)',
          borderBottom: `1px solid ${neutral.border}`,
          transition: baseTheme.transitions.create('box-shadow'),
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'lg' },
      styleOverrides: {
        root: {
          paddingInline: baseTheme.spacing(2.5),
          [baseTheme.breakpoints.up('sm')]: { paddingInline: baseTheme.spacing(4) },
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
    MuiDrawer: {
      styleOverrides: { paper: { borderRadius: 0 } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: neutral.white,
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: blue.light },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme, { factor: 2.4 });
