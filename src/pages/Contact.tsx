import { useSearchParams } from 'react-router-dom';
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { routes } from '@/config/routes';
import { site } from '@/config/site';
import { contactPage, pageMeta } from '@/content/copy';
import { Seo } from '@/components/layout/Seo';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { MapEmbed } from '@/components/sections/MapEmbed';
import { PageHeader } from '@/components/sections/PageHeader';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { buildBreadcrumbJsonLd, officeAddressLine } from '@/lib/seo';
import { telHref, whatsappHref } from '@/lib/utils';

export default function Contact() {
  const [params] = useSearchParams();
  const presetService = params.get('service') ?? undefined;
  const intent = params.get('intent') === 'commercial-terms' ? 'commercial-terms' : undefined;

  const contactLinks = [
    { icon: Mail, label: site.emails.general, href: `mailto:${site.emails.general}` },
    site.phones.primary && {
      icon: Phone,
      label: site.phones.primaryDisplay || site.phones.primary,
      href: telHref(site.phones.primary),
    },
    site.whatsapp.number && {
      icon: MessageCircle,
      label: 'Chat on WhatsApp',
      href: whatsappHref(site.whatsapp.number, site.whatsapp.defaultMessage),
      external: true,
    },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href: string; external?: boolean }[];

  return (
    <>
      <Seo
        title={pageMeta.contact.title}
        description={pageMeta.contact.description}
        path={routes.contact}
        jsonLd={[buildBreadcrumbJsonLd([{ name: 'Contact', path: routes.contact }])]}
      />
      <PageHeader
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        intro={contactPage.intro}
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <div className="container-content grid gap-8 py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <Card id="enquiry" className="p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold">{contactPage.formTitle}</h2>
            {/* Re-mount when the preset changes so default values update. */}
            <EnquiryForm
              key={`${presetService}-${intent}`}
              presetService={presetService}
              intent={intent}
            />
          </Card>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.06}>
            <Card className="p-6">
              <h2 className="text-lg font-semibold">{contactPage.officeTitle}</h2>
              <address className="mt-4 flex gap-3 not-italic text-muted">
                <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <span className="block font-medium text-fg">
                    {site.companyName} — {site.office.label}
                  </span>
                  {officeAddressLine()}
                </span>
              </address>
              <MapEmbed className="mt-5" />
              <a
                href={site.office.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {contactPage.directionsLabel}
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <ul className="mt-6 space-y-3 border-t border-border pt-5">
                {contactLinks.map(({ icon: Icon, label, href, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-3 font-medium hover:text-primary"
                    >
                      <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Clock aria-hidden="true" className="h-5 w-5 text-primary" />
                {contactPage.hoursTitle}
              </h2>
              <p className="mt-3">
                <span className="font-medium">{site.businessHours.days}</span>
                <br />
                <span className="text-muted">{site.businessHours.ist}</span>
              </p>
              <p className="mt-4 text-sm text-muted">{site.businessHours.overlapNote}</p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Client overlap hours by region</caption>
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                      <th scope="col" className="py-2 pr-3 font-semibold">
                        Region
                      </th>
                      <th scope="col" className="py-2 pr-3 font-semibold">
                        IST
                      </th>
                      <th scope="col" className="py-2 font-semibold">
                        Local
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {site.businessHours.overlap.map((row) => (
                      <tr key={row.region} className="border-b border-border last:border-0">
                        <th scope="row" className="py-2.5 pr-3 font-medium">
                          {row.region}
                        </th>
                        <td className="py-2.5 pr-3 text-muted">{row.ist}</td>
                        <td className="py-2.5 text-muted">{row.local}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </>
  );
}
