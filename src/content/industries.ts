import type { Industry } from '@/content/types';

export const industriesIntro = {
  eyebrow: 'Industries',
  title: 'Sector context, not just keywords',
  intro:
    'Technical skills transfer, but domain knowledge speeds up onboarding. We hire for the industries we know best.',
};

export const industries: Industry[] = [
  {
    name: 'SaaS',
    icon: 'cloud',
    description:
      'Product engineers who understand multi-tenant architecture, release velocity and customer-facing reliability.',
    roles: ['Full-stack developers', 'SRE / DevOps', 'Product-minded tech leads'],
  },
  {
    name: 'FinTech',
    icon: 'landmark',
    description:
      'Engineers used to security, auditability and regulated environments — payments, lending and banking platforms.',
    roles: ['Backend (Java / .NET)', 'Security engineers', 'QA for regulated releases'],
  },
  {
    name: 'HealthTech',
    icon: 'heart-pulse',
    description:
      'Teams that respect patient data, interoperability standards and the cost of getting things wrong.',
    roles: ['Data engineers', 'Integration developers', 'Compliance-aware QA'],
  },
  {
    name: 'E-commerce',
    icon: 'shopping-cart',
    description:
      'Developers who build for scale, performance and conversion — storefronts, marketplaces and fulfilment systems.',
    roles: ['Frontend (React / Angular)', 'Platform engineers', 'Search & data specialists'],
  },
  {
    name: 'Consulting',
    icon: 'building',
    description:
      'Client-ready consultants and engineers for IT services firms and system integrators.',
    roles: ['Salesforce / SAP / ServiceNow consultants', 'Solution architects', 'Delivery leads'],
  },
];
