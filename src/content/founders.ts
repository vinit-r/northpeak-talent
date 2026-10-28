import type { Founder } from '@/content/types';

export const foundersIntro = {
  eyebrow: 'Founder-led',
  title: 'Meet the founders',
  intro:
    'Founded by professionals with 13+ years combined in software engineering and IT recruitment. You work directly with us.',
};

// Bios are editable — keep them factual.
export const founders: Founder[] = [
  {
    name: 'Lalit',
    role: 'Co-founder · Recruitment & Client Partnerships',
    experience: '7+ years in IT recruitment',
    bio: 'Lalit has spent more than seven years in IT recruitment — sourcing, screening and managing client relationships for technology roles. He leads client partnerships at Northpeak Talent and makes sure every search is scoped clearly and closed well.',
    focus: ['Sourcing strategy', 'Candidate screening', 'Client management'],
  },
  {
    name: 'Vinit',
    role: 'Co-founder · Technical Screening & Assessments',
    experience: '6+ years in software development',
    bio: 'Vinit has six-plus years as a software developer. He leads technical screening and assessments at Northpeak Talent, so candidates are evaluated by someone who understands the work — not just the job description.',
    focus: ['Technical interviews', 'Skill assessments', 'Engineering fit'],
  },
];
