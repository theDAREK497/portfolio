"""Build an English, selectable-text resume from the site's generated HTML.

Run after npm run build. Requires reportlab, beautifulsoup4 and pypdf.
"""
from pathlib import Path
from html import escape
from bs4 import BeautifulSoup
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'output/pdf/Ilya-Gurikov-Resume-EN.pdf'
PUBLIC = ROOT / 'public/resume/Ilya-Gurikov-Resume-EN.pdf'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC.parent.mkdir(parents=True, exist_ok=True)
font_dir = Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('Resume', str(font_dir / 'arial.ttf')))
pdfmetrics.registerFont(TTFont('ResumeBold', str(font_dir / 'arialbd.ttf')))
pdfmetrics.registerFontFamily('Resume', normal='Resume', bold='ResumeBold', italic='Resume', boldItalic='ResumeBold')
ink, muted, blue = colors.HexColor('#17213b'), colors.HexColor('#536079'), colors.HexColor('#3157ff')
styles = getSampleStyleSheet()
for name, size, leading, space, font, color in [
    ('Name', 27, 31, 8, 'ResumeBold', ink),
    ('Role', 12, 16, 8, 'ResumeBold', blue),
    ('Section', 11, 15, 8, 'ResumeBold', blue),
    ('Job', 10.4, 14, 4, 'ResumeBold', ink),
    ('BodyCopy', 9.4, 13.7, 6, 'Resume', ink),
    ('Meta', 8.5, 12, 6, 'Resume', muted),
]:
    styles.add(ParagraphStyle(name, fontName=font, fontSize=size, leading=leading, spaceAfter=space, textColor=color, alignment=TA_LEFT))

def clean(text):
    return text.replace('\u2014', '-').replace('\u2013', '-').replace('\u2011', '-').replace('\u00a0', ' ')

def p(text, style='BodyCopy'):
    return Paragraph(escape(clean(text)), styles[style])

def section(text):
    return [Spacer(1, 10), p(text.upper(), 'Section')]

def bullets(node):
    return [Paragraph('• ' + escape(clean(li.get_text(' ', strip=True))), styles['BodyCopy']) for li in node.select(':scope > ul > li')]

doc = BeautifulSoup((ROOT / 'dist/resume-en.html').read_text(encoding='utf-8'), 'html.parser')
header = doc.select_one('main > header')
intro = header.find_all('p', recursive=False)
story = [p(header.h1.get_text(), 'Name'), p(intro[0].get_text(), 'Role')]
links = [f'<link href="{escape(a["href"], quote=True)}" color="#3157ff">{escape(a.get_text())}</link>' for a in header.select('nav a') if a.get_text() != 'Telegram']
links.append('<link href="https://thedarek497.github.io/portfolio/" color="#3157ff">Portfolio</link>')
story += [Paragraph('  |  '.join(links), styles['Meta']), p('Russia | Open to remote or hybrid roles | English B1 | Russian native', 'Meta')]
story += section('Profile') + [p(intro[2].get_text()), p('Commercial focus: PHP, JavaScript, SQL and business-system integration. Target roles: Integration Engineer, Technical Implementation Engineer, Full-Stack Product Engineer and AI Solutions Engineer.')]
story += section('Professional experience')
for job in doc.select('#experience > article'):
    paragraphs = job.find_all('p', recursive=False)
    story.append(KeepTogether([p(job.h3.get_text(), 'Job'), p(paragraphs[0].get_text(), 'Meta')]))
    if 'ITooLabs' in job.h3.get_text():
        story.append(p('Part-time | IP telephony and cloud communications', 'Meta'))
    story += bullets(job)
    story.append(Spacer(1, 5))

story += [PageBreak(), p('Selected projects & education', 'Role')]
for project in doc.select('#projects > article'):
    paragraphs = project.find_all('p', recursive=False)
    story += [Spacer(1, 8), p(project.h3.get_text(), 'Job'), p(paragraphs[1].get_text())]
    story += bullets(project)
    story.append(p(paragraphs[2].get_text(), 'Meta'))
    project_links = [f'<link href="{escape(a["href"], quote=True)}" color="#3157ff">{escape(a["href"])}</link>' for a in paragraphs[-1].find_all('a')]
    story.append(Paragraph(' | '.join(project_links), styles['Meta']))
story += section('Technical skills')
for heading in doc.select('#capabilities h3'):
    story.append(Paragraph(f'<b>{escape(heading.get_text())}:</b> {escape(clean(heading.find_next_sibling("p").get_text()))}', styles['BodyCopy']))
story += section('Education')
for degree in doc.select('#education > article'):
    story.append(KeepTogether([p(degree.h3.get_text(), 'Job')] + [p(item.get_text(), 'Meta') for item in degree.find_all('p', recursive=False)]))

def footer(canvas, document):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#dce1eb'))
    canvas.line(42, 34, A4[0] - 42, 34)
    canvas.setFont('Resume', 8)
    canvas.setFillColor(muted)
    canvas.drawString(42, 22, 'Ilya Gurikov | Full-Stack & AI Integration Engineer')
    canvas.drawRightString(A4[0] - 42, 22, str(document.page))
    canvas.restoreState()

SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=36, bottomMargin=47,
                  title='Ilya Gurikov - Full-Stack & AI Integration Engineer', author='Ilya Gurikov',
                  subject='English resume - software development, integrations and AI applications').build(story, onFirstPage=footer, onLaterPages=footer)
reader = PdfReader(OUTPUT)
text = '\n'.join(page.extract_text() for page in reader.pages)
assert len(reader.pages) == 2, f'Expected 2 pages, got {len(reader.pages)}'
assert all(value in text for value in ['English B1', '804', 'Gazprom', '30%', '17.5', 'two junior', 'Zabbix', 'QA & Web Developer'])
assert '\u25a0' not in text
shutil.copy2(OUTPUT, PUBLIC)
print(f'{OUTPUT}\nPages: {len(reader.pages)}; extracted characters: {len(text)}')
