import {
  BadgeCheck,
  CalendarCheck,
  Clock,
  Handshake,
  HardHat,
  Landmark,
  Leaf,
  Lightbulb,
  Scale,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import type {
  Commitment,
  CoreValue,
  Fact,
  Feature,
  HeroFeature,
  Highlight,
} from '../types/content';

export const company = {
  name: 'ARC Industries',
  location: 'Bengaluru, Karnataka, India',
  registration: 'KPWD & CPWD Contractor',
  summary:
    'ARC Industries is a Bengaluru-based construction company specializing in Government, PSU, and Private sector projects.',
  focus:
    'The company focuses on professional project execution, quality, safety, statutory compliance, and timely completion.',
  sectors: ['Government', 'PSU', 'Private'],
  vision: 'To be the most trusted and innovative construction company in Bangalore by 2030.',
  mission:
    'To deliver world-class infrastructure through ethical practices, cutting-edge technology, and an unwavering focus on quality and safety.',
} as const;

/** Verified company facts shown as a labelled list. */
export const companySnapshot: Fact[] = [
  { label: 'Registration', value: company.registration },
  { label: 'Based in', value: company.location },
  { label: 'Sectors', value: company.sectors.join(' · ') },
];

/** About page overview, built only from verified company information. */
export const aboutOverview: string[] = [
  company.summary,
  'With 13+ years of experience, ARC Industries is a KPWD & CPWD Contractor undertaking civil and infrastructure works.',
  company.focus,
];

export const contact = {
  location: company.location,
  phoneInternational: '+91 9591158442',
  phoneHref: 'tel:+919591158442',
  email: 'info@arcinds.com',
  emailHref: 'mailto:info@arcinds.com',
} as const;

export const hero = {
  eyebrow: 'ARC Industries',
  headline: 'Building with Quality. Executing with Responsibility.',
  /** Part of the headline shown in the brand gradient. */
  headlineAccent: 'Executing with Responsibility.',
  text: 'Civil and infrastructure construction for Government, PSU and Private sector clients — focused on quality, safety and on-time execution.',
} as const;

/** Hero icon row of key qualities (wording approved by ARC Industries). */
export const heroFeatures: HeroFeature[] = [
  { lines: ['Quality', 'Construction'], icon: ShieldCheck },
  { lines: ['Safety', 'First'], icon: HardHat },
  { lines: ['Timely', 'Execution'], icon: Clock },
  { lines: ['Technical', 'Expertise'], icon: Settings },
  { lines: ['Long-Term', 'Partnerships'], icon: Handshake },
];

export const highlights: Highlight[] = [
  { value: '13+', label: 'Years of Experience', icon: CalendarCheck },
  { value: 'KPWD & CPWD', label: 'Contractor', icon: BadgeCheck },
  { value: 'Government & PSU', label: 'Project Experience', icon: Landmark },
  { value: 'Quality & Safety', label: 'Focused Execution', icon: ShieldCheck },
];

export const whyChooseArc: Feature[] = [
  {
    title: 'Proven Government & PSU Experience',
    description: 'Experience in executing projects for Government and public-sector organizations.',
  },
  {
    title: 'Statutory & Regulatory Compliance',
    description: 'Commitment to applicable statutory, regulatory and project requirements.',
  },
  {
    title: 'Experienced Engineers & Skilled Workforce',
    description: 'Projects are supported by experienced engineering personnel and skilled workers.',
  },
  {
    title: 'Quality & Safety Focus',
    description: 'Strict attention to quality, safety and approved project specifications.',
  },
  {
    title: 'Transparent & Professional Management',
    description: 'Professional coordination and transparent project processes.',
  },
  {
    title: 'On-Time Delivery',
    description: 'Focus on completing project activities within agreed schedules.',
  },
];

export const qualityAndSafety: Commitment[] = [
  {
    title: 'Quality',
    text: 'ARC Industries follows approved drawings, technical specifications and project requirements to deliver durable and compliant construction work.',
    points: [
      'Approved drawings',
      'Technical specifications',
      'Project requirements',
      'Durable, compliant work',
    ],
    icon: BadgeCheck,
  },
  {
    title: 'Safety',
    text: 'Safety is treated as an essential part of project execution, with attention to safe working practices, workforce protection and compliance with applicable requirements.',
    points: ['Safe working practices', 'Workforce protection', 'Applicable requirements'],
    icon: HardHat,
  },
];

export const coreValues: CoreValue[] = [
  { name: 'Integrity', icon: Scale },
  { name: 'Quality', icon: BadgeCheck },
  { name: 'Safety', icon: ShieldCheck },
  { name: 'Innovation', icon: Lightbulb },
  { name: 'Customer First', icon: Handshake },
  { name: 'Sustainability', icon: Leaf },
];
