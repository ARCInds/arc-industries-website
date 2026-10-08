import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { X } from 'lucide-react';
import { Link as RouterLink, NavLink } from 'react-router';
import { mainNavigation } from '../../data/navigation';
import { paths } from '../../routes/paths';
import ContactDetails from '../common/ContactDetails';
import Logo from '../common/Logo';

interface MobileNavProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

/** Slide-in navigation for small screens. The MUI Drawer traps focus and closes on Escape. */
export default function MobileNav({ id, open, onClose }: MobileNavProps) {
  return (
    <Drawer
      id={id}
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ display: { md: 'none' } }}
      slotProps={{ paper: { sx: { width: 'min(340px, 88vw)' } } }}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          minHeight: theme.layout.headerHeight.xs,
          borderBottom: 1,
          borderColor: 'divider',
        })}
      >
        <Logo />
        <IconButton
          onClick={onClose}
          aria-label="Close navigation menu"
          edge="end"
          sx={{ borderRadius: 0.5 }}
        >
          <X aria-hidden />
        </IconButton>
      </Box>

      <Box component="nav" aria-label="Main" sx={{ flexGrow: 1 }}>
        <List disablePadding>
          {mainNavigation.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === paths.home}
                onClick={onClose}
                sx={{
                  px: 3,
                  py: 1.75,
                  borderBottom: 1,
                  borderColor: 'divider',
                  '&.active': {
                    color: 'primary.main',
                    fontWeight: 600,
                    boxShadow: (theme) => `inset 3px 0 0 ${theme.palette.secondary.main}`,
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontWeight: 'inherit', fontSize: '1.0625rem' } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 3, bgcolor: 'background.muted', borderTop: 1, borderColor: 'divider' }}>
        <ContactDetails />
        <Button
          component={RouterLink}
          to={paths.contact}
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Discuss Your Project
        </Button>
      </Box>
    </Drawer>
  );
}
