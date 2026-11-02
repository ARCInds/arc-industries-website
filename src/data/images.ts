import type { SiteImage } from '../types/content';

/** Builds a cropped URL for a temporary image hosted on Unsplash. */
export const unsplashImage = (photoId: string, width: number, height: number) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${String(width)}&h=${String(height)}&q=75`;

/** Builds a `srcset` of the same crop at several widths, so small screens load smaller files. */
const unsplashSrcSet = (photoId: string, widths: number[], aspectRatio: number) =>
  widths
    .map((w) => `${unsplashImage(photoId, w, Math.round(w / aspectRatio))} ${String(w)}w`)
    .join(', ');

/*
 * General site images. These are temporary illustrative images, free to use under the
 * Unsplash License (https://unsplash.com/license), and are NOT ARC Industries photographs.
 * Replace `src` with an imported asset and set `isPlaceholder: false` when real photographs
 * are available. Project images live in projects.ts.
 */
/** A full-width hero slide: the same crop at several widths for responsive loading. */
const heroSlide = (photoId: string, alt: string): SiteImage => ({
  src: unsplashImage(photoId, 2000, 1125),
  srcSet: unsplashSrcSet(photoId, [768, 1280, 2000], 16 / 9),
  alt,
  isPlaceholder: true,
});

/** Background slideshow for the homepage hero: bright infrastructure scenes with open sky. */
export const heroSlides: SiteImage[] = [
  // "A crane is standing over a body of water" by Michael Myers
  // https://unsplash.com/photos/REWuOons82E
  heroSlide(
    'photo-1670912461796-81819c1e525b',
    'Viaduct piers and deck under construction with a tower crane at sunset',
  ),
  // "Complex highway interchange under a clear blue sky" by Nick Guenov
  // https://unsplash.com/photos/KdohJbAZwaA
  heroSlide(
    'photo-1768962635991-0fa9543b7640',
    'Elevated highway interchange under a clear blue sky',
  ),
  // "Bridge construction at sunset with water reflections" by Alexandr Popadin
  // https://unsplash.com/photos/38582LlS-jc
  heroSlide(
    'photo-1779050808975-732c43f174da',
    'Bridge piers under construction reflected in the water at sunset',
  ),
  // "Curving elevated highway with concrete pillars against sky" by Declan Sun
  // https://unsplash.com/photos/hfauTxL68qw
  heroSlide(
    'photo-1773638381233-6231cfaf85a3',
    'Curving elevated highway on concrete pillars against the sky',
  ),
];

const [viaduct, interchange, bridgePiers, curvedFlyover] = heroSlides as [
  SiteImage,
  SiteImage,
  SiteImage,
  SiteImage,
];

/** Background photo for each inner page's header (temporary illustrative images). */
export const pageHeroImages = {
  // "A large building under construction with a sky background" by Iqro Rinaldi
  // https://unsplash.com/photos/Iij0qprxnpY
  about: heroSlide(
    'photo-1720278516199-55256b5040ef',
    'Reinforced concrete columns and formwork on a building under construction',
  ),
  services: viaduct,
  projects: bridgePiers,
  clients: curvedFlyover,
  // "Gray metal building frame near tower crane during daytime" by Jacek Dylag
  // https://unsplash.com/photos/nhCPOp4A2Xo
  certifications: heroSlide(
    'photo-1527335988388-b40ee248d80c',
    'Steel structural frame and tower cranes against a clear sky',
  ),
  contact: interchange,
} satisfies Record<string, SiteImage>;

export const siteImages: Record<'about' | 'whyChoose' | 'footer', SiteImage> = {
  // "several cranes above the buildings" by EJ Yao – multiple tower cranes at dusk
  // https://unsplash.com/photos/D46mXLsQRJw
  footer: {
    src: unsplashImage('photo-1485083269755-a7b559a4fe5e', 1600, 1000),
    alt: 'Tower cranes above buildings under construction at dusk',
    isPlaceholder: true,
  },
  // "A large building under construction with a sky background" by Iqro Rinaldi
  // https://unsplash.com/photos/Iij0qprxnpY
  about: {
    src: unsplashImage('photo-1720278516199-55256b5040ef', 1200, 900),
    alt: 'Reinforced concrete columns and formwork on a building under construction',
    isPlaceholder: true,
  },
  // "Gray metal building frame near tower crane during daytime" by Jacek Dylag
  // https://unsplash.com/photos/nhCPOp4A2Xo
  whyChoose: {
    src: unsplashImage('photo-1527335988388-b40ee248d80c', 1000, 750),
    alt: 'Steel structural frame and tower cranes against a clear sky',
    isPlaceholder: true,
  },
};
