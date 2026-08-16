import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function publicSeo(publicUrl: string): Plugin {
  return {
    name: 'public-seo',
    transformIndexHtml(html) {
      if (!publicUrl) return html;

      const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ilya Gurikov',
        url: publicUrl,
        jobTitle: 'Full-Stack & AI Integration Engineer',
        sameAs: [
          'https://github.com/theDAREK497',
          'https://linkedin.com/in/thedarek497',
          'https://t.me/theDAREK497',
        ],
      });

      return html.replace(
        '</head>',
        `    <link rel="canonical" href="${publicUrl}/" />\n    <meta property="og:url" content="${publicUrl}/" />\n    <meta property="og:image" content="${publicUrl}/photo.jpg" />\n    <meta name="twitter:image" content="${publicUrl}/photo.jpg" />\n    <script type="application/ld+json">${jsonLd}</script>\n  </head>`,
      );
    },
    generateBundle() {
      if (!publicUrl) return;

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicUrl}/</loc></url></urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const publicUrl = (env.VITE_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');

  return {
    base: './',
    plugins: [react(), publicSeo(publicUrl)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  };
});
