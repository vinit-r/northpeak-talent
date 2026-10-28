import { routes, serviceDetailPath } from '@/config/routes';
import { services } from '@/content/services';

export interface NavLink {
  label: string;
  to: string;
}

export const headerLinks: NavLink[] = [
  { label: 'Services', to: routes.services },
  { label: 'Industries & Tech', to: routes.industries },
  { label: 'For Candidates', to: routes.candidates },
  { label: 'About', to: routes.about },
  { label: 'Contact', to: routes.contact },
];

export const headerCta: NavLink = { label: 'Hire Talent', to: routes.contact };

export const footerGroups: { title: string; links: NavLink[] }[] = [
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.shortTitle, to: serviceDetailPath(s.slug) })),
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: routes.about },
      { label: 'Industries & Tech', to: routes.industries },
      { label: 'For Candidates', to: routes.candidates },
      { label: 'Contact', to: routes.contact },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: routes.privacy },
      { label: 'Terms of Use', to: routes.terms },
      { label: 'Recruitment Fraud Notice', to: routes.fraudNotice },
    ],
  },
];
