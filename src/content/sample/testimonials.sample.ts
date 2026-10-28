import type { Testimonial } from '@/content/types';

// SAMPLE CONTENT — preview only. Never shipped: production builds fail in sample mode.
export const sampleTestimonials: Testimonial[] = [
  {
    quote:
      'The shortlist was small and every profile had clearly been screened by someone technical. We hired two backend engineers from the first batch.',
    name: 'Sample Client',
    role: 'Engineering Manager',
    organisation: 'SaaS company, United States',
    approved: true,
  },
  {
    quote:
      'They understood our time-zone constraints from day one and only proposed people who could genuinely overlap with our London team.',
    name: 'Sample Reviewer',
    role: 'Head of Engineering',
    organisation: 'FinTech scale-up, United Kingdom',
    approved: true,
  },
  {
    quote:
      'Clear communication, honest feedback on the market and no pressure. The replacement guarantee gave us confidence to move quickly.',
    name: 'Preview Placeholder',
    role: 'CTO',
    organisation: 'HealthTech start-up, Australia',
    approved: true,
  },
  {
    quote:
      'As a candidate I never paid a rupee, got real feedback after each round and was supported right up to my joining date.',
    name: 'Demo Candidate',
    role: 'Senior React Developer',
    organisation: 'Placed with a client in Canada',
    approved: true,
  },
];
