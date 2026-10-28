import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/Button';
import { useConsent } from '@/hooks/useConsent';

/** Essential-only by default. "Allow embeds" additionally lets Google Maps load automatically. */
export function CookieBanner() {
  const { decided, setConsent } = useConsent();
  if (decided) return null;

  return (
    <section
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-bg p-5 shadow-lift sm:inset-x-6 sm:bottom-6 sm:left-6 sm:mx-0"
    >
      <div className="flex gap-3">
        <Cookie aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <h2 className="text-sm font-semibold">Your privacy</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            We use only essential browser storage to remember your preferences — no tracking or
            advertising cookies. Google Maps (which sets its own cookies) loads only if you allow
            embedded content.{' '}
            <Link
              to={routes.privacy}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setConsent('essential')}>
              Essential only
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setConsent('embeds')}>
              Allow embeds
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
