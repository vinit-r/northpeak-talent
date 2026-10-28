import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { FieldShell } from '@/components/ui/FieldShell';
import { controlClasses, useFieldIds, type FieldOwnProps } from '@/components/ui/field-utils';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

type SelectProps = FieldOwnProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
    options: SelectOption[];
    placeholder?: string;
  };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, required, className, id, options, placeholder = 'Select…', ...props },
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
      <div className="relative">
        <select
          ref={ref}
          id={ids.fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={ids.describedBy}
          aria-required={required || undefined}
          className={cn(controlClasses(Boolean(error)), 'appearance-none pr-10')}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
      </div>
    </FieldShell>
  );
});
