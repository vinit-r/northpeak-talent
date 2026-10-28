import type { TechStack } from '@/content/types';

export const techStacksIntro = {
  eyebrow: 'Tech stacks',
  title: 'Specialists across the modern stack',
  intro:
    'Our screening is led by an engineer, so we assess real depth in the technologies your team uses every day.',
};

export const techStacks: TechStack[] = [
  { name: 'Java', detail: 'Spring Boot, microservices, Kafka' },
  { name: '.NET', detail: 'C#, ASP.NET Core, Azure' },
  { name: 'Python', detail: 'Django, FastAPI, automation' },
  { name: 'React', detail: 'Next.js, TypeScript, React Native' },
  { name: 'Angular', detail: 'RxJS, NgRx, enterprise UIs' },
  { name: 'Node.js', detail: 'Express, NestJS, serverless' },
  { name: 'Cloud / DevOps', detail: 'AWS, Azure, GCP, Kubernetes, Terraform' },
  { name: 'Data / AI', detail: 'Data engineering, ML, GenAI, analytics' },
  { name: 'QA / Automation', detail: 'Selenium, Playwright, Cypress, API testing' },
  { name: 'Salesforce', detail: 'Developers, admins, architects' },
  { name: 'SAP', detail: 'S/4HANA, ABAP, functional consultants' },
  { name: 'ServiceNow', detail: 'ITSM, developers, platform admins' },
];
