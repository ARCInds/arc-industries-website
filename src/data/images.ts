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
export const siteImages: Record<'hero' | 'about', SiteImage> = {
  // "A crane is on the side of a train track" by Nathan Sack
  // https://unsplash.com/photos/em4mkYiN_54
  hero: {
    src: unsplashImage('photo-1708786910201-eb908f463782', 2000, 1125),
    srcSet: unsplashSrcSet('photo-1708786910201-eb908f463782', [768, 1280, 2000], 16 / 9),
    alt: 'Bridge girders and piers under construction beside a crawler crane',
    isPlaceholder: true,
  },
  // "A large building under construction with a sky background" by Iqro Rinaldi
  // https://unsplash.com/photos/Iij0qprxnpY
  about: {
    src: unsplashImage('photo-1720278516199-55256b5040ef', 1200, 900),
    alt: 'Reinforced concrete columns and formwork on a building under construction',
    isPlaceholder: true,
  },
};
