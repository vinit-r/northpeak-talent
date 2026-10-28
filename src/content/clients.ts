import type { Client } from '@/content/types';

// Current employers of professionals placed by the founding team.
// Set approved: true once each name has been verified. Remove `logo` to show a text tile —
// only use a brand logo where you are comfortable doing so (trademark guidelines vary).
export const clients: Client[] = [
  { name: 'Salesforce', logo: '/logos/salesforce.svg', approved: false },
  { name: 'Red Hat', logo: '/logos/red-hat.svg', approved: false },
  { name: 'Optum', logo: '/logos/optum.svg', approved: false },
  { name: 'Gartner', logo: '/logos/gartner.svg', approved: false },
  { name: 'Nike', logo: '/logos/nike.svg', approved: false },
  { name: 'Atos', logo: '/logos/atos.svg', approved: false },
];
