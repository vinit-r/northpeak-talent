import { statsIntro } from '@/content/copy';
import { showcaseStats } from '@/content/showcase';

export function StatsBar() {
  if (showcaseStats.length === 0) return null;
  return (
    <section aria-label={statsIntro.label} className="border-y border-border bg-surface">
      <dl className="container-content grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
        {showcaseStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse items-center gap-1 px-2 text-center"
          >
            <dt className="text-sm text-muted">{stat.label}</dt>
            <dd className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
