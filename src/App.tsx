import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { router } from './routes/router';
import theme from './theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
