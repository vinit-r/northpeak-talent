import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { routes } from '@/config/routes';
import { candidatesPage, pageMeta } from '@/content/copy';
import { fraudNotice } from '@/content/legal';
import { Seo } from '@/components/layout/Seo';
import { ResumeForm } from '@/components/forms/ResumeForm';
import { PageHeader } from '@/components/sections/PageHeader';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { buildBreadcrumbJsonLd } from '@/lib/seo';

export default function ForCandidates() {
  return (
    <>
      <Seo
        title={pageMeta.candidates.title}
        description={pageMeta.candidates.description}
        path={routes.candidates}
        jsonLd={[buildBreadcrumbJsonLd([{ name: 'For Candidates', path: routes.candidates }])]}
      />
      <PageHeader
        eyebrow={candidatesPage.eyebrow}
        title={candidatesPage.title}
        intro={candidatesPage.intro}
        breadcrumbs={[{ label: 'For Candidates' }]}
      />

      <div className="container-content py-14 sm:py-16">
        {/* Prominent no-fee notice */}
        <Reveal>
          <aside
            aria-label="No fees for candidates"
            className="flex flex-col gap-3 rounded-2xl border-2 border-accent/50 bg-accent/10 p-6 sm:flex-row sm:items-center sm:gap-5"
          >
            <ShieldCheck aria-hidden="true" className="h-10 w-10 shrink-0 text-accent-fg" />
            <p className="text-lg font-semibold leading-snug sm:text-xl">
              {candidatesPage.feeNotice}
            </p>
          </aside>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-8">
            <Reveal>
              <h2 className="text-2xl font-bold">{candidatesPage.expectTitle}</h2>
              <ul className="mt-5 space-y-4">
                {candidatesPage.expect.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-fg"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert aria-hidden="true" className="h-5 w-5 text-danger" />
                  <h2 className="font-semibold">{fraudNotice.title}</h2>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{fraudNotice.intro}</p>
                <Link
                  to={routes.fraudNotice}
                  className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  How to spot fake job offers
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <Card id="resume-form" className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold">{candidatesPage.formTitle}</h2>
              <p className="mb-6 mt-1.5 text-sm text-muted">{candidatesPage.formIntro}</p>
              <ResumeForm />
            </Card>
          </Reveal>
        </div>
      </div>
    </>
  );
}
