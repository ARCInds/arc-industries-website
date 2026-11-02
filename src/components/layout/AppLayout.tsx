import { Box, Link } from '@mui/material';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import PageLoader from '../common/PageLoader';
import FloatingActions from './FloatingActions';
import Footer from './Footer';
import Header from './Header';
import TopBar from './TopBar';

const MAIN_CONTENT_ID = 'main-content';

export default function AppLayout() {
  const navigation = useNavigation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {navigation.state === 'loading' && <PageLoader />}
      <Link
        href={`#${MAIN_CONTENT_ID}`}
        sx={{
          position: 'absolute',
          left: 16,
          top: -48,
          zIndex: 'tooltip',
          px: 2,
          py: 1,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '&:focus': { top: 16 },
        }}
      >
        Skip to main content
      </Link>

      <TopBar />
      <Header />

      <Box
        component="main"
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        sx={{ flexGrow: 1, outline: 'none' }}
      >
        <Outlet />
      </Box>

      <Footer />
      <FloatingActions />
      <ScrollRestoration />
    </Box>
  );
}
