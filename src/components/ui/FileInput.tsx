import { forwardRef, type InputHTMLAttributes } from 'react';
import { FieldShell } from '@/components/ui/FieldShell';
import { controlClasses, useFieldIds, type FieldOwnProps } from '@/components/ui/field-utils';
import { cn } from '@/lib/utils';

type FileInputProps = FieldOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'>;

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { label, error, hint, required, className, id, ...props },
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
      <input
        ref={ref}
        id={ids.fieldId}
        type="file"
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        aria-required={required || undefined}
        className={cn(
          controlClasses(Boolean(error)),
          'cursor-pointer py-2 text-sm text-muted',
          'file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/15',
        )}
        {...props}
      />
    </FieldShell>
  );
});
