import type { Project } from '../types/content';
import { unsplashImage } from './images';

/** Temporary project images are cropped to 4:3. */
const projectImage = (photoId: string) => unsplashImage(photoId, 1200, 900);

/*
 * Project images are temporary illustrative images, not ARC Industries photographs.
 * They are free to use under the Unsplash License (https://unsplash.com/license).
 *
 * To use an actual project photograph: put the file in src/assets/projects/, import it
 * here, set it as `image`, update `imageAlt` and set `isPlaceholderImage: false`.
 */
export const recentProjects: Project[] = [
  {
    title: 'Providing Civil Works for External Storm Water Tank and Sewage Collection Sump',
    location: 'Bengaluru, Karnataka',
    associatedProject: 'Sparkle One Mall (Mall of Asia), Bangalore',
    description:
      'ARC Industries executed civil works associated with the external storm water tank and sewage collection sump for the project.',
    // "A construction site with piles of dirt and yellow pipes" by Vadym Alyekseyenko
    // https://unsplash.com/photos/8rrf6gsiRXk
    image: projectImage('photo-1783753445262-1248469962a9'),
    imageAlt: 'Drainage pipes and excavated soil at a construction site',
    isPlaceholderImage: true,
  },
  {
    title: 'Construction of Salvage Yard at Helicopter MRO Division',
    location: 'Bengaluru, Karnataka',
    client: 'Hindustan Aeronautics Limited (HAL)',
    description:
      'ARC Industries carried out construction works for a salvage yard at the Helicopter MRO Division of HAL.',
    // "Aerial photography of dump trucks" by Shane McLendon
    // https://unsplash.com/photos/EN1tF2EG-50
    image: projectImage('photo-1517089152318-42ec560349c0'),
    imageAlt: 'Aerial view of earthmoving equipment and dump trucks on an industrial site',
    isPlaceholderImage: true,
  },
  {
    title: 'Road Widening Work — Sparkle One Mall (Mall of Asia)',
    location: 'Bengaluru, Karnataka',
    associatedProject: 'Sparkle One Mall (Mall of Asia), Bangalore',
    description:
      'ARC Industries executed road widening works associated with the Sparkle One Mall (Mall of Asia) project in Bengaluru.',
    // "Workers paving a road with asphalt and asphalt machine" by Nihar Reddy Jangam
    // https://unsplash.com/photos/SwU1fGx__Gk
    image: projectImage('photo-1757030689760-3ec8be7326ae'),
    imageAlt: 'Road workers in safety gear laying asphalt with a paving machine',
    isPlaceholderImage: true,
  },
];
