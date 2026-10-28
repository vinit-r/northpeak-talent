import { ArrowRight } from 'lucide-react';
import { ctaBanner } from '@/content/copy';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function CTA() {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <div className="container-content">
        <Reveal>
          {/* Fixed brand colours (not theme tokens) so the band looks the same in both themes. */}
          <div className="relative overflow-hidden rounded-3xl bg-[#1E3A8A] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2DD4BF]/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#60A5FA]/30 blur-3xl"
            />
            <h2 id="cta-title" className="relative text-3xl font-bold text-white sm:text-4xl">
              {ctaBanner.title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-blue-100">{ctaBanner.text}</p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to={ctaBanner.primary.to} size="lg" variant="inverse">
                {ctaBanner.primary.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              <Button
                to={ctaBanner.secondary.to}
                size="lg"
                className="border border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                {ctaBanner.secondary.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
