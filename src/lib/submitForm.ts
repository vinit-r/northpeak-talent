import { formConfig } from '@/config/forms';

export type FormType = 'enquiry' | 'candidate';

export interface FilePayload {
  name: string;
  type: string;
  size: number;
  /** Base64 without the data: prefix. */
  data: string;
}

export interface SubmitPayload {
  formType: FormType;
  fields: Record<string, string>;
  file?: FilePayload;
  meta: {
    startedAt: number;
    submittedAt: number;
    honeypot: string;
    turnstileToken?: string;
    page: string;
  };
}

export class FormSubmitError extends Error {}

export function fileToPayload(file: File): Promise<FilePayload> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        data: result.slice(result.indexOf(',') + 1),
      });
    };
    reader.onerror = () => reject(new FormSubmitError('Could not read the selected file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Posts to the Google Apps Script Web App.
 * text/plain avoids a CORS preflight, which Apps Script cannot answer.
 */
export async function submitForm(payload: SubmitPayload): Promise<void> {
  if (!formConfig.endpoint) {
    if (import.meta.env.DEV) {
      console.info('[submitForm] VITE_FORM_ENDPOINT not set — simulated submission:', {
        ...payload,
        file: payload.file && { ...payload.file, data: `<${payload.file.data.length} chars>` },
      });
      await new Promise((r) => setTimeout(r, 800));
      return;
    }
    throw new FormSubmitError('The form is not configured yet. Please email us instead.');
  }

  let response: Response;
  try {
    response = await fetch(formConfig.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });
  } catch {
    throw new FormSubmitError('Network error. Please check your connection and try again.');
  }

  const result = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;
  if (!response.ok || !result?.ok) {
    throw new FormSubmitError(result?.error ?? 'Something went wrong. Please try again.');
  }
}
