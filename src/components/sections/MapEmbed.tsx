import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { site } from '@/config/site';
import { useConsent } from '@/hooks/useConsent';
import { cn } from '@/lib/utils';

/**
 * Google Maps loads only when the visitor allowed embeds in the cookie banner or clicks
 * "Show map" — and even then the iframe is lazy-loaded.
 */
export function MapEmbed({ className }: { className?: string }) {
  const { consent } = useConsent();
  const [requested, setRequested] = useState(false);
  const show = consent === 'embeds' || requested;
  const title = `Map showing ${site.companyName} office in ${site.office.locality}`;

  return (
    <div
      className={cn(
        'relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface',
        className,
      )}
    >
      {show ? (
        <iframe
          src={site.office.mapEmbedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <MapPin aria-hidden="true" className="h-7 w-7 text-primary" />
          <p className="max-w-xs text-xs text-muted">
            The map is provided by Google and may set cookies.
          </p>
          <button
            type="button"
            onClick={() => setRequested(true)}
            className="rounded-lg border border-field/60 bg-bg px-3 py-1.5 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
          >
            Show map
          </button>
        </div>
      )}
    </div>
  );
}
