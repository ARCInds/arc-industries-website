import { Building2, Droplets, House, KeyRound, Landmark, Layers, Wrench } from 'lucide-react';
import type { Service } from '../types/content';

export const services: Service[] = [
  {
    title: 'Government Civil & Infrastructure Works',
    description:
      'Civil and infrastructure works for Government departments and public-sector organizations, with focus on approved specifications, statutory compliance and professional execution.',
    icon: Landmark,
  },
  {
    title: 'Residential Construction',
    description:
      'Construction services for residential buildings with emphasis on quality workmanship, structural integrity and coordinated project execution.',
    icon: House,
  },
  {
    title: 'Commercial & Industrial Buildings',
    description:
      'Civil construction and building works for commercial and industrial facilities, following project requirements, approved drawings and applicable standards.',
    icon: Building2,
  },
  {
    title: 'Civil, RCC & Structural Works',
    description:
      'Civil, reinforced concrete and structural works executed according to approved drawings, specifications and project requirements.',
    icon: Layers,
  },
  {
    title: 'Turnkey Project Execution',
    description:
      'End-to-end project execution and coordination covering the required civil construction activities from planning through completion.',
    icon: KeyRound,
  },
  {
    title: 'Renovation, Repair & Maintenance',
    description:
      'Renovation, repair and maintenance works for existing buildings and civil infrastructure.',
    icon: Wrench,
  },
  {
    title: 'STP / DEWATS',
    description:
      'Civil and infrastructure works associated with sewage treatment and decentralized wastewater treatment systems.',
    icon: Droplets,
  },
];
