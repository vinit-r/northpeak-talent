import { z } from 'zod';
import { formConfig } from '@/config/forms';

const required = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} is required`).max(max, `${label} is too long`);

const email = (label: string) =>
  z.string().trim().min(1, `${label} is required`).email('Enter a valid email address').max(254);

const consent = z.literal(true, {
  errorMap: () => ({ message: 'Please accept the Privacy Policy to continue' }),
});

/** Honeypot — must stay empty. Validation is not enforced client-side so bots get no signal. */
const honeypot = z.string().optional();

export const enquirySchema = z.object({
  name: required('Name', 100),
  company: required('Company', 150),
  email: email('Work email'),
  country: required('Country'),
  service: required('Service'),
  roles: required('Roles / headcount', 300),
  message: z.string().trim().max(3000, 'Message is too long').optional(),
  consent,
  website: honeypot,
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

const fileExtension = (name: string) => name.split('.').pop()?.toLowerCase() ?? '';

export const candidateSchema = z.object({
  name: required('Full name', 100),
  email: email('Email'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s()-]{7,20}$/, 'Enter a valid phone number, including country code'),
  location: required('Current location', 120),
  preferredCountry: required('Preferred country'),
  skills: required('Key skills', 500),
  experience: required('Experience'),
  noticePeriod: required('Notice period'),
  resume: z.custom<FileList>().superRefine((files, ctx) => {
    const file = files?.[0];
    if (!file) {
      ctx.addIssue({ code: 'custom', message: 'Please attach your resume' });
      return;
    }
    if (!(formConfig.resume.extensions as readonly string[]).includes(fileExtension(file.name))) {
      ctx.addIssue({ code: 'custom', message: 'Upload a PDF, DOC or DOCX file' });
    }
    if (file.size > formConfig.resume.maxBytes) {
      ctx.addIssue({ code: 'custom', message: 'File must be 5 MB or smaller' });
    }
  }),
  consent,
  website: honeypot,
});

export type CandidateValues = z.infer<typeof candidateSchema>;
