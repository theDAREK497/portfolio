# Ilya Gurikov — Portfolio

## Run locally on Windows

```powershell
npm.cmd ci
npm.cmd run dev
```

Open <http://localhost:3000>.

## Checks and production preview

```powershell
npm.cmd run check
npm.cmd run preview -- --host 127.0.0.1 --port 4173
```

The build generates six public pages from the same content sources:

- `index.html` and `index-ru.html`: EN/RU portfolio, with readable HTML before JavaScript loads.
- `demiurge-ai-chat.html` and `demiurge-ai-chat-ru.html`: the published article, with language-specific images and metadata. Old hash links still work in the app.
- `resume-en.html` and `resume-ru.html`: static resumes. Use **Print / Save PDF** and choose **Save as PDF** in the browser. These are generated from the portfolio facts, not a separate approved PDF attachment.

Public copy lives in `src/content`. Do not edit generated files in `dist`. The original Russian article body is preserved. Unpublished titles are not displayed.

## GitHub Pages

In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. The workflow runs checks before deployment and passes the URL returned by `configure-pages` into `VITE_PUBLIC_SITE_URL`. This generates canonical URLs, language alternates, Open Graph metadata, structured data and a sitemap for the actual Pages address, including a repository subpath or custom domain. No paid server is needed.

For a local build with production metadata:

```powershell
$env:VITE_PUBLIC_SITE_URL = 'https://thedarek497.github.io/portfolio'
npm.cmd run build
```

After deployment, verify all six addresses and `/portfolio/sitemap.xml`. A `robots.txt` inside a project subpath does not override the host-level `/robots.txt`. Generated metadata helps discovery; it does not guarantee indexing, ranking or inclusion in AI answers.

See [AUDIT.md](AUDIT.md) for the audit scope, checks and remaining owner confirmations.
