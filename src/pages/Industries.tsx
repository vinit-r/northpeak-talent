import { routes } from '@/config/routes';
import { industriesPage, pageMeta } from '@/content/copy';
import { industries } from '@/content/industries';
import { Seo } from '@/components/layout/Seo';
import { CTA } from '@/components/sections/CTA';
import { MarketsServed } from '@/components/sections/MarketsServed';
import { PageHeader } from '@/components/sections/PageHeader';
import { TechStacks } from '@/components/sections/TechStacks';
import { Card } from '@/components/ui/Card';
import { IconTile } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { buildBreadcrumbJsonLd } from '@/lib/seo';

export default function Industries() {
  return (
    <>
      <Seo
        title={pageMeta.industries.title}
        description={pageMeta.industries.description}
        path={routes.industries}
        jsonLd={[buildBreadcrumbJsonLd([{ name: 'Industries & Tech', path: routes.industries }])]}
      />
      <PageHeader
        eyebrow={industriesPage.eyebrow}
        title={industriesPage.title}
        intro={industriesPage.intro}
        breadcrumbs={[{ label: 'Industries & Tech' }]}
      />

      <Section>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal as="li" key={industry.name} delay={(index % 3) * 0.05}>
              <Card className="h-full">
                <IconTile name={industry.icon} />
                <h2 className="mt-5 text-xl font-semibold">{industry.name}</h2>
                <p className="mt-2 leading-relaxed text-muted">{industry.description}</p>
                <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">
                  {industriesPage.rolesLabel}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {industry.roles.map((role) => (
                    <li key={role} className="flex gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {role}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <TechStacks variant="detailed" />
      <MarketsServed />
      <CTA />
    </>
  );
}
