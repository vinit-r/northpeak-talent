/** Icon keys mapped to lucide-react components in src/lib/icons.ts (keeps content plain data). */
export type IconName =
  | 'user-check'
  | 'users'
  | 'globe'
  | 'workflow'
  | 'crown'
  | 'wallet'
  | 'search'
  | 'clipboard-check'
  | 'messages'
  | 'handshake'
  | 'rocket'
  | 'shield-check'
  | 'refresh'
  | 'clock'
  | 'code'
  | 'cloud'
  | 'database'
  | 'heart-pulse'
  | 'shopping-cart'
  | 'landmark'
  | 'layers'
  | 'trending-up'
  | 'target'
  | 'compass'
  | 'scale'
  | 'sparkles'
  | 'file-text'
  | 'building'
  | 'cpu'
  | 'hand-coins'
  | 'list-checks'
  | 'gauge';

export type FlagCode = 'us' | 'gb' | 'ca' | 'au' | 'ae' | 'eu';

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string;
  intro: string;
  includes: string[];
  idealFor: string[];
  howItWorks: { title: string; description: string }[];
  /** Plain-language commercial model — never percentages. */
  commercialModel: string;
  faqs: Faq[];
  seoDescription: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: IconName;
}

export interface Market {
  name: string;
  flag: FlagCode;
  note: string;
}

export interface TechStack {
  name: string;
  detail: string;
}

export interface Industry {
  name: string;
  icon: IconName;
  description: string;
  roles: string[];
}

export interface Founder {
  name: string;
  role: string;
  experience: string;
  bio: string;
  focus: string[];
  linkedin?: string;
  /** Optional photo in /public (WebP recommended). Initials avatar is used when absent. */
  photo?: string;
}

/** Fields below share `approved`: only approved entries render outside sample mode. */
export interface Testimonial {
  quote: string;
  name?: string;
  role: string;
  organisation: string;
  approved: boolean;
}

export interface Client {
  name: string;
  /** Path under /public/logos/, e.g. "/logos/acme.svg". Text tile is rendered when absent. */
  logo?: string;
  approved: boolean;
}

export interface Stat {
  value: string;
  label: string;
  approved: boolean;
}

export interface CaseStudy {
  title: string;
  market: string;
  challenge: string;
  outcome: string;
  approved: boolean;
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}
