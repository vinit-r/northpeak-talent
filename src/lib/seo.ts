/** JSON-LD builders. All values come from config/site.ts and content/. */
import { site } from '@/config/site';
import { markets } from '@/content/markets';
import type { Faq, Service } from '@/content/types';
import { formatAddress } from '@/lib/utils';

type JsonLd = Record<string, unknown>;

const baseUrl = site.url.replace(/\/$/, '');
export const absoluteUrl = (path = '/') => `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

const ORG_ID = `${baseUrl}/#organization`;
const BUSINESS_ID = `${baseUrl}/#localbusiness`;

/** Removes empty strings, empty arrays and undefined values (recursively). */
function compact<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(compact).filter((v) => v !== undefined && v !== '') as T;
  }
  if (value && typeof value === 'object') {
    const out: JsonLd = {};
    for (const [key, v] of Object.entries(value)) {
      const c = compact(v);
      if (c === undefined || c === '' || (Array.isArray(c) && c.length === 0)) continue;
      out[key] = c;
    }
    return out as T;
  }
  return value;
}

const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: site.office.streetAddress,
  addressLocality: site.office.locality,
  addressRegion: site.office.region,
  postalCode: site.office.postalCode,
  addressCountry: site.office.countryCode,
});

const sameAs = () => Object.values(site.social).filter(Boolean);

export function buildOrganizationJsonLd(): JsonLd {
  return compact({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: site.companyName,
        legalName: site.legalName,
        url: baseUrl,
        logo: absoluteUrl('/icon-512.png'),
        description: site.description,
        foundingDate: String(site.foundedYear),
        email: site.emails.general,
        telephone: site.phones.primary,
        address: postalAddress(),
        sameAs: sameAs(),
        areaServed: markets.map((m) => m.name),
      },
      {
        '@type': 'EmploymentAgency',
        '@id': BUSINESS_ID,
        name: site.companyName,
        url: baseUrl,
        image: absoluteUrl('/og-image.png'),
        email: site.emails.general,
        telephone: site.phones.primary,
        address: postalAddress(),
        geo: {
          '@type': 'GeoCoordinates',
          latitude: site.office.geo.latitude,
          longitude: site.office.geo.longitude,
        },
        hasMap: site.office.directionsUrl,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: site.businessHours.dayOfWeek,
            opens: site.businessHours.opens,
            closes: site.businessHours.closes,
          },
        ],
        parentOrganization: { '@id': ORG_ID },
      },
    ],
  });
}

export function buildFaqJsonLd(faqs: Faq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildServiceJsonLd(service: Service, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    url: absoluteUrl(path),
    serviceType: service.title,
    provider: { '@id': ORG_ID },
    areaServed: markets.map((m) => m.name),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const officeAddressLine = () =>
  formatAddress([
    site.office.streetAddress,
    site.office.locality,
    site.office.region,
    site.office.postalCode,
    site.office.country,
  ]);
