# Ilya Gurikov — Portfolio

[![Deploy to GitHub Pages](https://github.com/theDAREK497/portfolio/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/theDAREK497/portfolio/actions/workflows/deploy.yml)

Source code for my bilingual developer portfolio.

**Live site:** https://thedarek497.github.io/portfolio/

I use this site as a compact engineering portfolio rather than a gallery of technologies: it focuses on problems solved, architecture decisions, measurable outcomes and independently shipped products.

## Positioning

**Full-Stack Product Engineer | React, TypeScript, Python & PHP**

Full-stack product engineering is my primary focus: taking products from requirements and prototypes through frontend, backend, integrations, launch and iteration. **Backend Engineer** and **Applied AI Engineer** remain additional directions, not competing primary titles.

My work spans:

- full-stack web products and internal business systems;
- React/TypeScript frontends and backend APIs;
- REST/SOAP integrations, payments and data workflows;
- SQL and API performance work;
- practical AI systems using retrieval, structured outputs and local LLMs;
- independent products taken from prototype to launch.

## Featured work

### Demiurge Assistant

A local-first knowledge system for fictional worlds and tabletop campaigns. It combines persistent entities and relationships with LLM-assisted extraction, retrieval and a human review step before generated information is saved.

[Project case study](https://thedarek497.github.io/portfolio/demiurge-ai-chat.html)

### AstroCode

An independently launched product across web, Telegram and Android with subscriptions, payments and generated personalised content.

### Archive Assistant Bot

A RAG Telegram prototype that searches a document archive and generates answers with references to retrieved sources using FAISS and a locally served language model.

[See projects and implementation details](https://thedarek497.github.io/portfolio/#projects)

## Resume

[Full-Stack Product Engineer CV — English PDF](https://thedarek497.github.io/portfolio/resume/Ilya-Gurikov-CV-FullStack-Product-Engineer-EN.pdf)

The main website download is the **Full-Stack Product Engineer** version. It uses the approved Full-Stack CV content from **25 September 2026**, rebuilt into a two-page, selectable-text PDF with clickable links. Its independent source is `tooling/resume_fullstack_en.py`; it is not a backend CV with only the headline changed. Official employment titles and English B1 are preserved.

[Backend Engineer CV — alternative English PDF](https://thedarek497.github.io/portfolio/resume/Ilya-Gurikov-CV-Backend-Engineer-EN.pdf)

The backend file and its source, `tooling/resume_backend_en.py`, remain unchanged. Applied AI is another application-specific CV direction; the primary portfolio download intentionally stays focused on Full-Stack.

To rebuild and validate a PDF:

```bash
python -m pip install reportlab pypdf
python tooling/create_resume.py
# Optional: rebuild the separate backend variant.
python tooling/create_resume.py --variant backend
```

The generator validates every expected text block, the two-page layout and link annotations before replacing that variant's canonical file. It does not require Windows fonts, a browser or a website build. The previous `Ilya-Gurikov-Resume-EN.pdf` also remains at its original path for compatibility with previously shared links.

## Tech stack

- **Frontend:** React, TypeScript, Vite
- **Content:** bilingual RU/EN portfolio content
- **Deployment:** GitHub Pages
- **Quality:** repository checks and build validation

## Local development

```bash
git clone https://github.com/theDAREK497/portfolio.git
cd portfolio
npm ci
npm run dev
```

Run project checks and a production build with:

```bash
npm run check
```

## Links

- 🌐 [Portfolio](https://thedarek497.github.io/portfolio/)
- 💼 [LinkedIn](https://linkedin.com/in/thedarek497)
- 🧠 [Demiurge Assistant](https://github.com/theDAREK497/demiurge-assistant)

## About this repository

This repository is intentionally presentation-oriented. For deeper implementation examples, see the linked project repositories above.
