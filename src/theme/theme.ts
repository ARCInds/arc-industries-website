import type { Shadows } from '@mui/material/styles';
import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';

/** Layout tokens shared by sections and the header. Values are MUI spacing units or px. */
interface LayoutTokens {
  headerHeight: { xs: number; md: number };
  sectionPaddingY: { xs: number; md: number };
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    /** Light neutral used to alternate page sections. */
    muted: string;
  }
  interface Theme {
    layout: LayoutTokens;
  }
  interface ThemeOptions {
    layout?: LayoutTokens;
  }
}

// ---------------------------------------------------------------------------
// Brand tokens. Change colours here only; components read them from the theme.
// ---------------------------------------------------------------------------
const navy = { main: '#172A3A', light: '#243746', dark: '#0F1E2A' };
const amber = { main: '#C58A3A', light: '#DDB06F', dark: '#94621F' };
const neutral = {
  white: '#FFFFFF',
  muted: '#F5F6F7',
  border: '#E1E4E8',
  text: '#17202A',
  textSecondary: '#5B6570',
};

const fontFamily =
  '"Inter Variable", Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

// Restrained, navy-tinted elevation. Only the first few levels are distinct.
const shadowTint = alpha(navy.main, 0.08);
const shadows = [
  'none',
  `0 1px 2px ${shadowTint}`,
  `0 4px 12px ${shadowTint}`,
  `0 12px 32px ${alpha(navy.main, 0.12)}`,
  ...Array<string>(21).fill(`0 16px 40px ${alpha(navy.main, 0.14)}`),
] as Shadows;

const baseTheme = createTheme({
  palette: {
    primary: { ...navy, contrastText: neutral.white },
    secondary: { ...amber, contrastText: neutral.text },
    background: { default: neutral.white, paper: neutral.white, muted: neutral.muted },
    text: { primary: neutral.text, secondary: neutral.textSecondary },
    divider: neutral.border,
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  spacing: 8,
  shape: {
    // Base radius (4px). Use `borderRadius: 0.5` for 2px and `2` for 8px in sx.
    borderRadius: 4,
  },
  shadows,
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250, standard: 300 },
  },
  layout: {
    headerHeight: { xs: 64, md: 80 },
    sectionPaddingY: { xs: 9, md: 14 },
  },
  typography: {
    fontFamily,
    h1: { fontSize: '3.75rem', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em' },
    h2: { fontSize: '2.75rem', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' },
    h3: { fontSize: '2rem', fontWeight: 650, lineHeight: 1.2, letterSpacing: '-0.015em' },
    h4: { fontSize: '1.5rem', fontWeight: 650, lineHeight: 1.3, letterSpacing: '-0.01em' },
    h5: { fontSize: '1.1875rem', fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.005em' },
    h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.45 },
    subtitle1: { fontSize: '1.1875rem', lineHeight: 1.65 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.005em' },
    overline: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.16em', lineHeight: 1.6 },
  },
});

// Two-tone keyboard focus ring: dark amber (≥3:1 on light surfaces) around a white halo
// (≥3:1 on navy surfaces), so focus stays visible on every background.
const focusRing = {
  outline: `2px solid ${amber.dark}`,
  outlineOffset: 2,
  boxShadow: `0 0 0 2px ${neutral.white}`,
};

const theme = createTheme(baseTheme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFeatureSettings: '"cv11", "ss01"', textRendering: 'optimizeLegibility' },
        ':focus-visible': focusRing,
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            transitionDuration: '0.01ms !important',
            animationDuration: '0.01ms !important',
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
          borderRadius: 2,
          paddingInline: baseTheme.spacing(2.5),
          transition: baseTheme.transitions.create(
            ['background-color', 'border-color', 'color', 'transform'],
            { duration: baseTheme.transitions.duration.shorter },
          ),
          // disableElevation removes box-shadow on focus, which would drop the ring's halo.
          '&.Mui-focusVisible': focusRing,
        },
        sizeLarge: {
          paddingBlock: baseTheme.spacing(1.5),
          paddingInline: baseTheme.spacing(3.5),
          fontSize: '0.9375rem',
        },
        containedPrimary: {
          '&:hover': { backgroundColor: navy.light },
        },
        containedSecondary: {
          '&:hover': { backgroundColor: amber.light },
        },
        outlined: {
          borderWidth: 1,
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'inherit' },
      styleOverrides: {
        root: {
          backgroundColor: alpha(neutral.white, 0.97),
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
  },
});

export default responsiveFontSizes(theme, { factor: 2.4 });
