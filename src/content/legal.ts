/**
 * Legal page text. Have these reviewed by a qualified lawyer before launch.
 */
import { site } from '@/config/site';
import type { LegalDocument } from '@/content/types';

const LAST_UPDATED = '28 October 2026';
const company = site.companyName;

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  description: `How ${company} collects, uses, stores and deletes personal data of candidates, clients and website visitors.`,
  lastUpdated: LAST_UPDATED,
  intro: `${site.legalName} ("${company}", "we", "us") is an IT recruitment, staffing and payroll company based in ${site.office.locality}, India. This policy explains how we handle personal data under India’s Digital Personal Data Protection Act, 2023 (DPDP Act), the UK General Data Protection Regulation (UK GDPR) and, where applicable, the California Consumer Privacy Act (CCPA).`,
  sections: [
    {
      heading: '1. Who is responsible for your data',
      paragraphs: [
        `${site.legalName} is the data fiduciary (DPDP Act) and data controller (UK GDPR) for personal data collected through this website and our recruitment services.`,
        `Contact for privacy matters and our Grievance Officer: ${site.emails.privacy}.`,
      ],
    },
    {
      heading: '2. Data we collect',
      paragraphs: ['From candidates who submit a resume or speak with us:'],
      list: [
        'Identity and contact details: name, email address, phone number, current location',
        'Career information: resume/CV, skills, years of experience, notice period, preferred country, employment history and qualifications you choose to share',
        'Screening notes made by our team during technical and HR conversations',
        'Your consent records and communication preferences',
      ],
    },
    {
      heading: '',
      paragraphs: ['From clients and business enquiries:'],
      list: [
        'Name, company, work email, country, the service you are interested in and your message',
        'Information about roles and headcount you share with us',
      ],
    },
    {
      heading: '',
      paragraphs: [
        'From website visitors: we use only essential browser storage to remember your theme and cookie choice. We do not use advertising or analytics cookies unless you agree to them. Embedded Google Maps loads only after you choose to show it.',
      ],
    },
    {
      heading: '3. Why we use your data and our legal basis',
      list: [
        'To match candidates with suitable job opportunities and contact them about roles — based on your consent (DPDP Act, UK GDPR Art. 6(1)(a)) and our legitimate interest in providing recruitment services (UK GDPR Art. 6(1)(f))',
        'To share a candidate’s profile with a prospective employer — only with the candidate’s agreement for that specific role',
        'To respond to enquiries and provide services to clients — to take steps at your request before entering a contract and to perform it',
        'To meet legal obligations such as tax, payroll and record-keeping requirements',
        'To protect our website and forms from fraud and spam',
      ],
    },
    {
      heading: '4. How long we keep data',
      list: [
        'Candidate profiles and resumes: up to 24 months after our last meaningful contact with you, unless you ask us to delete them sooner or you are placed in a role (in which case placement records are kept as required by law and contract)',
        'Business enquiries that do not lead to an engagement: up to 24 months',
        'Client, payroll and invoicing records: for the period required by Indian tax and company law (typically 8 years)',
        'Spam or incomplete submissions: deleted promptly',
      ],
    },
    {
      heading: '5. Where your data is stored and who we share it with',
      paragraphs: [
        'Form submissions are stored in Google Workspace (Google Sheets and Google Drive) and notification emails, with access limited to authorised team members. Google may process data on servers outside India under its standard contractual safeguards.',
        'We share candidate data with prospective employers only with the candidate’s agreement, and with service providers who help us operate (for example email and cloud storage) under confidentiality obligations. We do not sell personal data.',
        'When data is transferred from the UK or EEA to India or other countries, we rely on appropriate safeguards such as the UK International Data Transfer Addendum or Standard Contractual Clauses.',
      ],
    },
    {
      heading: '6. Your rights and how to request deletion',
      paragraphs: [
        'Depending on where you live, you may have the right to access, correct, update or erase your personal data, withdraw consent, object to or restrict processing, data portability, and to nominate another person to exercise your rights (DPDP Act).',
        `To request a copy or deletion of your data, email ${site.emails.privacy} with the subject "Data request" from the email address you used with us. We respond within 30 days. Withdrawing consent does not affect processing that happened before withdrawal.`,
        'If you are unhappy with our response you may complain to the Data Protection Board of India, the UK Information Commissioner’s Office (ico.org.uk) or your local data protection authority.',
      ],
    },
    {
      heading: '7. Notice for California residents (CCPA)',
      paragraphs: [
        'We collect the categories of personal information described in section 2 for the purposes in section 3. We do not sell or share personal information for cross-context behavioural advertising. California residents may request to know, correct or delete their personal information and will not be discriminated against for exercising these rights. Use the contact details in section 6.',
      ],
    },
    {
      heading: '8. Security',
      paragraphs: [
        'We use access controls, two-factor authentication on our accounts, encrypted connections (HTTPS) and limited sharing to protect your data. No method of transmission is completely secure, so please do not send sensitive information such as identity documents or bank details through our website forms.',
      ],
    },
    {
      heading: '9. Children',
      paragraphs: [
        'Our services are intended for people aged 18 and over. We do not knowingly collect data from children.',
      ],
    },
    {
      heading: '10. Changes to this policy',
      paragraphs: [
        'We may update this policy from time to time. The "last updated" date at the top shows when it was last changed.',
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: 'Terms of Use',
  description: `Terms governing the use of the ${company} website.`,
  lastUpdated: LAST_UPDATED,
  intro: `These terms apply to your use of this website operated by ${site.legalName}. By using the website you agree to them. Separate written agreements govern our recruitment, staffing and payroll services.`,
  sections: [
    {
      heading: '1. Use of the website',
      list: [
        'Use the website only for lawful purposes and in a way that does not harm the website or other users',
        'Do not submit false, misleading or someone else’s information through our forms',
        'Do not attempt to access systems or data you are not authorised to access',
      ],
    },
    {
      heading: '2. No guarantee of employment or results',
      paragraphs: [
        'Submitting a resume does not guarantee an interview or a job offer. Hiring decisions are made by employers. Statements about timelines (such as our 48-hour shortlist target) are targets, not guarantees.',
      ],
    },
    {
      heading: '3. Information on this website',
      paragraphs: [
        'We aim to keep information accurate and up to date but it is provided for general information only and may change without notice. It does not form part of any contract.',
      ],
    },
    {
      heading: '4. Intellectual property',
      paragraphs: [
        `The ${company} name, logo and website content belong to us or our licensors. Third-party company names are the property of their respective owners and are used for identification only; their use does not imply endorsement.`,
      ],
    },
    {
      heading: '5. Third-party links and embeds',
      paragraphs: [
        'The website may link to or embed third-party services such as Google Maps. We are not responsible for their content or privacy practices.',
      ],
    },
    {
      heading: '6. Limitation of liability',
      paragraphs: [
        'To the extent permitted by law, we are not liable for any indirect or consequential loss arising from use of this website. Nothing in these terms limits liability that cannot be limited by law.',
      ],
    },
    {
      heading: '7. Governing law',
      paragraphs: [
        `These terms are governed by the laws of India. Courts at ${site.office.locality}, ${site.office.region} have jurisdiction, without affecting any mandatory consumer rights you may have where you live.`,
      ],
    },
    {
      heading: '8. Contact',
      paragraphs: [`Questions about these terms: ${site.emails.general}.`],
    },
  ],
};

export const fraudNotice: LegalDocument = {
  title: 'Recruitment Fraud Notice',
  description: `How to recognise fake job offers that misuse the ${company} name, and how to report them.`,
  lastUpdated: LAST_UPDATED,
  intro: `Fraudsters sometimes pose as recruitment companies to collect money or personal information. ${company} never charges candidates any fee. Our services are paid by employers.`,
  sections: [
    {
      heading: 'We will never',
      list: [
        'Ask you to pay for registration, interviews, training, visas, documents, equipment or "security deposits"',
        'Ask for bank card details, OTPs, passwords or UPI PINs',
        'Make a job offer without at least one interview with the employer',
        'Conduct the whole hiring process only over WhatsApp or Telegram chat',
        'Contact you from a free email address (such as Gmail or Yahoo) claiming to be from Northpeak Talent',
      ],
    },
    {
      heading: 'How to verify that a message is genuine',
      list: [
        `Our emails come only from addresses ending in @${site.emails.general.split('@')[1]}`,
        'Our recruiters will be happy to confirm the role details on a video call',
        `If in doubt, write to ${site.emails.general} before sharing documents or making any payment`,
      ],
    },
    {
      heading: 'If you think you have been targeted',
      list: [
        `Stop responding and do not send money. Forward the message to ${site.emails.general}`,
        'In India, report cyber fraud at cybercrime.gov.in or by calling the national helpline 1930',
        'In the UK, report to Action Fraud; in the US, report to the FTC at reportfraud.ftc.gov',
      ],
    },
  ],
};
