# ARC Industries Website

Corporate portfolio website for **ARC Industries**, a Bengaluru-based construction company working across Government, PSU and Private sector projects.

It is a static single-page application: all content lives in data files, and there is no backend. The enquiry form validates input and helps visitors send their enquiry by email; it does not submit anywhere.

## Tech Stack

- [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vite.dev/) for development and production builds
- [React Router](https://reactrouter.com/) for client-side routing
- [MUI (Material UI)](https://mui.com/) with Emotion for components and theming
- [Lucide React](https://lucide.dev/) for interface icons
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for code quality and formatting

## Prerequisites

- Node.js 20.19+ or 22.12+ (developed with Node.js 24)
- npm

## Installation

```bash
npm install
```

## Development

Start the development server at http://localhost:5173:

```bash
npm run dev
```

Lint and format:

```bash
npm run lint
npm run format:check
npm run format
```

## Production Build

Type-check and build the site into `dist/`:

```bash
npm run build
```

## Preview

Serve the production build locally:

```bash
npm run preview
```

## Project Structure

```text
arc-industries-website/
├── public/                  Static files served as-is (favicon, robots.txt, sitemap.xml)
├── src/
│   ├── assets/              Images and files imported by components
│   ├── components/
│   │   ├── common/          Reusable building blocks (Section, SectionHeading, Eyebrow, ProjectCard, ...)
│   │   ├── home/            Homepage sections (Hero, Highlights, Services, Projects, ...)
│   │   └── layout/          AppLayout, Header, MobileNav, Footer
│   ├── data/                Editable site content (company, services, clients, projects, ...)
│   ├── hooks/               Custom hooks (usePageMeta for title, description, canonical and social tags)
│   ├── pages/               One component per route
│   ├── routes/              Route paths and router configuration
│   ├── theme/               Centralised MUI theme (colours, typography, component defaults)
│   ├── types/               Shared TypeScript types
│   ├── utils/               Small helpers (accessibility, formatting)
│   ├── App.tsx              Theme and router providers
│   └── main.tsx             Application entry point
├── eslint.config.js
├── .prettierrc
├── index.html
├── tsconfig.json
└── vite.config.ts
```

### Updating content

- Company details, contact information, hero, highlights, Why Choose ARC, quality & safety, vision, mission and values: `src/data/company.ts`
- Services, clients, projects and certifications: the matching file in `src/data/`
- Page titles, meta descriptions and the site URL (`https://arcinds.com`): `src/data/seo.ts`
- Navigation links: `src/data/navigation.ts`
- Brand colours and typography: `src/theme/theme.ts`

### Images

Project images are set in `src/data/projects.ts`; the hero and About images are set in `src/data/images.ts`. The current images are temporary illustrative images from Unsplash (free under the Unsplash License). They are not ARC Industries photographs, and the site labels them "Illustrative image".

To use an actual project photograph:

1. Add the file to `src/assets/projects/`.
2. Import it in `src/data/projects.ts` and set it as the project's `image`.
3. Update `imageAlt` to describe the photograph.
4. Set `isPlaceholderImage: false` so the "Illustrative image" label is removed.

### Adding a page

1. Add the path to `src/routes/paths.ts`.
2. Add its title, description and path to `src/data/seo.ts`.
3. Create the page component in `src/pages/` and call `usePageMeta` with its entry.
4. Register the route in `src/routes/router.tsx`.
5. Add a navigation entry in `src/data/navigation.ts` if required.
6. Add the URL to `public/sitemap.xml`.

## Deployment

To be documented. The site builds to static files in `dist/`. Requirements for the host:

- Rewrite unknown paths to `index.html` (SPA fallback) so client-side routes work on direct visits and refreshes.
- Serve the site at `https://arcinds.com`, which the canonical URLs, sitemap and `robots.txt` use.

### Temporary client-review site (GitHub Pages)

`.github/workflows/deploy-pages.yml` builds and publishes a review copy on every push to `master` (or when run manually from the Actions tab). In the repository settings, set **Pages → Source** to **GitHub Actions**.

- URL: `https://<github-username>.github.io/<repository-name>/`
- The workflow builds with `BASE_PATH=/<repository-name>/` and `VITE_REVIEW_BUILD=true`, which adds `noindex` to every page.
- `404.html` is a copy of `index.html`, so direct visits and refreshes on routes such as `/about` work. GitHub Pages returns HTTP 404 for those first loads, which is expected.
- The review site is public. The enquiry form does not send email; it offers the visitor's email app instead.

The production build for `arcinds.com` is a plain `npm run build` and is not affected by these settings.
