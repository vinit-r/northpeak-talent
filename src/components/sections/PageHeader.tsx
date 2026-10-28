import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { Reveal } from '@/components/ui/Reveal';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}

/** Top band for inner pages: optional breadcrumb, eyebrow, H1, intro and actions. */
export function PageHeader({ eyebrow, title, intro, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-3xl"
      />
      <div className="container-content relative py-14 sm:py-20">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <Link to={routes.home} className="hover:text-primary">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-primary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-fg">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
          {intro && (
            <div className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">{intro}</div>
          )}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
