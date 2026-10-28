import { whyUs } from '@/content/copy';
import { IconTile } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function WhyUs() {
  return (
    <Section id="why-us" eyebrow={whyUs.eyebrow} title={whyUs.title} intro={whyUs.intro}>
      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={(index % 3) * 0.05} className="flex gap-4">
            <IconTile name={item.icon} className="shrink-0 bg-accent/15 text-accent-fg" />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
