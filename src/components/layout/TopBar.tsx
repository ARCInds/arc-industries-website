import { Box, Container, Link } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { BadgeCheck, Mail, MapPin, Phone } from 'lucide-react';
import { company, contact } from '../../data/company';

const linkSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  color: 'grey.200',
  '&:hover': { color: 'common.white' },
} as const;

/** Slim contact bar above the header (desktop only). It scrolls away; the header stays. */
export default function TopBar() {
  return (
    <Box
      sx={(theme) => ({
        display: { xs: 'none', md: 'block' },
        height: theme.layout.topBarHeight.md,
        bgcolor: 'primary.dark',
        backgroundImage: theme.brand.navyGradient,
        borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
        color: 'grey.200',
        typography: 'caption',
        fontSize: '0.8125rem',
      })}
    >
      <Container
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Link href={contact.phoneHref} underline="none" sx={linkSx}>
            <Phone size={14} aria-hidden />
            {contact.phoneInternational}
          </Link>
          <Link href={contact.emailHref} underline="none" sx={linkSx}>
            <Mail size={14} aria-hidden />
            {contact.email}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: { md: 'none', lg: 'inline-flex' }, alignItems: 'center', gap: 0.75 }}>
            <BadgeCheck size={14} aria-hidden />
            {company.registration}
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
            <MapPin size={14} aria-hidden />
            {company.location}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
