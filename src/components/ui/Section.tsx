import { useId, type ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  tone?: 'default' | 'surface';
  align?: 'left' | 'center';
  headingLevel?: 'h1' | 'h2';
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = 'default',
  align = 'left',
  headingLevel: Heading = 'h2',
  actions,
  className,
  children,
}: SectionProps) {
  const titleId = useId();
  const centered = align === 'center';

  return (
    <section
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className={cn('py-16 sm:py-20 lg:py-24', tone === 'surface' && 'bg-surface', className)}
    >
      <div className="container-content">
        {(eyebrow || title || intro) && (
          <Reveal
            className={cn(
              'mb-10 flex flex-col gap-6 sm:mb-12',
              centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
            )}
          >
            <div className={cn('max-w-2xl', centered && 'mx-auto')}>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && (
                <Heading
                  id={titleId}
                  className={cn(
                    'mt-2 font-bold',
                    Heading === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl',
                  )}
                >
                  {title}
                </Heading>
              )}
              {intro && <div className="mt-4 text-lg leading-relaxed text-muted">{intro}</div>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
