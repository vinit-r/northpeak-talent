export const formConfig = {
  /** Google Apps Script Web App URL. */
  endpoint: import.meta.env.VITE_FORM_ENDPOINT ?? '',
  /** Optional Cloudflare Turnstile site key; the widget renders only when set. */
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '',
  /** Submissions faster than this after the form mounts are treated as bots. */
  minFillTimeMs: 3000,
  resume: {
    maxBytes: 5 * 1024 * 1024,
    extensions: ['pdf', 'doc', 'docx'],
    accept:
      '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  turnstileEnabled: Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY),
  options: {
    experience: ['0–1 years', '1–3 years', '3–5 years', '5–8 years', '8–12 years', '12+ years'],
    noticePeriod: [
      'Immediate joiner',
      'Up to 15 days',
      '30 days',
      '60 days',
      '90 days',
      'Currently serving notice',
    ],
  },
} as const;
