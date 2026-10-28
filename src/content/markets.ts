import type { Market } from '@/content/types';

export const marketsIntro = {
  eyebrow: 'Markets served',
  title: 'Hiring for teams across five continents',
  intro:
    'From our base in Indore we support clients hiring in India for global teams, and hiring locally across these markets.',
};

export const markets: Market[] = [
  { name: 'United States', flag: 'us', note: 'East & West coast overlap' },
  { name: 'United Kingdom', flag: 'gb', note: 'Full business-day overlap' },
  { name: 'Canada', flag: 'ca', note: 'Eastern time overlap' },
  { name: 'Australia', flag: 'au', note: 'Morning IST overlap' },
  { name: 'United Arab Emirates', flag: 'ae', note: 'Same-day collaboration' },
  { name: 'Europe', flag: 'eu', note: 'CET business-day overlap' },
];

/** Options for "country" selects in forms. */
export const countryOptions = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Germany',
  'Netherlands',
  'Ireland',
  'France',
  'Other Europe',
  'India',
  'Other',
];
