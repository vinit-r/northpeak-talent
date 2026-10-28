import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from 'lucide-react';
import { footerGroups } from '@/config/navigation';
import { routes } from '@/config/routes';
import { site } from '@/config/site';
import { candidatesPage } from '@/content/copy';
import { Logo } from '@/components/layout/Logo';
import { officeAddressLine } from '@/lib/seo';
import { telHref, whatsappHref } from '@/lib/utils';

const socialIcons = { linkedin: Linkedin, x: Twitter, facebook: Facebook, instagram: Instagram };
const registrationLabels = {
  cin: 'CIN',
  gst: 'GSTIN',
  msme: 'MSME (Udyam)',
  meaLicence: 'MEA Licence',
};

export function Footer() {
  const year = new Date().getFullYear();
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter(
    (key) => site.social[key],
  );
  const registrations = (
    Object.keys(site.registration) as (keyof typeof site.registration)[]
  ).filter((key) => site.registration[key]);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-content grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">{site.description}</p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5 text-muted">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{officeAddressLine()}</span>
            </li>
            <li>
              <a
                href={`mailto:${site.emails.general}`}
                className="inline-flex items-center gap-2.5 text-muted hover:text-primary"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {site.emails.general}
              </a>
            </li>
            {site.phones.primary && (
              <li>
                <a
                  href={telHref(site.phones.primary)}
                  className="inline-flex items-center gap-2.5 text-muted hover:text-primary"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {site.phones.primaryDisplay || site.phones.primary}
                </a>
              </li>
            )}
            {site.whatsapp.number && (
              <li>
                <a
                  href={whatsappHref(site.whatsapp.number, site.whatsapp.defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-muted hover:text-primary"
                >
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map((key) => {
                const Icon = socialIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={site.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.companyName} on ${key === 'x' ? 'X' : key}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:border-primary hover:text-primary"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold">{group.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-content flex flex-col gap-3 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
            {registrations.length > 0 && (
              <span className="mt-1 block md:ml-2 md:mt-0 md:inline">
                {registrations
                  .map((key) => `${registrationLabels[key]}: ${site.registration[key]}`)
                  .join(' · ')}
              </span>
            )}
          </p>
          <p>
            {candidatesPage.feeNotice}{' '}
            <Link
              to={routes.fraudNotice}
              className="font-medium text-fg underline-offset-2 hover:underline"
            >
              Fraud notice
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
