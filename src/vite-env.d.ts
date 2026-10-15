/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "true" for the temporary GitHub Pages client-review build (adds noindex to every page). */
  readonly VITE_REVIEW_BUILD?: string;
}
