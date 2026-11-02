import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

/** A short two-line quality shown with an icon in the homepage hero. */
export interface HeroFeature {
  lines: [string, string];
  icon: LucideIcon;
}

export interface Highlight {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** A titled point with supporting text, e.g. a "Why Choose ARC" reason. */
export interface Feature {
  title: string;
  description: string;
}

/** A general site image (not tied to a project). */
export interface SiteImage {
  src: string;
  /** Optional responsive candidates for the same image. */
  srcSet?: string;
  alt: string;
  /** True while this is a temporary illustrative image, not an ARC Industries photograph. */
  isPlaceholder: boolean;
}

export interface Commitment {
  title: string;
  text: string;
  /** Short restatements of `text`, shown as a list. */
  points: string[];
  icon: LucideIcon;
}

export interface CoreValue {
  name: string;
  icon: LucideIcon;
}

/** A labelled fact, e.g. "Registration: KPWD & CPWD Contractor". */
export interface Fact {
  label: string;
  value: string;
}

export interface Credential {
  name: string;
  /** General explanation of what the registration or document is. */
  description: string;
}

export interface Client {
  name: string;
  shortName?: string;
  /** Government or PSU organisation (shown with a civic-building icon). */
  government?: boolean;
  /** Short line under the name when there is no separate full name. */
  note?: string;
  /** Reserved slot shown as "Client name to be added" until real details are supplied. */
  placeholder?: boolean;
}

export interface Project {
  title: string;
  location: string;
  description: string;
  /** Organisation the work was carried out for, when known. */
  client?: string;
  /** Wider development the work was part of, when there is no named client. */
  associatedProject?: string;
  /** Image URL or imported asset path. Without one, a placeholder box is shown. */
  image?: string;
  /** Describes what the image shows. */
  imageAlt: string;
  /**
   * True while `image` is a temporary illustrative image rather than an actual
   * ARC Industries photograph. The UI labels such images as illustrative.
   */
  isPlaceholderImage: boolean;
}

export interface PageMeta {
  title: string;
  description: string;
  /** Route path used for the canonical and Open Graph URLs. Omit for non-indexable pages. */
  path?: string;
  /** Ask search engines not to index the page (e.g. the 404 page). */
  noIndex?: boolean;
}
