/** Page-level marketing copy. Edit wording here — components only lay it out. */
import { routes } from '@/config/routes';
import type { IconName } from '@/content/types';

export const hero = {
  eyebrow: 'IT recruitment · Staffing · Payroll',
  title: 'Global IT talent, hired right.',
  subtitle:
    'India-based recruitment partner for tech teams in the US, UK, Canada, Australia and beyond.',
  primaryCta: { label: 'Hire Talent', to: routes.contact },
  secondaryCta: { label: 'Submit Your Resume', to: routes.candidates },
  experienceLine:
    'Founded by professionals with 13+ years combined in software engineering and IT recruitment',
  highlights: [
    'Pay only on successful hire',
    'Engineer-led technical screening',
    'Time-zone-aligned support',
  ],
  panel: {
    title: 'Your next shortlist',
    subtitle: 'Senior Java Engineer · Remote (UK overlap)',
    badge: '3 profiles',
    rows: [
      { label: 'Technical screen', value: 'Passed' },
      { label: 'Notice period', value: '30 days' },
      { label: 'UK overlap', value: '9:00–17:00' },
    ],
    footer: 'First profiles target: 48 hours',
  },
};

export const servicesIntro = {
  eyebrow: 'What we do',
  title: 'Recruitment, staffing and payroll under one roof',
  intro:
    'Choose the engagement that fits your stage — from a single critical hire to a dedicated team in India.',
  linkLabel: 'Learn more',
};

export const whyUs: {
  eyebrow: string;
  title: string;
  intro: string;
  items: { title: string; description: string; icon: IconName }[];
} = {
  eyebrow: 'Why Northpeak',
  title: 'A partner that is accountable for outcomes',
  intro: 'We are a focused, founder-led team. That shapes how we work with every client.',
  items: [
    {
      title: 'Pay only on successful hire',
      description:
        'No retainers for permanent roles. Our fee is due only when your new hire joins.',
      icon: 'hand-coins',
    },
    {
      title: 'Free replacement guarantee',
      description:
        'If a placed hire leaves within the agreed guarantee period, we replace them at no extra cost.',
      icon: 'refresh',
    },
    {
      title: 'Time-zone-aligned support',
      description:
        'Overlap windows with the UK, Europe, US, Australia and UAE so decisions never wait a day.',
      icon: 'clock',
    },
    {
      title: 'Compliance-aware',
      description:
        'Careful handling of candidate data, right-to-work questions and Indian statutory requirements.',
      icon: 'shield-check',
    },
    {
      title: 'Founder-led service',
      description:
        'You work directly with the founders — a recruiter and an engineer — not a rotating account team.',
      icon: 'users',
    },
  ],
};

export const pricing = {
  eyebrow: 'Pricing approach',
  title: 'Simple, outcome-based commercials',
  points: [
    {
      title: 'Pay only when we successfully hire',
      description:
        'For permanent roles there are no upfront fees or retainers. You pay when your new hire joins.',
      icon: 'hand-coins' as IconName,
    },
    {
      title: 'Zero fees for candidates',
      description:
        'Candidates never pay us anything. Our services are funded entirely by employers.',
      icon: 'shield-check' as IconName,
    },
  ],
  note: 'Commercial terms are shared confidentially after an introductory call.',
  ctaLabel: 'Request our commercial terms',
};

export const ctaBanner = {
  title: 'Ready to hire your next great engineer?',
  text: 'Tell us about the role. We will come back within one business day with next steps.',
  primary: { label: 'Hire Talent', to: routes.contact },
  secondary: { label: 'Submit Your Resume', to: routes.candidates },
};

export const statsIntro = {
  label: 'Northpeak Talent at a glance',
};

export const about = {
  eyebrow: 'About us',
  title: 'Two brothers, one idea: hiring done properly.',
  intro:
    'Northpeak Talent is an India-based IT recruitment, staffing and payroll company headquartered in Indore.',
  storyTitle: 'Our story',
  story: [
    'Northpeak Talent started with two brothers. Lalit spent seven-plus years in IT recruitment — sourcing, screening and managing client relationships. Vinit spent six-plus years writing software as a developer.',
    'Working together as freelancers, we combined those skills: Lalit found and managed the candidates and clients, and Vinit assessed technical ability the way an engineering team would. Over that time we placed 20–30+ professionals into technology roles.',
    'We saw the same problems repeatedly — CVs forwarded without real screening, candidates left without feedback, and clients overseas waiting a day for every answer. So we founded Northpeak Talent to do it properly, at scale, for clients around the world.',
  ],
  missionTitle: 'Our mission',
  mission:
    'To connect global technology teams with skilled professionals from India and beyond — through honest advice, real technical screening and service that respects everyone’s time.',
  valuesTitle: 'What we value',
  values: [
    {
      title: 'Honesty first',
      description:
        'Straight answers about the market, timelines and fit — even when it is not what you hoped.',
      icon: 'compass' as IconName,
    },
    {
      title: 'Quality over volume',
      description: 'A short, well-screened shortlist beats a long list of keyword matches.',
      icon: 'target' as IconName,
    },
    {
      title: 'Respect for candidates',
      description: 'No fees, prompt feedback and clear communication at every stage.',
      icon: 'users' as IconName,
    },
    {
      title: 'Accountability',
      description: 'We are paid for outcomes, and we stand behind every hire.',
      icon: 'scale' as IconName,
    },
  ],
  screening: {
    eyebrow: 'How we screen',
    title: 'Technical screening led by an engineer',
    intro:
      'Every shortlisted candidate goes through a structured conversation designed by someone who has built production software.',
    steps: [
      {
        title: 'Experience deep-dive',
        description:
          'We walk through real projects: what they built, the decisions they made and why.',
      },
      {
        title: 'Practical problem-solving',
        description:
          'Role-relevant scenarios — debugging, design trade-offs or code review — not trivia.',
      },
      {
        title: 'Communication & collaboration',
        description:
          'Clarity, ownership and how they work with distributed teams across time zones.',
      },
      {
        title: 'Written screening notes',
        description:
          'You receive concise notes on strengths, gaps and our recommendation for each profile.',
      },
    ],
  },
};

export const servicesPage = {
  eyebrow: 'Services',
  title: 'Hiring services for technology teams',
  intro:
    'Six ways to work with us — each delivered with engineer-led screening and founder-level attention.',
  includesTitle: 'What is included',
  idealForTitle: 'Ideal for',
  howItWorksTitle: 'How it works',
  commercialTitle: 'Commercial model',
  faqTitle: 'Service FAQs',
  otherServicesTitle: 'Other services',
};

export const industriesPage = {
  eyebrow: 'Industries & Tech',
  title: 'The sectors and stacks we know best',
  intro:
    'We combine domain context with technical depth, so the people we introduce can contribute quickly.',
  rolesLabel: 'Typical roles',
};

export const candidatesPage = {
  eyebrow: 'For candidates',
  title: 'Find your next role with a global tech team',
  intro:
    'Share your profile once. We will contact you when a role genuinely matches your skills, location preference and career goals.',
  feeNotice:
    'Northpeak Talent never charges candidates any fee. Our services are paid by employers.',
  expectTitle: 'What to expect',
  expect: [
    'A real conversation about your experience — with technical questions from an engineer',
    'Clear details about the company, role, salary range and work model before you apply',
    'Your profile is shared only with your agreement, role by role',
    'Feedback after each interview round, wherever the employer shares it',
  ],
  formTitle: 'Submit your resume',
  formIntro: 'It takes about two minutes. Fields marked * are required.',
};

export const contactPage = {
  eyebrow: 'Contact',
  title: 'Let’s talk about your hiring plans',
  intro:
    'Tell us what you need. We reply within one business day — usually much sooner during your working hours.',
  termsIntent:
    'You are requesting our commercial terms. Commercial terms are shared confidentially after an introductory call.',
  formTitle: 'Send an enquiry',
  officeTitle: 'Visit or reach us',
  hoursTitle: 'Business hours',
  directionsLabel: 'Get directions',
};

export const notFoundPage = {
  title: 'Page not found',
  text: 'The page you are looking for has moved or does not exist.',
  cta: 'Back to home',
};

export const pageMeta = {
  home: {
    title: 'Global IT Recruitment, Staffing & Payroll from India',
    description:
      'Northpeak Talent is an India-based IT recruitment partner for tech teams in the US, UK, Canada, Australia, UAE and Europe. Pay only on successful hire.',
  },
  about: {
    title: 'About Us',
    description:
      'Founder-led IT recruitment from Indore, India — combining 13+ years of software engineering and IT recruitment experience.',
  },
  services: {
    title: 'Services',
    description:
      'Permanent hiring, contract staffing, offshore teams, RPO, executive search and payroll & compliance services for technology teams.',
  },
  industries: {
    title: 'Industries & Tech Stacks',
    description:
      'IT recruitment for SaaS, FinTech, HealthTech, E-commerce and Consulting across Java, .NET, Python, React, Cloud, Data/AI, Salesforce, SAP and more.',
  },
  candidates: {
    title: 'For Candidates — Submit Your Resume',
    description:
      'Submit your resume for IT roles with global teams. Northpeak Talent never charges candidates any fee.',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Contact Northpeak Talent in Indore, India for IT recruitment, staffing and payroll enquiries. Time-zone-aligned support.',
  },
  notFound: { title: 'Page Not Found', description: 'This page could not be found.' },
};
