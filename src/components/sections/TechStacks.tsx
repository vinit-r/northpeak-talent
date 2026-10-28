import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { techStacks, techStacksIntro } from '@/content/techStacks';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

interface TechStacksProps {
  variant?: 'compact' | 'detailed';
  tone?: 'default' | 'surface';
}

export function TechStacks({ variant = 'compact', tone = 'surface' }: TechStacksProps) {
  const compact = variant === 'compact';
  return (
    <Section
      id="tech-stacks"
      tone={tone}
      eyebrow={techStacksIntro.eyebrow}
      title={techStacksIntro.title}
      intro={techStacksIntro.intro}
      actions={
        compact ? (
          <Link
            to={routes.industries}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Industries & tech we cover <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        ) : undefined
      }
    >
      <Reveal>
        <ul
          className={cn(
            compact ? 'flex flex-wrap gap-3' : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {techStacks.map((stack) =>
            compact ? (
              <li
                key={stack.name}
                className="rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium"
                title={stack.detail}
              >
                {stack.name}
              </li>
            ) : (
              <li key={stack.name} className="rounded-2xl border border-border bg-bg p-5">
                <p className="font-semibold">{stack.name}</p>
                <p className="mt-1 text-sm text-muted">{stack.detail}</p>
              </li>
            ),
          )}
        </ul>
      </Reveal>
    </Section>
  );
}
