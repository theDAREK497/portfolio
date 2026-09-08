# Working on the portfolio

## Local development (Windows)

```powershell
npm.cmd ci
npm.cmd run dev
```

Open http://localhost:3000. Run `npm.cmd run check` before submitting changes.
Preview the production build with `npm.cmd run preview`.

Public copy lives in `src/content`; shared typography is in `src/styles/typography.css`.
Do not edit generated files in `dist`. Keep EN/RU text and image captions consistent.
Publish only confirmed career claims and metrics. Unpublished article titles stay hidden.

## GitHub Pages

Select **Settings → Pages → Build and deployment → GitHub Actions**.
The workflow runs checks and generates metadata for the deployment URL, including its repository subpath.
For local production metadata, set `VITE_PUBLIC_SITE_URL=https://thedarek497.github.io/portfolio` before building.

The build generates EN/RU portfolio, article and print-friendly HTML resume pages, plus a sitemap.
The primary resume button opens the checked-in English PDF in `public/resume`.

## Refreshing the English PDF

On Windows, with Python, Arial fonts, `reportlab`, `beautifulsoup4` and `pypdf` installed:

```powershell
npm.cmd run build
python tooling/create_resume.py
npm.cmd run build
```

The script uses the generated English resume as its source, checks text and page count,
and writes the downloadable copy to `public/resume`. Review both rendered pages before committing it.
The second build includes the refreshed PDF. PDF regeneration is manual, not part of CI.

Temporary outputs in `tmp` and `output`, dependencies, builds and local credentials are ignored.
`.env.example`, source images, the published PDF, lockfile and deployment workflow are intentionally tracked.
