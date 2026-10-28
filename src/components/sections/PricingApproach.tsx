import { ArrowRight, Lock } from 'lucide-react';
import { contactWithService } from '@/config/routes';
import { pricing } from '@/content/copy';
import { services } from '@/content/services';
import { Button } from '@/components/ui/Button';
import { IconTile } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

interface PricingApproachProps {
  /** Service slug preset in the contact form. Defaults to the first service. */
  serviceSlug?: string;
  tone?: 'default' | 'surface';
}

export function PricingApproach({
  serviceSlug = services[0]!.slug,
  tone = 'surface',
}: PricingApproachProps) {
  return (
    <Section id="pricing" tone={tone} eyebrow={pricing.eyebrow} title={pricing.title}>
      <div className="grid gap-5 md:grid-cols-2">
        {pricing.points.map((point, index) => (
          <Reveal key={point.title} delay={index * 0.06}>
            <div className="h-full rounded-2xl border border-border bg-bg p-7">
              <IconTile name={point.icon} />
              <h3 className="mt-5 text-xl font-semibold">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{point.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-field/40 p-6 sm:flex-row sm:items-center">
        <p className="flex items-center gap-2.5 text-muted">
          <Lock aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
          {pricing.note}
        </p>
        <Button to={contactWithService(serviceSlug, 'commercial-terms')} variant="secondary">
          {pricing.ctaLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
