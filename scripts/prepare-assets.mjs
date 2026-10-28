/**
 * One-off asset generation (outputs are committed to /public):
 *  - copies the self-hosted Inter variable font (latin subset)
 *  - renders PNG icons (favicon, apple-touch-icon, PWA sizes) from public/icon.svg
 *  - renders the 1200×630 Open Graph image
 *
 * Run with: npm run assets
 */
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const require = createRequire(import.meta.url);

// 1. Font
const fontDir = join(dirname(require.resolve('@fontsource-variable/inter/package.json')), 'files');
await mkdir(join(pub, 'fonts'), { recursive: true });
await copyFile(
  join(fontDir, 'inter-latin-wght-normal.woff2'),
  join(pub, 'fonts', 'inter-latin-var.woff2'),
);

// 2. Icons
const icon = await readFile(join(pub, 'icon.svg'));
for (const [name, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(icon, { density: 600 }).resize(size, size).png().toFile(join(pub, name));
}

// 3. Open Graph image
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1120"/>
      <stop offset="1" stop-color="#1E3A8A"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0" stop-color="#2DD4BF" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#2DD4BF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80,80) scale(2.2)">
    <polygon points="24,2 44,44 4,44" fill="#60A5FA"/>
    <polygon points="34,18 50,44 18,44" fill="#2DD4BF"/>
    <polygon points="24,2 29.6,13.8 26.4,12 24,15 21.6,12 18.4,13.8" fill="#E0F2FE"/>
  </g>
  <text x="215" y="140" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="54" font-weight="700" fill="#E5E7EB">Northpeak</text>
  <text x="218" y="178" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="22" font-weight="600" fill="#2DD4BF" letter-spacing="10">TALENT</text>
  <text x="80" y="350" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="76" font-weight="800" fill="#FFFFFF">Global IT talent, hired right.</text>
  <text x="80" y="420" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="30" fill="#CBD5E1">India-based recruitment partner for tech teams in the</text>
  <text x="80" y="462" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="30" fill="#CBD5E1">US, UK, Canada, Australia and beyond.</text>
  <text x="80" y="560" font-family="Inter, 'Segoe UI', Arial, sans-serif" font-size="24" font-weight="600" fill="#93C5FD">Permanent hiring · Contract staffing · Offshore teams · Payroll</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(join(pub, 'og-image.png'));

console.log('✔ Assets generated in /public');
