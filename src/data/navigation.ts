import { paths } from '../routes/paths';
import type { NavItem } from '../types/content';

export const mainNavigation: NavItem[] = [
  { label: 'Home', path: paths.home },
  { label: 'About', path: paths.about },
  { label: 'Services', path: paths.services },
  { label: 'Projects', path: paths.projects },
  { label: 'Clients', path: paths.clients },
  { label: 'Contact', path: paths.contact },
];

export const footerNavigation: NavItem[] = [
  { label: 'About', path: paths.about },
  { label: 'Services', path: paths.services },
  { label: 'Projects', path: paths.projects },
  { label: 'Clients', path: paths.clients },
  { label: 'Certifications', path: paths.certifications },
  { label: 'Contact', path: paths.contact },
];
