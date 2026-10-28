import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceDetailPath } from '@/config/routes';
import { servicesIntro } from '@/content/copy';
import { services } from '@/content/services';
import { Card } from '@/components/ui/Card';
import { IconTile } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

interface ServicesGridProps {
  /** Hide the section heading when the page already provides one. */
  showHeading?: boolean;
  tone?: 'default' | 'surface';
}

export function ServicesGrid({ showHeading = true, tone = 'default' }: ServicesGridProps) {
  return (
    <Section
      id="services"
      tone={tone}
      eyebrow={showHeading ? servicesIntro.eyebrow : undefined}
      title={showHeading ? servicesIntro.title : undefined}
      intro={showHeading ? servicesIntro.intro : undefined}
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal as="li" key={service.slug} delay={(index % 3) * 0.06} className="h-full">
            <Card interactive className="group relative flex h-full flex-col">
              <IconTile name={service.icon} />
              <h3 className="mt-5 text-lg font-semibold">
                <Link
                  to={serviceDetailPath(service.slug)}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none group-focus-within:after:outline group-focus-within:after:outline-2 group-focus-within:after:outline-primary"
                >
                  {service.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{service.summary}</p>
              <span
                aria-hidden="true"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                {servicesIntro.linkLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
