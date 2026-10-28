// Also imported by vite.config.ts for the sitemap — keep this file plain data (type imports only).
import type { Service } from '@/content/types';

export const services: Service[] = [
  {
    slug: 'permanent-hiring',
    title: 'Permanent Hiring',
    shortTitle: 'Permanent Hiring',
    icon: 'user-check',
    summary:
      'Full-time engineers, architects and tech leads, technically screened before you ever see a CV.',
    intro:
      'We find, assess and close permanent IT hires for your team — from mid-level developers to principal engineers. Every shortlisted candidate has passed a technical conversation led by someone who has written production code.',
    includes: [
      'Role scoping call to define must-have skills, seniority and team fit',
      'Targeted sourcing across networks, communities and referrals',
      'Engineer-led technical screening and structured notes for each profile',
      'Interview scheduling across time zones and candidate follow-up',
      'Offer negotiation, notice-period management and joining support',
      'Free replacement if a hire leaves within the agreed guarantee period',
    ],
    idealFor: [
      'Product companies scaling engineering teams',
      'Hiring managers who need pre-vetted profiles, not CV volume',
      'Companies hiring in India for global teams, or abroad from India',
    ],
    howItWorks: [
      { title: 'Brief', description: 'A 30-minute call to understand the role, stack and team.' },
      {
        title: 'Search & screen',
        description: 'We source and technically screen candidates against your criteria.',
      },
      {
        title: 'Shortlist',
        description: 'You receive a focused shortlist with screening notes — target 48 hours.',
      },
      {
        title: 'Hire',
        description: 'We coordinate interviews, offers and onboarding through to day one.',
      },
    ],
    commercialModel:
      'Success-based: you pay only when a candidate joins. No retainers or upfront fees for standard roles.',
    faqs: [
      {
        question: 'Do you charge anything before a hire is made?',
        answer:
          'No. For permanent hiring our fee is payable only after a candidate we introduced accepts an offer and joins.',
      },
      {
        question: 'What if the hire does not work out?',
        answer:
          'If a placed candidate leaves within the agreed guarantee period, we find a replacement at no additional cost.',
      },
    ],
    seoDescription:
      'Permanent IT hiring with engineer-led technical screening. Pay only on successful hire, with a free replacement guarantee.',
  },
  {
    slug: 'contract-staffing',
    title: 'Contract Staffing / Staff Augmentation',
    shortTitle: 'Contract Staffing',
    icon: 'users',
    summary:
      'Add skilled contractors to your team for projects, peaks and specialist gaps — without long hiring cycles.',
    intro:
      'Extend your team with pre-screened IT contractors who can start quickly and work in your tools, rituals and time zone. Scale up for a release, cover a specialist gap or test a role before hiring permanently.',
    includes: [
      'Contractors matched to your stack, seniority and working hours',
      'Short notice availability for immediate-joiner profiles',
      'Monthly timesheets, invoicing and contractor payments handled by us',
      'Performance check-ins and quick replacement if a fit is not right',
      'Option to convert contractors to permanent employees',
    ],
    idealFor: [
      'Project-based delivery and product launches',
      'Covering leave, attrition or hiring freezes',
      'Teams that need niche skills for a defined period',
    ],
    howItWorks: [
      {
        title: 'Define',
        description: 'Agree skills, duration, hours overlap and the start date.',
      },
      {
        title: 'Match',
        description: 'We share screened contractor profiles, usually within days.',
      },
      { title: 'Onboard', description: 'Contracts, NDAs, devices and access are sorted up front.' },
      {
        title: 'Manage',
        description: 'We run timesheets, payments and check-ins while you run the work.',
      },
    ],
    commercialModel:
      'A simple monthly rate per contractor, billed only for time worked. Rates are shared after we understand the role.',
    faqs: [
      {
        question: 'Can contractors work in our time zone?',
        answer:
          'Yes. We agree overlap hours before matching and only propose contractors who can commit to them.',
      },
      {
        question: 'Can we hire a contractor permanently later?',
        answer:
          'Yes. Contract-to-hire conversion is available on terms agreed in your commercial agreement.',
      },
    ],
    seoDescription:
      'IT contract staffing and staff augmentation from India — pre-screened contractors, time-zone-aligned and fully managed.',
  },
  {
    slug: 'offshore-dedicated-teams',
    title: 'Offshore Dedicated Teams',
    shortTitle: 'Offshore Teams',
    icon: 'globe',
    summary:
      'A dedicated engineering team in India that works only on your product, under your direction.',
    intro:
      'Build a dedicated team of developers, QA and DevOps engineers in India that reports to you. We recruit, employ and support the team so you can focus on the roadmap — without setting up a local entity.',
    includes: [
      'Team design: roles, seniority mix and ramp-up plan',
      'Recruitment of every team member with your final approval',
      'Employment, payroll, benefits and statutory compliance in India',
      'Workspace, hardware and secure access options',
      'Retention support, reviews and backfills',
    ],
    idealFor: [
      'Start-ups and scale-ups building cost-effective engineering capacity',
      'Companies testing India before opening an entity',
      'Long-term product, QA or support functions',
    ],
    howItWorks: [
      { title: 'Plan', description: 'Agree team shape, budget, overlap hours and ramp-up dates.' },
      { title: 'Recruit', description: 'We hire each member; you approve every selection.' },
      { title: 'Launch', description: 'Onboarding, equipment and tools are ready on day one.' },
      { title: 'Grow', description: 'Scale the team up or down with predictable monthly costs.' },
    ],
    commercialModel:
      'A transparent monthly cost per team member covering salary, compliance and management. Shared after scoping.',
    faqs: [
      {
        question: 'Who manages the day-to-day work?',
        answer:
          'You do. The team works in your tools and processes; we handle employment, HR and administration.',
      },
      {
        question: 'Do we need an Indian entity?',
        answer: 'No. Team members are employed through Northpeak Talent.',
      },
    ],
    seoDescription:
      'Offshore dedicated engineering teams in India — recruited, employed and supported by Northpeak Talent, managed by you.',
  },
  {
    slug: 'rpo',
    title: 'Recruitment Process Outsourcing (RPO)',
    shortTitle: 'RPO',
    icon: 'workflow',
    summary:
      'An embedded recruitment function for high-volume or ongoing tech hiring, run to your process.',
    intro:
      'Hand over part or all of your technical hiring to a dedicated Northpeak recruitment pod. We work inside your ATS and brand, report against agreed metrics and scale with your hiring plan.',
    includes: [
      'Dedicated recruiters and a technical screener for your account',
      'Employer-branded outreach and candidate communication',
      'ATS hygiene, pipeline reporting and weekly hiring reviews',
      'Interview process design and hiring-manager enablement',
      'Flexible scope: project RPO, full-cycle or sourcing-only',
    ],
    idealFor: [
      'Companies hiring 10+ tech roles in a quarter',
      'Talent teams that need extra capacity without headcount',
      'Building a new office or capability centre',
    ],
    howItWorks: [
      { title: 'Assess', description: 'Review your hiring plan, process and current metrics.' },
      { title: 'Set up', description: 'Agree SLAs, tooling access and reporting cadence.' },
      { title: 'Deliver', description: 'The pod runs sourcing, screening and coordination.' },
      { title: 'Improve', description: 'Monthly reviews tune the funnel against agreed targets.' },
    ],
    commercialModel:
      'A monthly engagement fee sized to scope, with optional per-hire components. Proposed after an assessment call.',
    faqs: [
      {
        question: 'Will candidates know they are speaking to an outsourced team?',
        answer:
          'That is your choice. Many clients prefer recruiters to represent their brand directly.',
      },
      {
        question: 'What is the minimum engagement?',
        answer: 'Typically three months, so the process can stabilise and show measurable results.',
      },
    ],
    seoDescription:
      'Recruitment Process Outsourcing for technology hiring — dedicated recruiters, technical screening and transparent reporting.',
  },
  {
    slug: 'executive-search',
    title: 'Executive & Leadership Search',
    shortTitle: 'Executive Search',
    icon: 'crown',
    summary:
      'Confidential search for engineering managers, heads of engineering, architects and CTO-level roles.',
    intro:
      'Leadership hires shape teams for years. We run discreet, research-led searches for technology leaders, assessing technical depth, leadership track record and culture fit before presenting a short, considered slate.',
    includes: [
      'Discreet market mapping and direct approach',
      'Leadership and technical assessment against an agreed scorecard',
      'Referencing and background verification support',
      'Compensation benchmarking and offer advisory',
      'Post-joining check-ins during the first months',
    ],
    idealFor: [
      'Heads of engineering, VPs and engineering managers',
      'Principal architects and practice leads',
      'Country or delivery leaders for India operations',
    ],
    howItWorks: [
      { title: 'Calibrate', description: 'Define the mandate, scorecard and target companies.' },
      { title: 'Map', description: 'Research the market and approach candidates confidentially.' },
      { title: 'Assess', description: 'In-depth interviews and referencing on the shortlist.' },
      { title: 'Close', description: 'Offer, negotiation and transition planning.' },
    ],
    commercialModel: 'Agreed per search, shared confidentially after an introductory call.',
    faqs: [
      {
        question: 'How confidential is the search?',
        answer:
          'Fully. We can run searches without naming your company until a candidate is qualified and under NDA.',
      },
      {
        question: 'How long does a leadership search take?',
        answer:
          'It depends on the role and market, but a shortlist is typically presented within three to five weeks.',
      },
    ],
    seoDescription:
      'Executive and leadership search for technology roles — confidential, research-led and assessed by people who understand engineering.',
  },
  {
    slug: 'payroll-compliance',
    title: 'Payroll & Compliance Services',
    shortTitle: 'Payroll & Compliance',
    icon: 'wallet',
    summary:
      'Compliant payroll for your team in India — contracts, salaries, statutory filings and payslips handled.',
    intro:
      'Employ and pay people in India without setting up a local entity, or outsource payroll for your existing Indian team. We handle contracts, monthly payroll, statutory deductions and filings so your team is paid accurately and on time.',
    includes: [
      'Employment contracts and onboarding documentation',
      'Monthly payroll processing and digital payslips',
      'PF, ESI, Professional Tax and TDS deductions and filings',
      'Leave, reimbursements and full-and-final settlements',
      'Contractor payments and compliance documentation',
    ],
    idealFor: [
      'Overseas companies hiring their first people in India',
      'Teams converting contractors to compliant employment',
      'Companies that want payroll handled by specialists',
    ],
    howItWorks: [
      { title: 'Review', description: 'Understand headcount, pay structures and current setup.' },
      { title: 'Onboard', description: 'Contracts, documents and statutory registrations.' },
      { title: 'Run', description: 'Monthly payroll, payslips and filings to an agreed calendar.' },
      { title: 'Report', description: 'Clear monthly reports and a single point of contact.' },
    ],
    commercialModel:
      'A predictable monthly fee per employee. Shared confidentially after an introductory call.',
    faqs: [
      {
        question: 'Do you support employees outside India?',
        answer:
          'Our payroll and compliance services cover employees and contractors based in India.',
      },
      {
        question: 'Can you take over payroll mid-year?',
        answer: 'Yes. We migrate year-to-date data so filings and tax calculations stay accurate.',
      },
    ],
    seoDescription:
      'Payroll and compliance services in India — employment contracts, monthly payroll, PF, ESI, PT and TDS handled by specialists.',
  },
];

export const findService = (slug: string | undefined) => services.find((s) => s.slug === slug);
