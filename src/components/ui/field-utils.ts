import { useId } from 'react';
import { cn } from '@/lib/utils';

export interface FieldOwnProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Applied to the wrapper. */
  className?: string;
}

export const controlClasses = (invalid: boolean) =>
  cn(
    'block w-full rounded-lg border bg-bg px-3.5 py-2.5 text-[0.95rem] text-fg placeholder:text-muted/70',
    'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
    invalid
      ? 'border-danger focus-visible:border-danger'
      : 'border-field/50 focus-visible:border-primary',
  );

export function useFieldIds(id: string | undefined, hint?: string, error?: string) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;
  return { fieldId, hintId, errorId, describedBy };
}
