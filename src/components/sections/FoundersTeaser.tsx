import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin } from 'lucide-react';
import { routes } from '@/config/routes';
import { founders, foundersIntro } from '@/content/founders';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

interface FoundersTeaserProps {
  /** "teaser" on Home (short, links to About); "full" on About (full bios). */
  variant?: 'teaser' | 'full';
  tone?: 'default' | 'surface';
}

export function FoundersTeaser({ variant = 'teaser', tone = 'default' }: FoundersTeaserProps) {
  const full = variant === 'full';
  return (
    <Section
      id="founders"
      tone={tone}
      eyebrow={foundersIntro.eyebrow}
      title={foundersIntro.title}
      intro={foundersIntro.intro}
      actions={
        full ? undefined : (
          <Link
            to={routes.about}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Read our story <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        )
      }
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {founders.map((founder, index) => (
          <Reveal as="li" key={founder.name} delay={index * 0.08}>
            <Card className="h-full p-7">
              <div className="flex items-center gap-4">
                <Avatar text={founder.name} photo={founder.photo} size="lg" />
                <div>
                  <h3 className="text-xl font-semibold">{founder.name}</h3>
                  <p className="text-sm text-muted">{founder.role}</p>
                </div>
              </div>
              <p className="mt-5 font-semibold text-accent-fg">{founder.experience}</p>
              {full && <p className="mt-3 leading-relaxed text-muted">{founder.bio}</p>}
              <ul
                className="mt-5 flex flex-wrap gap-2"
                aria-label={`${founder.name}'s focus areas`}
              >
                {founder.focus.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
              {full && founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <Linkedin aria-hidden="true" className="h-4 w-4" />
                  {founder.name} on LinkedIn
                </a>
              )}
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
