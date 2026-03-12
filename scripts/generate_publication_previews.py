#!/usr/bin/env python3

import html
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
PUBLICATIONS_DIR = ROOT / "_publications"
IMAGES_DIR = ROOT / "images" / "publications"
USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/123.0 Safari/537.36"
)
TIMEOUT = 15

META_PATTERNS = [
    r'<meta[^>]+name=["\']citation_pdf_url["\'][^>]+content=["\']([^"\']+)["\']',
    r'<meta[^>]+property=["\']citation_pdf_url["\'][^>]+content=["\']([^"\']+)["\']',
    r'<meta[^>]+name=["\']wkhealth_pdf_url["\'][^>]+content=["\']([^"\']+)["\']',
]

HREF_PATTERNS = [
    r'href=["\']([^"\']+\.pdf(?:\?[^"\']*)?)["\']',
    r'href=["\']([^"\']*/pdf(?:/|%2F)[^"\']+)["\']',
    r'href=["\']([^"\']*articlepdf[^"\']+)["\']',
    r'href=["\']([^"\']*download[^"\']*pdf[^"\']*)["\']',
]


def load_front_matter(path: Path):
    text = path.read_text()
    if not text.startswith("---\n"):
        raise ValueError(f"missing front matter: {path}")
    _, front_matter, body = text.split("---", 2)
    return yaml.safe_load(front_matter), body


def dump_front_matter(path: Path, data, body: str):
    rendered = yaml.safe_dump(data, sort_keys=False, allow_unicode=True).strip()
    path.write_text(f"---\n{rendered}\n---{body}")


def candidate_links(data):
    buttons = data.get("buttons") or []
    ranked = []
    for button in buttons:
        link = (button or {}).get("link")
        if not link:
            continue
        text = ((button or {}).get("text") or "").strip().lower()
        score = 50
        if text == "pdf":
            score = 0
        elif text == "paper":
            score = 1
        elif text == "doi":
            score = 2
        elif "arxiv" in text:
            score = 3
        ranked.append((score, link))
    ranked.sort()
    deduped = []
    seen = set()
    for _, link in ranked:
        if link not in seen:
            seen.add(link)
            deduped.append(link)
    return deduped


def request(url: str):
    url = sanitize_url(url)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/pdf,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    return urllib.request.urlopen(req, timeout=TIMEOUT)


def normalize_pdf_candidate(url: str):
    parsed = urllib.parse.urlparse(sanitize_url(url))
    if "arxiv.org" in parsed.netloc:
        if parsed.path.startswith("/abs/"):
            return f"https://arxiv.org/pdf/{parsed.path.split('/abs/', 1)[1]}.pdf"
        if parsed.path.startswith("/pdf/") and not parsed.path.endswith(".pdf"):
            return f"https://arxiv.org{parsed.path}.pdf"
    return sanitize_url(url)


def sanitize_url(url: str):
    parsed = urllib.parse.urlsplit(url.strip())
    path = urllib.parse.quote(parsed.path, safe="/%:@")
    query = urllib.parse.quote_plus(parsed.query, safe="=&%:@")
    return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, path, query, parsed.fragment))


def extract_pdf_link(page_url: str, html_text: str):
    for pattern in META_PATTERNS:
        match = re.search(pattern, html_text, flags=re.IGNORECASE)
        if match:
            return urllib.parse.urljoin(page_url, html.unescape(match.group(1)))

    for pattern in HREF_PATTERNS:
        match = re.search(pattern, html_text, flags=re.IGNORECASE)
        if match:
            return urllib.parse.urljoin(page_url, html.unescape(match.group(1)))

    if "nature.com/articles/" in page_url:
        article_id = page_url.rstrip("/").rsplit("/", 1)[-1]
        return f"https://www.nature.com/articles/{article_id}.pdf"

    if "link.springer.com/chapter/" in page_url or "link.springer.com/article/" in page_url:
        return page_url.rstrip("/") + ".pdf"

    if "mdpi.com/" in page_url:
        return page_url.rstrip("/") + "/pdf"

    return None


def resolve_pdf_url(url: str):
    current = normalize_pdf_candidate(url)
    visited = set()
    for _ in range(4):
        if current in visited:
            break
        visited.add(current)
        try:
            with request(current) as response:
                final_url = response.geturl()
                content_type = response.headers.get("Content-Type", "").lower()
                if "application/pdf" in content_type or final_url.lower().endswith(".pdf"):
                    return final_url
                if "text/html" not in content_type:
                    return None
                html_text = response.read().decode("utf-8", errors="ignore")
        except urllib.error.URLError:
            return None
        next_url = extract_pdf_link(final_url, html_text)
        if not next_url:
            return None
        current = normalize_pdf_candidate(next_url)
    return None


def download_file(url: str, destination: Path):
    req = urllib.request.Request(
        sanitize_url(url),
        headers={"User-Agent": USER_AGENT, "Accept": "application/pdf,*/*"},
    )
    with urllib.request.urlopen(req, timeout=TIMEOUT) as response:
        if "application/pdf" not in response.headers.get("Content-Type", "").lower() and not response.geturl().lower().endswith(".pdf"):
            raise ValueError("not a pdf response")
        destination.write_bytes(response.read())


def render_preview(pdf_path: Path, output_path: Path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    prefix = output_path.with_suffix("")
    subprocess.run(
        [
            "pdftoppm",
            "-f",
            "1",
            "-singlefile",
            "-png",
            "-scale-to-x",
            "900",
            "-scale-to-y",
            "-1",
            str(pdf_path),
            str(prefix),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def main():
    selected = set(sys.argv[1:])
    temp_dir = Path(tempfile.mkdtemp(prefix="publication-previews-"))
    successes = []
    failures = []

    try:
        for path in sorted(PUBLICATIONS_DIR.glob("*.md")):
            if selected and path.stem not in selected:
                continue
            data, body = load_front_matter(path)
            stem = path.stem
            png_path = IMAGES_DIR / f"{stem}.png"

            pdf_url = None
            for link in candidate_links(data):
                pdf_url = resolve_pdf_url(link)
                if pdf_url:
                    break

            if not pdf_url:
                failures.append((stem, "no reachable pdf"))
                continue

            temp_pdf = temp_dir / f"{stem}.pdf"
            try:
                download_file(pdf_url, temp_pdf)
                render_preview(temp_pdf, png_path)
            except Exception as exc:
                failures.append((stem, str(exc)))
                continue

            data["image"] = f"images/publications/{stem}.png"
            dump_front_matter(path, data, body)
            successes.append((stem, pdf_url))

        print(f"generated_previews {len(successes)}")
        print(f"failed_previews {len(failures)}")
        for stem, pdf_url in successes:
            print(f"OK {stem} {pdf_url}")
        for stem, reason in failures:
            print(f"FAIL {stem} {reason}")
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


if __name__ == "__main__":
    main()
