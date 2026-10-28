import { forwardRef, type InputHTMLAttributes } from 'react';
import { FieldShell } from '@/components/ui/FieldShell';
import { controlClasses, useFieldIds, type FieldOwnProps } from '@/components/ui/field-utils';

type InputProps = FieldOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
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
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        aria-required={required || undefined}
        className={controlClasses(Boolean(error))}
        {...props}
      />
    </FieldShell>
  );
});
