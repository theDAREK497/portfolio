# Ilya Gurikov — Portfolio

[![Deploy to GitHub Pages](https://github.com/theDAREK497/portfolio/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/theDAREK497/portfolio/actions/workflows/deploy.yml)

Source code for my bilingual developer portfolio.

**Live site:** https://thedarek497.github.io/portfolio/

I use this site as a compact engineering portfolio rather than a gallery of technologies: it focuses on problems solved, architecture decisions, measurable outcomes and independently shipped products.

## Positioning

**Backend Engineer | API & System Integrations | PHP & Python**

Backend engineering is my primary focus. Related opportunities include **Full-Stack Product Engineer** and **Applied AI Engineer** roles.

My work spans:

- backend and internal web services;
- REST/SOAP integrations and data workflows;
- SQL and API performance work;
- React/TypeScript frontends;
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

[Backend Engineer CV — English PDF](https://thedarek497.github.io/portfolio/resume/Ilya-Gurikov-CV-Backend-Engineer-EN.pdf)

The primary CV uses the approved content from **25 September 2026**, rebuilt into a two-page, selectable-text PDF with clickable links. Its source is `tooling/resume_backend_en.py`, kept separate from the longer portfolio copy. Official employment titles and English B1 are preserved.

To rebuild and validate the PDF:

```bash
python -m pip install reportlab pypdf
python tooling/create_resume.py
```

The generator validates every expected text block, the two-page layout and link annotations before replacing the canonical file. It does not require Windows fonts, a browser or a website build. The previous `Ilya-Gurikov-Resume-EN.pdf` remains at its original path for compatibility with previously shared links; the website links to the new named CV.

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
