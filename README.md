# Ilya Gurikov — Portfolio

[![Deploy to GitHub Pages](https://github.com/theDAREK497/portfolio/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/theDAREK497/portfolio/actions/workflows/deploy.yml)

Source code for my bilingual developer portfolio.

**Live site:** https://thedarek497.github.io/portfolio/

I use this site as a compact engineering portfolio rather than a gallery of technologies: it focuses on problems solved, architecture decisions, measurable outcomes and independently shipped products.

## Positioning

**Full-Stack & AI Integration Engineer**

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

### Archive Assistant

A RAG Telegram prototype that searches a document archive and generates answers with references to retrieved sources using FAISS and a locally served language model.

[See projects and implementation details](https://thedarek497.github.io/portfolio/#projects)

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
