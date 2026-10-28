/** Single source of truth for URLs. Also used by vite.config.ts to build sitemap.xml. */
export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  industries: '/industries',
  candidates: '/for-candidates',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  fraudNotice: '/recruitment-fraud-notice',
} as const;

export const serviceDetailPath = (slug: string) => `${routes.services}/${slug}`;

/** Contact page with the enquiry form preset to a service (and optionally the "terms" intent). */
export const contactWithService = (slug: string, intent?: 'commercial-terms') => {
  const params = new URLSearchParams({ service: slug });
  if (intent) params.set('intent', intent);
  return `${routes.contact}?${params.toString()}#enquiry`;
};

export const indexableRoutes: string[] = Object.values(routes);
