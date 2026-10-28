import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { showcaseTestimonials } from '@/content/showcase';
import { testimonialsIntro } from '@/content/testimonials';
import { Avatar } from '@/components/ui/Avatar';
import { Section } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

/** Scroll-snap card carousel. No autoplay; arrow buttons + native swipe/scroll. */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateButtons();
    window.addEventListener('resize', updateButtons);
    return () => window.removeEventListener('resize', updateButtons);
  }, [updateButtons]);

  if (showcaseTestimonials.length === 0) return null;

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * (card.clientWidth + 20),
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  const arrowClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-fg transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40';

  return (
    <Section
      id="testimonials"
      tone="surface"
      eyebrow={testimonialsIntro.eyebrow}
      title={testimonialsIntro.title}
      actions={
        <div className="flex gap-2">
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Previous testimonials"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Next testimonials"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      }
    >
      <div role="region" aria-roledescription="carousel" aria-label={testimonialsIntro.title}>
        <ul
          ref={trackRef}
          onScroll={updateButtons}
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
        >
          {showcaseTestimonials.map((t, index) => (
            <li
              key={index}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${showcaseTestimonials.length}`}
              className={cn(
                'flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-bg p-7 shadow-card',
                'sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]',
              )}
            >
              <Quote aria-hidden="true" className="h-7 w-7 text-accent" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-fg">“{t.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <Avatar text={t.name ?? t.role} />
                <p className="text-sm">
                  <span className="block font-semibold">{t.role}</span>
                  <span className="text-muted">{t.organisation}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
