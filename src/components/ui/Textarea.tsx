import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { FieldShell } from '@/components/ui/FieldShell';
import { controlClasses, useFieldIds, type FieldOwnProps } from '@/components/ui/field-utils';
import { cn } from '@/lib/utils';

type TextareaProps = FieldOwnProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, required, className, id, rows = 5, ...props },
  ref,
) {
  const ids = useFieldIds(id, hint, error);
  return (
    <FieldShell
      {...ids}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <textarea
        ref={ref}
        id={ids.fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        aria-required={required || undefined}
        className={cn(controlClasses(Boolean(error)), 'resize-y')}
        {...props}
      />
    </FieldShell>
  );
});
