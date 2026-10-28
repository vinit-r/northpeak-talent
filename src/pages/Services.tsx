import { routes } from '@/config/routes';
import { pageMeta, servicesPage } from '@/content/copy';
import { faqs } from '@/content/faqs';
import { Seo } from '@/components/layout/Seo';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { PageHeader } from '@/components/sections/PageHeader';
import { PricingApproach } from '@/components/sections/PricingApproach';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { buildBreadcrumbJsonLd } from '@/lib/seo';

export default function Services() {
  return (
    <>
      <Seo
        title={pageMeta.services.title}
        description={pageMeta.services.description}
        path={routes.services}
        jsonLd={[buildBreadcrumbJsonLd([{ name: 'Services', path: routes.services }])]}
      />
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        intro={servicesPage.intro}
        breadcrumbs={[{ label: 'Services' }]}
      />
      <ServicesGrid showHeading={false} />
      <ProcessSteps />
      <PricingApproach tone="default" />
      <FAQ items={faqs.slice(0, 5)} tone="surface" />
      <CTA />
    </>
  );
}
