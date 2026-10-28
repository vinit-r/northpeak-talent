import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { routes } from '@/config/routes';
import { notFoundPage, pageMeta } from '@/content/copy';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <>
      <Seo
        title={pageMeta.notFound.title}
        description={pageMeta.notFound.description}
        path={pathname}
        noindex
      />
      <section className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-7xl font-extrabold text-primary/30">404</p>
        <h1 className="mt-4 text-3xl font-bold">{notFoundPage.title}</h1>
        <p className="mt-3 max-w-md text-muted">{notFoundPage.text}</p>
        <Button to={routes.home} className="mt-8">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {notFoundPage.cta}
        </Button>
      </section>
    </>
  );
}
