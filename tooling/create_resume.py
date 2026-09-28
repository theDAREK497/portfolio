"""Build an English CV from the approved 2026-09-25 content.

Install: python -m pip install reportlab pypdf
Run:     python tooling/create_resume.py
         python tooling/create_resume.py --variant backend

Full-Stack Product Engineer is the primary CV. Each variant has its own source
and output path, independent of the longer portfolio copy. Uses standard PDF
fonts; no Windows font paths, browser, npm build or network access is required.
"""
from __future__ import annotations

import argparse
import re
from html import escape
from importlib import import_module
from pathlib import Path
from tempfile import TemporaryDirectory

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
VARIANTS = {
    "fullstack": ("resume_fullstack_en", "Ilya-Gurikov-CV-FullStack-Product-Engineer-EN.pdf"),
    "backend": ("resume_backend_en", "Ilya-Gurikov-CV-Backend-Engineer-EN.pdf"),
}
INK = colors.HexColor("#17213b")
MUTED = colors.HexColor("#536079")
ACCENT = colors.HexColor("#244b80")


def normalise(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def build_resume(variant: str = "fullstack") -> None:
    if variant not in VARIANTS:
        raise ValueError(f"Unknown CV variant: {variant}")
    source, filename = VARIANTS[variant]
    data = import_module(source).DATA
    output = ROOT / "public/resume" / filename
    styles = {}
    for name, size, leading, after, font, colour in [
        ("name", 24, 27, 4, "Helvetica-Bold", INK),
        ("role", 11, 14, 5, "Helvetica-Bold", ACCENT),
        ("section", 10, 12, 5, "Helvetica-Bold", ACCENT),
        ("job", 9.6, 12, 2, "Helvetica-Bold", INK),
        ("body", 9.1, 11.7, 3, "Helvetica", INK),
        ("meta", 8.2, 10.4, 3, "Helvetica", MUTED),
        ("skill", 8.6, 10.7, 2, "Helvetica", INK),
    ]:
        styles[name] = ParagraphStyle(
            name, fontName=font, fontSize=size, leading=leading,
            spaceAfter=after, textColor=colour,
            keepWithNext=name in {"section", "job"},
        )
    expected: list[str] = []

    def p(text: str, style: str = "body") -> Paragraph:
        expected.append(text)
        return Paragraph(escape(text), styles[style])

    def section(text: str) -> list:
        return [Spacer(1, 7), p(text, "section")]

    def bullets(items: list[str]) -> list:
        result = []
        for text in items:
            expected.append(text)
            result.append(Paragraph("&#8226; " + escape(text), styles["body"]))
        return result

    def job(item: dict) -> list:
        content = [p(item["title"], "job"), p(item["period"], "meta")]
        content += bullets(item["points"])
        if item.get("tech"):
            content.append(p("Tech: " + item["tech"], "meta"))
        return [KeepTogether(content), Spacer(1, 5)]

    story = [p(data["name"], "name"), p(data["headline"], "role")]
    story.append(p(data["availability"], "meta"))
    links = []
    for contact in data["contacts"]:
        expected.append(contact["label"])
        links.append(
            f'<link href="{escape(contact["url"], quote=True)}" '
            f'color="#244b80">{escape(contact["label"])}</link>'
        )
    story.append(Paragraph(" | ".join(links), styles["meta"]))
    story += section("PROFESSIONAL SUMMARY") + [p(data["summary"])]
    story += section("TECHNICAL SKILLS")
    for label, value in data["skills"]:
        expected.append(label + ": " + value)
        story.append(Paragraph(
            f"<b>{escape(label)}:</b> {escape(value)}", styles["skill"],
        ))
    story += section("EXPERIENCE")
    for item in data["experience"][:3]:
        story += job(item)
    story += [PageBreak()]
    story += job(data["experience"][3])
    story += section("SELECTED PROJECTS")
    for project in data["projects"]:
        content = [p(project["title"], "job"), p(project["role"], "meta")]
        content += bullets(project["points"])
        expected.append("Stack: " + project["stack"])
        expected.append(project["linkLabel"])
        content.append(Paragraph(
            f'Stack: {escape(project["stack"])} | '
            f'<link href="{escape(project["url"], quote=True)}" '
            f'color="#244b80">{escape(project["linkLabel"])}</link>',
            styles["meta"],
        ))
        story += [KeepTogether(content), Spacer(1, 4)]
    story.append(p("Additional public work: " + data["additionalWork"], "meta"))
    story += section("EDUCATION")
    for item in data["education"]:
        content = [p(item["degree"], "job")]
        content.append(p(item["school"] + " | " + item["period"], "meta"))
        if item.get("detail"):
            content.append(p(item["detail"], "meta"))
        story.append(KeepTogether(content))
    story += section("LANGUAGES") + [p(data["languages"], "meta")]

    def footer(canvas, document):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#dce1eb"))
        canvas.line(38, 30, A4[0] - 38, 30)
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawString(38, 19, data["name"] + " | " + data["headline"].split(" | ")[0])
        canvas.drawRightString(A4[0] - 38, 19, str(document.page))
        canvas.restoreState()

    output.parent.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(prefix="portfolio-cv-") as temporary:
        candidate = Path(temporary) / output.name
        SimpleDocTemplate(
            str(candidate), pagesize=A4, rightMargin=38, leftMargin=38,
            topMargin=34, bottomMargin=43, title=data["name"] + " - " + data["headline"],
            author=data["name"], subject="English CV | Approved content: " + data["sourceDate"],
            pageCompression=1, invariant=1,
        ).build(story, onFirstPage=footer, onLaterPages=footer)
        reader = PdfReader(candidate)
        text = normalise(" ".join(page.extract_text() or "" for page in reader.pages))
        missing = [item for item in expected if normalise(item) not in text]
        if len(reader.pages) != 2 or missing or "\u25a0" in text:
            raise ValueError(
                f"CV validation failed: pages={len(reader.pages)}, missing={missing}"
            )
        urls = {
            annotation.get_object().get("/A", {}).get("/URI")
            for page in reader.pages for annotation in page.get("/Annots", [])
        }
        required_urls = {item["url"] for item in data["contacts"] + data["projects"]}
        if not required_urls.issubset(urls):
            raise ValueError("CV validation failed: missing clickable links")
        output.write_bytes(candidate.read_bytes())
        print(f"{output}\nPages: {len(reader.pages)}; validated text blocks: {len(expected)}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--variant", choices=VARIANTS, default="fullstack")
    build_resume(parser.parse_args().variant)
