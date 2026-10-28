import type { ProcessStep } from '@/content/types';

export const processIntro = {
  eyebrow: 'How we work',
  title: 'A clear, five-step hiring process',
  intro:
    'Every search follows the same disciplined process, so you always know what happens next and when.',
};

export const processSteps: ProcessStep[] = [
  {
    title: 'Discovery call',
    description:
      'We learn the role, tech stack, team culture, budget and the time-zone overlap you need.',
    icon: 'messages',
  },
  {
    title: 'Targeted sourcing',
    description:
      'We search our network, referrals and specialist communities for people who match — not just keywords.',
    icon: 'search',
  },
  {
    title: 'Technical screening',
    description:
      'An engineer-led conversation checks real-world skills, problem-solving and communication.',
    icon: 'code',
  },
  {
    title: 'Focused shortlist',
    description:
      'You receive a small shortlist with screening notes — our target is the first profiles within 48 hours.',
    icon: 'list-checks',
  },
  {
    title: 'Interviews to onboarding',
    description:
      'We coordinate interviews, offers, notice periods and joining — and stay in touch after day one.',
    icon: 'handshake',
  },
];
