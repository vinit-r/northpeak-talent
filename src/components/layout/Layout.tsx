import { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { buildOrganizationJsonLd } from '@/lib/seo';

const organizationJsonLd = JSON.stringify(buildOrganizationJsonLd());

/** Scroll to top (or to #hash) on navigation. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so lazily loaded pages have rendered their anchors.
      const id = window.setTimeout(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      }, 50);
      return () => window.clearTimeout(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PageFallback() {
  return (
    <div
      className="container-content flex min-h-[60vh] items-center justify-center"
      aria-busy="true"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary motion-reduce:animate-none" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function Layout() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{organizationJsonLd}</script>
      </Helmet>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
