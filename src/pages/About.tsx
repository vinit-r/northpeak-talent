import { Target } from 'lucide-react';
import { routes } from '@/config/routes';
import { about, pageMeta } from '@/content/copy';
import { Seo } from '@/components/layout/Seo';
import { CTA } from '@/components/sections/CTA';
import { FoundersTeaser } from '@/components/sections/FoundersTeaser';
import { PageHeader } from '@/components/sections/PageHeader';
import { PlacementsStrip } from '@/components/sections/PlacementsStrip';
import { IconTile } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { buildBreadcrumbJsonLd } from '@/lib/seo';

export default function About() {
  return (
    <>
      <Seo
        title={pageMeta.about.title}
        description={pageMeta.about.description}
        path={routes.about}
        jsonLd={[buildBreadcrumbJsonLd([{ name: 'About', path: routes.about }])]}
      />
      <PageHeader
        eyebrow={about.eyebrow}
        title={about.title}
        intro={about.intro}
        breadcrumbs={[{ label: 'About' }]}
      />

      <Section title={about.storyTitle}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="rounded-2xl border border-border bg-surface p-7">
              <Target aria-hidden="true" className="h-8 w-8 text-accent-fg" />
              <h3 className="mt-4 text-xl font-semibold">{about.missionTitle}</h3>
              <p className="mt-3 leading-relaxed text-muted">{about.mission}</p>
            </aside>
          </Reveal>
        </div>
      </Section>

      <FoundersTeaser variant="full" tone="surface" />

      <Section title={about.valuesTitle}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value, index) => (
            <Reveal
              as="li"
              key={value.title}
              delay={index * 0.05}
              className="rounded-2xl border border-border p-6"
            >
              <IconTile name={value.icon} />
              <h3 className="mt-4 font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="screening"
        tone="surface"
        eyebrow={about.screening.eyebrow}
        title={about.screening.title}
        intro={about.screening.intro}
      >
        <ol className="grid gap-5 md:grid-cols-2">
          {about.screening.steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.05}
              className="flex gap-4 rounded-2xl border border-border bg-bg p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <PlacementsStrip />
      <CTA />
    </>
  );
}
