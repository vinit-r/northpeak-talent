/**
 * Company-wide facts. Every component reads business details from here.
 * Empty strings are treated as "not available yet" and are hidden in the UI and JSON-LD.
 *
 * NOTE: this file is also imported by vite.config.ts (sitemap/robots), so keep it free of
 * browser-only APIs and "@/" imports.
 */
export const site = {
  companyName: 'Northpeak Talent',
  legalName: 'Northpeak Talent', // TODO: registered entity name, e.g. "Northpeak Talent Private Limited"
  tagline: 'Global IT talent, hired right.',
  description:
    'Northpeak Talent is an India-based IT recruitment, staffing and payroll partner for technology teams in the US, UK, Canada, Australia, UAE and Europe.',
  url: 'https://www.northpeaktalent.com', // TODO: production domain (no trailing slash)
  foundedYear: 2025, // TODO: confirm
  locale: 'en_IN',

  emails: {
    general: 'hello@northpeaktalent.com',
    careers: 'careers@northpeaktalent.com',
    privacy: 'privacy@northpeaktalent.com',
  },
  /** International format for tel: links, e.g. "+919876543210". Leave empty to hide. */
  phones: {
    primary: '',
    primaryDisplay: '',
  },
  /** Digits only with country code, e.g. "919876543210". Leave empty to hide WhatsApp links. */
  whatsapp: {
    number: '',
    defaultMessage: 'Hi Northpeak Talent, I would like to discuss a hiring requirement.',
  },
  social: {
    linkedin: '',
    x: '',
    facebook: '',
    instagram: '',
  },

  office: {
    label: 'Head office',
    streetAddress: '', // TODO: building / street
    locality: 'Indore',
    region: 'Madhya Pradesh',
    postalCode: '',
    country: 'India',
    countryCode: 'IN',
    /** Optional coordinates for JSON-LD. */
    geo: { latitude: 22.7196, longitude: 75.8577 },
    /** Works without an API key. Replace "q=" with the exact office address or a Place ID. */
    mapEmbedUrl: 'https://www.google.com/maps?q=Indore,+Madhya+Pradesh,+India&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Indore%2C+Madhya+Pradesh%2C+India',
  },

  /** Statutory registrations — shown in the footer once filled in. */
  registration: {
    cin: '',
    gst: '',
    msme: '',
    meaLicence: '',
  },

  businessHours: {
    timezone: 'Asia/Kolkata',
    days: 'Monday – Friday',
    ist: '10:00 AM – 7:00 PM IST',
    /** For JSON-LD openingHoursSpecification (24h, IST). */
    opens: '10:00',
    closes: '19:00',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    overlapNote:
      'Extended client-overlap windows (standard time shown; windows shift by an hour during daylight saving).',
    overlap: [
      { region: 'UK & Europe', ist: '2:30 PM – 10:30 PM IST', local: '9:00 AM – 5:00 PM GMT' },
      {
        region: 'US & Canada (East)',
        ist: '7:30 PM – 11:30 PM IST',
        local: '9:00 AM – 1:00 PM ET',
      },
      {
        region: 'Australia (East)',
        ist: '8:30 AM – 12:30 PM IST',
        local: '1:00 PM – 5:00 PM AEST',
      },
      { region: 'UAE', ist: '10:30 AM – 7:30 PM IST', local: '9:00 AM – 6:00 PM GST' },
    ],
  },
} as const;

export type Site = typeof site;
