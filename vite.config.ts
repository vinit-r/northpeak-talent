import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// Relative imports: the config is bundled before the "@/" alias exists.
import { site } from './src/config/site';
import { indexableRoutes, serviceDetailPath } from './src/config/routes';
import { services } from './src/content/services';

/** Emits sitemap.xml and robots.txt at build time from config + content. */
function seoFiles(allowIndexing: boolean): Plugin {
  return {
    name: 'northpeak-seo-files',
    apply: 'build',
    generateBundle() {
      const base = site.url.replace(/\/$/, '');
      const today = new Date().toISOString().slice(0, 10);
      const paths = [...indexableRoutes, ...services.map((s) => serviceDetailPath(s.slug))];
      const urls = paths
        .map(
          (p) =>
            `  <url>\n    <loc>${base}${p === '/' ? '/' : p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
        )
        .join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: allowIndexing
          ? `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
          : `# Non-production build: keep out of search indexes.\nUser-agent: *\nDisallow: /\n`,
      });
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const sampleMode = env.VITE_SHOW_SAMPLE_CONTENT === 'true';

  if (command === 'build' && mode === 'production' && sampleMode) {
    throw new Error(
      [
        '',
        '✖ Production build blocked: VITE_SHOW_SAMPLE_CONTENT is "true".',
        '  Sample testimonials, client names and stats must never be deployed live.',
        '  → Set VITE_SHOW_SAMPLE_CONTENT=false (or remove it) for production, or',
        '  → build a preview with `npm run build:staging` instead.',
        '',
      ].join('\n'),
    );
  }

  return {
    plugins: [react(), seoFiles(mode === 'production' && !sampleMode)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            motion: ['framer-motion'],
            forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          },
        },
      },
    },
  };
});
