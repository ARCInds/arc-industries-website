import { createBrowserRouter } from 'react-router';
import PageLoader from '../components/common/PageLoader';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';
import { paths } from './paths';

// Vite's base path without the trailing slash ("/" on arcinds.com, "/<repo>" on GitHub Pages).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

// The home page is bundled eagerly; other pages are code-split and load on demand.
export const router = createBrowserRouter(
  [
    {
      path: paths.home,
      Component: AppLayout,
      HydrateFallback: PageLoader,
      children: [
        { index: true, Component: HomePage },
        {
          path: paths.about,
          lazy: { Component: async () => (await import('../pages/AboutPage')).default },
        },
        {
          path: paths.services,
          lazy: { Component: async () => (await import('../pages/ServicesPage')).default },
        },
        {
          path: paths.projects,
          lazy: { Component: async () => (await import('../pages/ProjectsPage')).default },
        },
        {
          path: paths.clients,
          lazy: { Component: async () => (await import('../pages/ClientsPage')).default },
        },
        {
          path: paths.certifications,
          lazy: { Component: async () => (await import('../pages/CertificationsPage')).default },
        },
        {
          path: paths.contact,
          lazy: { Component: async () => (await import('../pages/ContactPage')).default },
        },
        {
          path: '*',
          lazy: { Component: async () => (await import('../pages/NotFoundPage')).default },
        },
      ],
    },
  ],
  { basename },
);
