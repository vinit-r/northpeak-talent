import { faqIntro } from '@/content/faqs';
import type { Faq } from '@/content/types';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

interface FAQProps {
  items: Faq[];
  title?: string;
  tone?: 'default' | 'surface';
}

/** Pair with buildFaqJsonLd(items) in the page's <Seo> for rich results. */
export function FAQ({ items, title = faqIntro.title, tone = 'default' }: FAQProps) {
  if (items.length === 0) return null;
  return (
    <Section id="faq" tone={tone} eyebrow={faqIntro.eyebrow} title={title}>
      <Reveal className="mx-auto max-w-3xl">
        <Accordion items={items.map((f) => ({ title: f.question, content: f.answer }))} />
      </Reveal>
    </Section>
  );
}
