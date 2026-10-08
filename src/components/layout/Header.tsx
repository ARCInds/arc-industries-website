import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { mainNavigation } from '../../data/navigation';
import { paths } from '../../routes/paths';
import Logo from '../common/Logo';
import MobileNav from './MobileNav';

const MOBILE_NAV_ID = 'mobile-navigation';

// Contact is shown as a button rather than a plain link.
const navLinks = mainNavigation.filter((item) => item.path !== paths.contact);
const contactItem = mainNavigation.find((item) => item.path === paths.contact);

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  return (
    <AppBar position="sticky" sx={{ boxShadow: scrolled ? 2 : 0 }}>
      <Container>
        <Toolbar
          disableGutters
          sx={(theme) => ({
            minHeight: theme.layout.headerHeight,
            justifyContent: 'space-between',
          })}
        >
          <Logo />

          <Box
            component="nav"
            aria-label="Main"
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}
          >
            {navLinks.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.path === paths.home}
                sx={(theme) => ({
                  position: 'relative',
                  px: 1.75,
                  color: 'text.primary',
                  fontWeight: 500,
                  borderRadius: 0.5,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: theme.spacing(1.75),
                    right: theme.spacing(1.75),
                    bottom: 2,
                    height: 2,
                    bgcolor: 'secondary.main',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: theme.transitions.create('transform', {
                      duration: theme.transitions.duration.short,
                    }),
                  },
                  '&:hover': { bgcolor: 'transparent', color: 'primary.main' },
                  '&:hover::after, &.active::after': { transform: 'scaleX(1)' },
                  '&.active': { color: 'primary.main', fontWeight: 600 },
                })}
              >
                {item.label}
              </Button>
            ))}
            {contactItem && (
              <Button component={NavLink} to={contactItem.path} variant="contained" sx={{ ml: 2 }}>
                {contactItem.label}
              </Button>
            )}
          </Box>

          <IconButton
            onClick={() => {
              setMobileNavOpen(true);
            }}
            aria-label="Open navigation menu"
            aria-controls={MOBILE_NAV_ID}
            aria-expanded={mobileNavOpen}
            edge="end"
            sx={{ display: { md: 'none' }, color: 'primary.main', borderRadius: 0.5 }}
          >
            <Menu aria-hidden />
          </IconButton>
        </Toolbar>
      </Container>

      <MobileNav
        id={MOBILE_NAV_ID}
        open={mobileNavOpen}
        onClose={() => {
          setMobileNavOpen(false);
        }}
      />
    </AppBar>
  );
}
