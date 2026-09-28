"""Approved Backend Engineer CV content, 25 September 2026."""

DATA = {
  "sourceDate": "2026-09-25",
  "name": "Ilya Gurikov",
  "headline": "Backend Engineer | API & System Integrations | PHP & Python",
  "availability": "Open to remote international opportunities",
  "contacts": [
    {"label": "ilion9871@gmail.com", "url": "mailto:ilion9871@gmail.com"},
    {"label": "LinkedIn", "url": "https://linkedin.com/in/thedarek497"},
    {"label": "GitHub", "url": "https://github.com/theDAREK497"},
    {"label": "Portfolio", "url": "https://thedarek497.github.io/portfolio/"}
  ],
  "summary": "Backend Engineer with around 6 years of commercial experience building and supporting production web systems, APIs and enterprise integrations. Strong in PHP, Python, SQL, MySQL/PostgreSQL, REST/SOAP, debugging and business-process automation. I have delivered internal services used across an organisation of 3,000+ employees, built cross-system workflows, and developed an enterprise AI/RAG assistant that reduced a regulatory and document workflow from 2-5 hours to 15-20 minutes per request. Comfortable owning work from requirements and solution design through implementation, release and production support.",
  "skills": [
    ["Backend & APIs", "PHP, Python, FastAPI, Node.js, REST APIs, SOAP, Webhooks"],
    ["Integrations", "Enterprise system integration, CRM integrations, business-process automation, external services"],
    ["Data", "MySQL, PostgreSQL, SQLite, SQL, Redis"],
    ["Delivery & Reliability", "Docker, Docker Compose, Git, GitLab CI/CD, GitHub Actions, Linux, debugging, performance optimisation"],
    ["Frontend", "JavaScript, TypeScript, React, Vue, jQuery, HTML, CSS, 1C-Bitrix"],
    ["Applied AI", "RAG, vector search, local LLMs, OpenAI-compatible APIs"]
  ],
  "experience": [
    {
      "title": "Full-Stack Web Developer - Gazprom Inform LLC",
      "period": "Aug 2023 - Present",
      "points": [
        "Built a meeting-room booking service used across an organisation of 3,000+ employees, replacing manual approval workflows and saving an estimated 17.5 employee-hours per week.",
        "Developed an internal AI/RAG assistant for regulatory knowledge search and drafting internal documents, reducing typical processing time from 2-5 hours to 15-20 minutes per request across a workflow handling roughly 10-40 requests per day.",
        "Developed internal services for bookings, access requests and cross-system applications, reducing repetitive manual work and the risk of human error.",
        "Built workflows that generate commercial proposals and submit requests through a corporate SOAP integration bus across multiple enterprise systems.",
        "Integrated applications with REST and SOAP services, validating and transforming large flat datasets into structured hierarchical domain models.",
        "Work directly with stakeholders on requirements, effort estimation, task decomposition, solution design, prototyping and production releases; use Python, Pandas and NumPy for operational-data analysis and incident investigation."
      ],
      "tech": "PHP, 1C-Bitrix, JavaScript, jQuery, Vue, Python, MySQL, SQL, REST, SOAP, GitLab CI/CD, Linux, RAG"
    },
    {
      "title": "Freelance Software Developer & Independent Projects",
      "period": "Sep 2022 - Jul 2023",
      "points": [
        "Took on freelance web-development assignments while continuing hands-on software development between full-time roles.",
        "Studied emerging generative-AI tools and neural-network applications and developed personal projects, building the foundation for later AI/RAG integration work."
      ]
    },
    {
      "title": "Full-Stack Web Developer - Onpeak Digital",
      "period": "Mar 2021 - Sep 2022",
      "points": [
        "Delivered and supported 10+ e-commerce and corporate web projects across the full development cycle.",
        "Improved legacy website performance using Chrome DevTools, Lighthouse and PageSpeed Insights; implemented lazy loading, image optimisation, caching, Bitrix Composite Site, JavaScript/API optimisation and database-query improvements.",
        "Introduced Docker and Docker Compose to make development environments and deployments more reproducible.",
        "Mentored 2 junior developers, performed code reviews, decomposed requirements and distributed tasks in Scrum/Kanban workflows.",
        "Investigated production bottlenecks and defects across PHP backend, JavaScript frontend and MySQL layers."
      ],
      "tech": "PHP, 1C-Bitrix, JavaScript, jQuery, MySQL, Docker, Docker Compose, HTML, CSS"
    },
    {
      "title": "QA & Web Developer - ITooLabs",
      "period": "Sep 2018 - Mar 2020 | Part-time",
      "points": [
        "Developed backend and frontend functionality using PHP, JavaScript, SQL, HTML and CSS.",
        "Integrated amoCRM, Bitrix24, RetailCRM and custom CRM systems with telephony services through REST APIs and webhooks.",
        "Worked with SIP/IP telephony workflows and telecom integrations involving MGTS, MegaFon, Beeline and Dom.ru.",
        "Built a customer feedback widget subsystem with its own data storage as part of the Bachelor's graduation project.",
        "Worked with Go-based APIs and legacy frontend migration tasks; performed manual QA, debugging, defect investigation and Zabbix-based monitoring."
      ],
      "tech": "PHP, JavaScript, SQL, REST APIs, Webhooks, SIP/IP Telephony, CRM integrations, Go, Zabbix"
    }
  ],
  "projects": [
    {
      "title": "AstroCode - Cross-Platform Subscription Product",
      "role": "Independent Product Engineer | Full-Stack Developer",
      "points": [
        "Independently designed, developed and launched the product across web, Telegram and Android.",
        "Implemented user accounts, authentication, subscriptions, YooKassa payments and webhooks, and managed Android publishing.",
        "Reached 2,158 RuStore page views, 80 installs, 33 registered accounts and 2 paid subscriptions by 16 September 2026 while iterating from real usage."
      ],
      "stack": "React, TypeScript, Node.js, YooKassa, Telegram, Android",
      "linkLabel": "Live product",
      "url": "https://astrocode-app.ru/"
    },
    {
      "title": "Recommendation Engine API - Semantic Search Backend",
      "role": "Backend / AI Integration Project",
      "points": [
        "Built a semantic recommendation API combining vector search with structured filters for real-estate discovery.",
        "Used FastAPI, Qdrant and Redis with Prometheus observability and Docker-based local deployment."
      ],
      "stack": "Python, FastAPI, Qdrant, Redis, Prometheus, Docker",
      "linkLabel": "GitHub",
      "url": "https://github.com/theDAREK497/recommendation-engine-api"
    },
    {
      "title": "CRM Integration Architecture - Backend Integration Showcase",
      "role": "Backend / System Integration Project",
      "points": [
        "Designed a reference backend architecture for CRM integrations with typed API contracts, validation and clear service boundaries.",
        "Documented the architecture and packaged the service with Docker and automated quality checks."
      ],
      "stack": "Python, FastAPI, Pydantic, REST APIs, Docker, CI",
      "linkLabel": "GitHub",
      "url": "https://github.com/theDAREK497/crm-integration-architecture"
    },
    {
      "title": "Demiurge Assistant - Local-First AI Knowledge System",
      "role": "Product Designer | Software Architect | Full-Stack & AI Engineer",
      "points": [
        "Designed and built a local-first knowledge system for persistent fictional worlds and long-running narrative projects.",
        "Implemented a FastAPI backend, structured entities and directed relationships, RAG and semantic retrieval.",
        "Built a human-in-the-loop workflow where AI-generated knowledge changes are reviewed before becoming canonical data.",
        "Integrated local OpenAI-compatible models through LM Studio alongside external LLM providers and developed a React frontend with interactive relationship graphs."
      ],
      "stack": "Python, FastAPI, React, PostgreSQL, pgvector, SQLite, RAG, Local LLMs",
      "linkLabel": "GitHub",
      "url": "https://github.com/theDAREK497/demiurge-assistant"
    }
  ],
  "additionalWork": "Archive Assistant Bot | Anomaly Zone | E-commerce Conversion Analysis | Data Pipeline CI/CD",
  "education": [
    {
      "degree": "Master's Degree in Computer Science and Engineering",
      "school": "Tula State University",
      "period": "2020 - 2022",
      "detail": "Specialisation: Computer Analysis and Data Interpretation | Degree continued alongside commercial work in 2021-2022"
    },
    {
      "degree": "Bachelor's Degree in Information Systems and Technologies",
      "school": "Tula State University",
      "period": "2016 - 2020"
    }
  ],
  "languages": "Russian: Native | English: B1 / Intermediate - preparing for IELTS"
}
