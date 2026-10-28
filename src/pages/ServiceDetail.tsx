import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { contactWithService, routes, serviceDetailPath } from '@/config/routes';
import { pricing, servicesPage } from '@/content/copy';
import { findService, services } from '@/content/services';
import { Seo } from '@/components/layout/Seo';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { PageHeader } from '@/components/sections/PageHeader';
import { Button } from '@/components/ui/Button';
import { IconTile } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from '@/lib/seo';
import NotFound from '@/pages/NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = findService(slug);
  if (!service) return <NotFound />;

  const path = serviceDetailPath(service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Seo
        title={service.title}
        description={service.seoDescription}
        path={path}
        jsonLd={[
          buildServiceJsonLd(service, path),
          buildFaqJsonLd(service.faqs),
          buildBreadcrumbJsonLd([
            { name: 'Services', path: routes.services },
            { name: service.title, path },
          ]),
        ]}
      />
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        title={service.title}
        intro={service.intro}
        breadcrumbs={[{ label: 'Services', to: routes.services }, { label: service.shortTitle }]}
      >
        <Button to={contactWithService(service.slug)} size="lg">
          Discuss your requirement
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
        <Button
          to={contactWithService(service.slug, 'commercial-terms')}
          size="lg"
          variant="secondary"
        >
          {pricing.ctaLabel}
        </Button>
      </PageHeader>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="text-2xl font-bold">{servicesPage.includesTitle}</h2>
            <ul className="mt-6 space-y-4">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-fg">
                    <Check aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <aside className="rounded-2xl border border-border bg-surface p-7">
              <IconTile name={service.icon} />
              <h2 className="mt-4 text-lg font-semibold">{servicesPage.idealForTitle}</h2>
              <ul className="mt-4 space-y-3 text-muted">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" title={servicesPage.howItWorksTitle}>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.howItWorks.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.05}
              className="rounded-2xl border border-border bg-bg p-6"
            >
              <span className="text-sm font-bold text-primary" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section title={servicesPage.commercialTitle}>
        <Reveal className="flex flex-col gap-6 rounded-2xl border border-border p-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed">{service.commercialModel}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted">
              <Lock aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
              {pricing.note}
            </p>
          </div>
          <Button to={contactWithService(service.slug, 'commercial-terms')} className="shrink-0">
            {pricing.ctaLabel}
          </Button>
        </Reveal>
      </Section>

      <FAQ items={service.faqs} title={servicesPage.faqTitle} tone="surface" />

      <Section title={servicesPage.otherServicesTitle}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                to={serviceDetailPath(other.slug)}
                className="flex h-full items-center justify-between gap-2 rounded-xl border border-border p-4 font-medium hover:border-primary hover:text-primary"
              >
                {other.shortTitle}
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA />
    </>
  );
}
