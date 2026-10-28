import { processIntro, processSteps } from '@/content/process';
import { IconTile } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function ProcessSteps({ tone = 'surface' }: { tone?: 'default' | 'surface' }) {
  return (
    <Section
      id="process"
      tone={tone}
      eyebrow={processIntro.eyebrow}
      title={processIntro.title}
      intro={processIntro.intro}
    >
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={index * 0.06}
            className="relative h-full rounded-2xl border border-border bg-bg p-6"
          >
            <div className="flex items-center justify-between">
              <IconTile name={step.icon} />
              <span className="text-sm font-bold text-muted" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-5 font-semibold">
              <span className="sr-only">Step {index + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
