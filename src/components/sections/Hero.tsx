import { ArrowRight, CheckCircle2, FileUp } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { hero } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function Hero() {
  const reduceMotion = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(var(--color-border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-border)) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top, black 30%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-content grid items-center gap-12 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-24">
        <div>
          <m.p className="eyebrow" {...fadeUp(0)}>
            {hero.eyebrow}
          </m.p>
          <m.h1
            id="hero-title"
            className="mt-4 text-[2.5rem] font-extrabold leading-[1.08] sm:text-6xl lg:text-[4rem]"
            {...fadeUp(0.05)}
          >
            {hero.title}
          </m.h1>
          <m.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            {...fadeUp(0.1)}
          >
            {hero.subtitle}
          </m.p>
          <m.div className="mt-8 flex flex-col gap-3 sm:flex-row" {...fadeUp(0.15)}>
            <Button to={hero.primaryCta.to} size="lg">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button to={hero.secondaryCta.to} size="lg" variant="secondary">
              <FileUp aria-hidden="true" className="h-4 w-4" />
              {hero.secondaryCta.label}
            </Button>
          </m.div>
          <m.ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2" {...fadeUp(0.2)}>
            {hero.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-muted">
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-accent-fg" />
                {item}
              </li>
            ))}
          </m.ul>
          <m.p
            className="mt-6 max-w-lg border-l-2 border-accent pl-4 text-sm text-muted"
            {...fadeUp(0.25)}
          >
            {hero.experienceLine}
          </m.p>
        </div>

        {/* Illustrative shortlist card */}
        <m.div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, delay: 0.2 },
              })}
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
          <div className="rounded-2xl border border-border bg-bg p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{hero.panel.title}</p>
                <p className="mt-0.5 text-xs text-muted">{hero.panel.subtitle}</p>
              </div>
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-fg">
                {hero.panel.badge}
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {['A K', 'S R', 'P M'].map((who, index) => (
                <li
                  key={who}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
                >
                  <Avatar text={who} />
                  <div className="min-w-0 flex-1">
                    <div className="h-2.5 w-28 rounded-full bg-fg/15" />
                    <div className="mt-2 h-2 w-40 max-w-full rounded-full bg-fg/10" />
                  </div>
                  <span className="text-xs font-semibold text-accent-fg">{96 - index * 4}%</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
              {hero.panel.rows.map((row) => (
                <div key={row.label}>
                  <dt className="text-[0.7rem] uppercase tracking-wide text-muted">{row.label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 rounded-lg bg-primary/10 px-3 py-2 text-center text-xs font-semibold text-primary">
              {hero.panel.footer}
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
}
