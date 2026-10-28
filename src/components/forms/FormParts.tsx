import type { UseFormRegisterReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

/** Off-screen field that humans never see or fill. */
export function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}

export function ConsentField({
  registration,
  error,
  purpose,
}: {
  registration: UseFormRegisterReturn;
  error?: string;
  purpose: string;
}) {
  return (
    <Checkbox
      {...registration}
      error={error}
      aria-required="true"
      label={
        <>
          I agree to the{' '}
          <Link
            to={routes.privacy}
            target="_blank"
            className="font-medium text-primary underline underline-offset-2"
          >
            Privacy Policy
          </Link>{' '}
          and consent to Northpeak Talent {purpose}. *
        </>
      }
    />
  );
}

export function SubmitButton({ submitting, label }: { submitting: boolean; label: string }) {
  return (
    <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
      {submitting ? (
        <>
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin motion-reduce:animate-none" />
          Sending…
        </>
      ) : (
        label
      )}
    </Button>
  );
}

export function SuccessPanel({
  title,
  text,
  onReset,
  resetLabel,
}: {
  title: string;
  text: string;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center rounded-2xl border border-border bg-surface p-10 text-center"
    >
      <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-success" />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-muted">{text}</p>
      <Button variant="secondary" className="mt-6" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}
