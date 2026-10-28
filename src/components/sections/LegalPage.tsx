import type { LegalDocument } from '@/content/types';
import { Seo } from '@/components/layout/Seo';
import { PageHeader } from '@/components/sections/PageHeader';

export function LegalPage({ doc, path }: { doc: LegalDocument; path: string }) {
  return (
    <>
      <Seo title={doc.title} description={doc.description} path={path} />
      <PageHeader
        title={doc.title}
        intro={<p className="text-base">Last updated: {doc.lastUpdated}</p>}
        breadcrumbs={[{ label: doc.title }]}
      />
      <article className="container-content py-14 sm:py-16">
        <div className="prose-legal max-w-3xl">
          <p className="!mt-0 text-lg">{doc.intro}</p>
          {doc.sections.map((section, index) => (
            <div key={index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
