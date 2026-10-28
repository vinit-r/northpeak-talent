import { markets, marketsIntro } from '@/content/markets';
import { Flag } from '@/components/ui/Flag';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function MarketsServed() {
  return (
    <Section
      id="markets"
      eyebrow={marketsIntro.eyebrow}
      title={marketsIntro.title}
      intro={marketsIntro.intro}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {markets.map((market, index) => (
          <Reveal
            as="li"
            key={market.name}
            delay={(index % 3) * 0.05}
            className="flex items-center gap-4 rounded-2xl border border-border bg-bg p-5"
          >
            <Flag code={market.flag} label={`Flag of ${market.name}`} />
            <div>
              <p className="font-semibold">{market.name}</p>
              <p className="text-sm text-muted">{market.note}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
