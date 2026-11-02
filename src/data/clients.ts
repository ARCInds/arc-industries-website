import type { Client } from '../types/content';

// Selected clients only; this is not a complete list of organizations ARC has worked with.
export const clients: Client[] = [
  { name: 'Bangalore Metro Rail Corporation Limited', shortName: 'BMRCL', government: true },
  { name: 'Hindustan Aeronautics Limited', shortName: 'HAL', government: true },
  { name: 'Indian Telephone Industries Limited', shortName: 'ITI', government: true },
  { name: 'Bangalore Electricity Supply Company', shortName: 'BESCOM', government: true },
  {
    name: 'Jawaharlal Institute of Postgraduate Medical Education and Research',
    shortName: 'JIPMER',
    government: true,
  },
  // Full names below are from public sources; confirm with ARC before launch.
  { name: 'The Phoenix Mills Limited', shortName: 'Phoenix Mills' },
  { name: 'Akshaya Redstone', note: 'Private sector client' },
  { name: 'Farah Builders', note: 'Private sector client' },
  { name: 'Consortium for DEWATS Dissemination Society', shortName: 'CDD India' },
];
