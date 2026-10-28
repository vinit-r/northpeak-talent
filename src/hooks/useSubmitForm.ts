import { useCallback, useRef, useState } from 'react';
import { formConfig } from '@/config/forms';
import { useToast } from '@/components/ui/toast-context';
import { FormSubmitError, submitForm, type FilePayload, type FormType } from '@/lib/submitForm';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface SubmitInput {
  fields: Record<string, string>;
  file?: FilePayload;
  honeypot: string;
  turnstileToken?: string;
}

const messages: Record<FormType, string> = {
  enquiry: 'Thank you — your enquiry has been sent. We will reply within one business day.',
  candidate: 'Thank you — your profile has been received. We will be in touch when a role matches.',
};

export function useSubmitForm(formType: FormType) {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const { notify } = useToast();

  const submit = useCallback(
    async ({ fields, file, honeypot, turnstileToken }: SubmitInput) => {
      // Honeypot filled: pretend success so bots get no signal.
      if (honeypot) {
        setStatus('success');
        return true;
      }
      if (Date.now() - startedAt.current < formConfig.minFillTimeMs) {
        notify({ tone: 'error', message: 'That was quick! Please review the form and try again.' });
        return false;
      }

      setStatus('submitting');
      try {
        await submitForm({
          formType,
          fields,
          file,
          meta: {
            startedAt: startedAt.current,
            submittedAt: Date.now(),
            honeypot,
            turnstileToken,
            page: window.location.pathname,
          },
        });
        setStatus('success');
        notify({ tone: 'success', message: messages[formType] });
        return true;
      } catch (error) {
        setStatus('error');
        notify({
          tone: 'error',
          message:
            error instanceof FormSubmitError
              ? error.message
              : 'Something went wrong. Please try again.',
        });
        return false;
      }
    },
    [formType, notify],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    startedAt.current = Date.now();
  }, []);

  return { status, submit, reset };
}
