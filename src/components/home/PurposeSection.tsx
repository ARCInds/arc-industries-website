import { Box, Grid, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { LucideIcon } from 'lucide-react';
import { Eye, Target } from 'lucide-react';
import { company, coreValues } from '../../data/company';
import ArcRings from '../common/ArcRings';
import IconBadge from '../common/IconBadge';
import Reveal from '../common/Reveal';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import { SHORT_SCREEN } from '../../theme/theme';

interface Statement {
  label: string;
  text: string;
  icon: LucideIcon;
  tone: 'navy' | 'blue';
}

const statements: Statement[] = [
  { label: 'Our Vision', text: company.vision, icon: Eye, tone: 'navy' },
  { label: 'Our Mission', text: company.mission, icon: Target, tone: 'blue' },
];

function IconGlyph({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon size={26} strokeWidth={1.75} />;
}

export default function PurposeSection() {
  return (
    <Section labelledBy="purpose-heading" fill>
      <SectionHeading
        id="purpose-heading"
        eyebrow="Who We Are"
        title="Vision, Mission & Values"
        highlight="Values"
      />

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {statements.map(({ label, text, icon, tone }, index) => (
          <Grid key={label} size={{ xs: 12, md: 6 }}>
            <Reveal
              delay={index * 120}
              sx={(theme) => ({
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                minHeight: { md: 'clamp(220px, 28vh, 320px)' },
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 4, md: 'clamp(24px, 4vh, 40px)' },
                [SHORT_SCREEN]: { p: 2.75, minHeight: 0 },
                borderRadius: 3,
                color: 'common.white',
                bgcolor: tone === 'navy' ? 'primary.main' : 'secondary.dark',
                backgroundImage:
                  tone === 'navy' ? theme.brand.navyGradient : theme.brand.deepGradient,
                boxShadow: theme.brand.cardShadowHover,
                transition: theme.transitions.create(['transform', 'box-shadow']),
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.brand.glow },
              })}
            >
              <ArcRings
                size={340}
                onDark
                animate
                sx={{ right: -120, bottom: -150, opacity: 0.55 }}
              />
              {/* Large decorative quotation mark. */}
              <Typography
                aria-hidden
                sx={(theme) => ({
                  position: 'absolute',
                  top: { xs: -8, md: -16 },
                  right: { xs: 20, md: 32 },
                  fontSize: { xs: '7rem', md: '9rem' },
                  fontWeight: 800,
                  lineHeight: 1,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  color: alpha(theme.palette.common.white, 0.1),
                })}
              >
                &ldquo;
              </Typography>

              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  aria-hidden
                  sx={(theme) => ({
                    width: 52,
                    height: 52,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 1.5,
                    color: 'common.white',
                    bgcolor: alpha(theme.palette.common.white, 0.12),
                    border: `1px solid ${alpha(theme.palette.common.white, 0.25)}`,
                    backdropFilter: 'blur(6px)',
                  })}
                >
                  <IconGlyph icon={icon} />
                </Box>
                <Typography variant="overline" component="h3" sx={{ color: 'secondary.light' }}>
                  {label}
                </Typography>
              </Box>

              <Typography
                component="p"
                sx={{
                  position: 'relative',
                  mt: { xs: 3, md: 'clamp(16px, 2.6vh, 32px)' },
                  fontSize: { xs: '1.375rem', md: 'clamp(1.375rem, 2.9vh, 1.75rem)' },
                  [SHORT_SCREEN]: { fontSize: '1.25rem', mt: 2 },
                  fontWeight: 650,
                  lineHeight: 1.35,
                  color: 'common.white',
                  maxWidth: 520,
                }}
              >
                {text}
              </Typography>

              <Box
                aria-hidden
                sx={(theme) => ({
                  position: 'relative',
                  mt: 'auto',
                  pt: { xs: 4, md: 'clamp(16px, 2.6vh, 32px)' },
                  width: 64,
                  '&::after': {
                    content: '""',
                    display: 'block',
                    height: 4,
                    borderRadius: 2,
                    backgroundImage: theme.brand.textGradientOnDark,
                  },
                })}
              />
            </Reveal>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="overline"
        component="h3"
        sx={{
          display: 'block',
          mt: { xs: 7, md: 'clamp(32px, 6vh, 72px)' },
          [SHORT_SCREEN]: { mt: 3, mb: 1.5 },
          mb: 2.5,
          color: 'text.secondary',
        }}
      >
        Core Values
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {coreValues.map(({ name, icon }, index) => (
          <Reveal
            component="li"
            delay={index * 60}
            key={name}
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.5,
              p: { xs: 2.5, md: 'clamp(14px, 2.2vh, 24px)' },
              [SHORT_SCREEN]: { py: 1.5, gap: 1 },
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.brand.cardShadow,
              transition: theme.transitions.create(['transform', 'box-shadow']),
              '&:hover': { transform: 'translateY(-3px)', boxShadow: theme.brand.cardShadowHover },
            })}
          >
            <IconBadge icon={icon} size={48} variant="soft" />
            <Typography sx={{ fontWeight: 650, color: 'primary.main' }}>{name}</Typography>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
