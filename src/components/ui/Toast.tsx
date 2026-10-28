import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { ToastContext, type ToastInput } from '@/components/ui/toast-context';
import { cn } from '@/lib/utils';

interface ToastItem extends ToastInput {
  id: number;
}

const DURATION_MS = 7000;

const toneStyles = {
  success: { icon: CheckCircle2, className: 'text-success' },
  error: { icon: XCircle, className: 'text-danger' },
  info: { icon: Info, className: 'text-primary' },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((all) => all.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (toast: ToastInput) => {
      const id = ++nextId.current;
      setToasts((all) => [...all.slice(-2), { ...toast, id }]);
      window.setTimeout(() => dismiss(id), DURATION_MS);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Live regions exist from first render so screen readers announce updates. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6">
        <div aria-live="polite" role="status" className="contents">
          {toasts
            .filter((t) => t.tone !== 'error')
            .map((t) => (
              <Toast key={t.id} toast={t} onDismiss={dismiss} />
            ))}
        </div>
        <div aria-live="assertive" role="alert" className="contents">
          {toasts
            .filter((t) => t.tone === 'error')
            .map((t) => (
              <Toast key={t.id} toast={t} onDismiss={dismiss} />
            ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  const { icon: Icon, className } = toneStyles[toast.tone];
  return (
    <div className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-bg p-4 shadow-lift">
      <Icon aria-hidden="true" className={cn('mt-0.5 h-5 w-5 shrink-0', className)} />
      <p className="flex-1 text-sm text-fg">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="rounded p-0.5 text-muted hover:text-fg"
        aria-label="Dismiss notification"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
