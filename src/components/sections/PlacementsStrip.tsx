import { placementsCopy } from '@/content/placements';
import { showcaseClients } from '@/content/showcase';
import { Reveal } from '@/components/ui/Reveal';

const tileBase = 'flex h-16 items-center justify-center rounded-xl border border-border px-5';

export function PlacementsStrip() {
  if (showcaseClients.length === 0) return null;
  return (
    <section aria-labelledby="placements-title" className="py-14 sm:py-16">
      <div className="container-content">
        <Reveal className="text-center">
          <p className="eyebrow">{placementsCopy.eyebrow}</p>
          <h2
            id="placements-title"
            className="mx-auto mt-2 max-w-2xl text-2xl font-bold sm:text-3xl"
          >
            {placementsCopy.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {showcaseClients.map((client) => (
              <li key={client.name}>
                {client.logo ? (
                  // Logos sit on a white tile so dark brand marks stay legible in dark mode.
                  <div className={`${tileBase} bg-white`}>
                    <img
                      src={client.logo}
                      alt={client.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-8 w-auto max-w-[110px] object-contain"
                    />
                  </div>
                ) : (
                  <div className={`${tileBase} bg-surface`}>
                    <span className="text-center text-base font-bold tracking-tight text-fg/80">
                      {client.name}
                    </span>
                  </div>
                )}
              </li>
            ))}
            <li>
              <div className={`${tileBase} border-dashed bg-transparent`}>
                <span className="text-sm font-medium italic text-muted">
                  {placementsCopy.andOthers}
                </span>
              </div>
            </li>
          </ul>
        </Reveal>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted">
          {placementsCopy.disclaimer}
        </p>
      </div>
    </section>
  );
}
