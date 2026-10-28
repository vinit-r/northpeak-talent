import { Helmet } from 'react-helmet-async';
import { site } from '@/config/site';
import { isSampleMode } from '@/content/showcase';
import { absoluteUrl } from '@/lib/seo';

interface SeoProps {
  title?: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

export function Seo({
  title,
  description,
  path,
  image = '/og-image.png',
  noindex,
  jsonLd = [],
}: SeoProps) {
  const fullTitle = title
    ? `${title} | ${site.companyName}`
    : `${site.companyName} — ${site.tagline}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  // Sample-mode previews must never be indexed.
  const blockIndexing = noindex || isSampleMode;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {blockIndexing && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.companyName} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
