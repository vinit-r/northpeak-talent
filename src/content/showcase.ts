/**
 * Chooses between sample (beta preview) and approved content.
 * The env flag is replaced at build time, so the unused set is tree-shaken out.
 */
import { clients as finalClients } from '@/content/clients';
import { stats as finalStats } from '@/content/stats';
import { testimonials as finalTestimonials } from '@/content/testimonials';
import { sampleClients } from '@/content/sample/clients.sample';
import { sampleStats } from '@/content/sample/stats.sample';
import { sampleTestimonials } from '@/content/sample/testimonials.sample';

export const isSampleMode = import.meta.env.VITE_SHOW_SAMPLE_CONTENT === 'true';

const approvedOnly = <T extends { approved: boolean }>(items: T[]) =>
  items.filter((item) => item.approved);

export const showcaseTestimonials = isSampleMode
  ? sampleTestimonials
  : approvedOnly(finalTestimonials);
export const showcaseClients = isSampleMode ? sampleClients : approvedOnly(finalClients);
export const showcaseStats = isSampleMode ? sampleStats : approvedOnly(finalStats);
