import { paths } from '../routes/paths';
import type { PageMeta } from '../types/content';

/** Official site origin, used for canonical and Open Graph URLs (keep in sync with public/). */
export const SITE_URL = 'https://arcinds.com';

/** Temporary client-review deployment (GitHub Pages): keep every page out of search results. */
export const IS_REVIEW_BUILD = import.meta.env.VITE_REVIEW_BUILD === 'true';

const defaultMeta: PageMeta = {
  title: 'ARC Industries | Construction & Civil Engineering Company in Bengaluru',
  description:
    'ARC Industries is a Bengaluru-based construction company delivering civil and infrastructure works for Government, PSU and Private sector clients, with a focus on quality, safety and professional execution.',
};

export const pageMeta = {
  home: { ...defaultMeta, path: paths.home },
  about: {
    title: 'About ARC Industries | Bengaluru Construction Company',
    description:
      'ARC Industries is a Bengaluru-based construction company and KPWD & CPWD contractor with 13+ years of experience in Government, PSU and Private sector projects.',
    path: paths.about,
  },
  services: {
    title: 'Construction Services | ARC Industries Bengaluru',
    description:
      'Government civil and infrastructure works, residential, commercial and industrial buildings, RCC and structural works, turnkey execution, renovation and STP / DEWATS civil works.',
    path: paths.services,
  },
  projects: {
    title: 'Projects | ARC Industries Bengaluru',
    description:
      'Selected projects by ARC Industries in Bengaluru, including works for Hindustan Aeronautics Limited (HAL) and works associated with Sparkle One Mall (Mall of Asia).',
    path: paths.projects,
  },
  clients: {
    title: 'Clients | ARC Industries',
    description:
      'Selected clients of ARC Industries, including BMRCL, HAL, ITI Limited, BESCOM, JIPMER and Phoenix Mills.',
    path: paths.clients,
  },
  certifications: {
    title: 'Registrations & Credentials | ARC Industries',
    description:
      'Registrations held by ARC Industries, including a Class II KPWD Contractor License, GST, MSME / Udyam and ESI & PF registration.',
    path: paths.certifications,
  },
  contact: {
    title: 'Contact ARC Industries | Bengaluru',
    description:
      'Contact ARC Industries in Bengaluru, Karnataka. Call +91 9591158442 or email info@arcinds.com.',
    path: paths.contact,
  },
  notFound: {
    title: 'Page Not Found | ARC Industries',
    description: defaultMeta.description,
    noIndex: true,
  },
} satisfies Record<string, PageMeta>;
