import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, id, ...props },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={fieldId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-field accent-[rgb(var(--color-primary))]"
          {...props}
        />
        <label htmlFor={fieldId} className="text-sm leading-6 text-muted">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="ml-8 mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
});
