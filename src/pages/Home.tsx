import { routes } from '@/config/routes';
import { pageMeta } from '@/content/copy';
import { faqs } from '@/content/faqs';
import { Seo } from '@/components/layout/Seo';
import { CTA } from '@/components/sections/CTA';
import { FAQ } from '@/components/sections/FAQ';
import { FoundersTeaser } from '@/components/sections/FoundersTeaser';
import { Hero } from '@/components/sections/Hero';
import { MarketsServed } from '@/components/sections/MarketsServed';
import { PlacementsStrip } from '@/components/sections/PlacementsStrip';
import { PricingApproach } from '@/components/sections/PricingApproach';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { StatsBar } from '@/components/sections/StatsBar';
import { TechStacks } from '@/components/sections/TechStacks';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyUs } from '@/components/sections/WhyUs';
import { buildFaqJsonLd } from '@/lib/seo';

export default function Home() {
  return (
    <>
      <Seo
        description={pageMeta.home.description}
        path={routes.home}
        jsonLd={[buildFaqJsonLd(faqs)]}
      />
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <ProcessSteps />
      <MarketsServed />
      <TechStacks />
      <WhyUs />
      <PricingApproach />
      <FoundersTeaser />
      <PlacementsStrip />
      <Testimonials />
      <FAQ items={faqs} />
      <CTA />
    </>
  );
}
