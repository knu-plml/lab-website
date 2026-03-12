#!/usr/bin/env python3

import html
import re
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
PUBLICATIONS_DIR = ROOT / "_publications"
IMAGES_DIR = ROOT / "images" / "publications"


def has_hangul(text: str) -> bool:
    return bool(re.search(r"[\u3131-\u318E\uAC00-\uD7A3]", text or ""))


def clean_subtitle(text: str) -> str:
    cleaned = text or ""
    for token in ("[PDF]", "[GitHub]", "[DOI]", "[Paper]", "[Webpage]"):
        cleaned = cleaned.replace(token, "")
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned


def char_weight(char: str) -> float:
    if re.match(r"[\u3131-\u318E\uAC00-\uD7A3]", char):
        return 1.0
    if char.isspace():
        return 0.32
    if char in ",.:;()[]":
        return 0.34
    if char.isupper():
        return 0.72
    return 0.6


def wrap_text(text: str, limit: float):
    text = re.sub(r"\s+", " ", (text or "").strip())
    if not text:
        return []

    words = text.split(" ")
    lines = []
    current = ""
    current_weight = 0.0

    for word in words:
        word_weight = sum(char_weight(c) for c in word)
        sep_weight = 0.32 if current else 0.0
        if current and current_weight + sep_weight + word_weight <= limit:
            current += " " + word
            current_weight += sep_weight + word_weight
            continue
        if current:
            lines.append(current)
        if word_weight <= limit:
            current = word
            current_weight = word_weight
            continue

        chunk = ""
        chunk_weight = 0.0
        for char in word:
            weight = char_weight(char)
            if chunk and chunk_weight + weight > limit:
                lines.append(chunk)
                chunk = char
                chunk_weight = weight
            else:
                chunk += char
                chunk_weight += weight
        current = chunk
        current_weight = chunk_weight

    if current:
        lines.append(current)

    return lines


def make_svg(title: str, subtitle: str) -> str:
    korean_title = has_hangul(title)
    korean_subtitle = has_hangul(subtitle)

    title_font_size = 16.5 if korean_title else 17
    title_line_height = 29 if korean_title else 28
    title_limit = 12.8 if korean_title else 15.2
    title_lines = wrap_text(title, title_limit)[:5]

    subtitle_font_size = 11.1 if korean_subtitle else 11.2
    subtitle_line_height = 16 if korean_subtitle else 16
    subtitle_limit = 22 if korean_subtitle else 22.5
    subtitle_lines = wrap_text(subtitle, subtitle_limit)[:3]

    title_y = 128
    subtitle_y = 344 if len(subtitle_lines) <= 2 else 328

    title_nodes = []
    for index, line in enumerate(title_lines):
        y = title_y + index * title_line_height
        title_nodes.append(
            f'  <text x="28" y="{y}" font-family="Sora, Noto Sans KR, sans-serif" '
            f'font-size="{title_font_size}" font-weight="700" fill="#f8fbff">{html.escape(line)}</text>'
        )

    subtitle_nodes = []
    for index, line in enumerate(subtitle_lines):
        y = subtitle_y + index * subtitle_line_height
        subtitle_nodes.append(
            f'  <text x="28" y="{y}" font-family="Noto Sans KR, sans-serif" '
            f'font-size="{subtitle_font_size}" font-weight="500" fill="#c7d7f4">{html.escape(line)}</text>'
        )

    return "\n".join(
        [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 420" role="img" aria-label="{html.escape(title)}">',
            "  <defs>",
            '    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
            '      <stop offset="0%" stop-color="#050816"/>',
            '      <stop offset="52%" stop-color="#0b1634"/>',
            '      <stop offset="100%" stop-color="#13244d"/>',
            "    </linearGradient>",
            '    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">',
            '      <stop offset="0%" stop-color="#3f5f9d"/>',
            '      <stop offset="100%" stop-color="#5d82c8"/>',
            "    </linearGradient>",
            '    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">',
            '      <path d="M24 0H0V24" fill="none" stroke="#dbeafe" stroke-opacity="0.08" stroke-width="1"/>',
            "    </pattern>",
            '    <radialGradient id="glowA" cx="0%" cy="0%" r="100%">',
            '      <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.18"/>',
            '      <stop offset="100%" stop-color="#93c5fd" stop-opacity="0"/>',
            "    </radialGradient>",
            '    <radialGradient id="glowB" cx="50%" cy="50%" r="100%">',
            '      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.14"/>',
            '      <stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/>',
            "    </radialGradient>",
            "  </defs>",
            '  <rect width="320" height="420" rx="28" fill="url(#bg)"/>',
            '  <rect width="320" height="420" rx="28" fill="url(#grid)"/>',
            '  <circle cx="26" cy="48" r="82" fill="url(#glowA)"/>',
            '  <circle cx="284" cy="86" r="84" fill="url(#glowB)"/>',
            '  <circle cx="254" cy="358" r="88" fill="url(#glowA)" opacity="0.52"/>',
            '  <rect x="12" y="12" width="296" height="396" rx="24" fill="none" stroke="#dbeafe" stroke-opacity="0.1"/>',
            '  <path d="M12 74 H308" fill="none" stroke="#dbeafe" stroke-opacity="0.14"/>',
            '  <path d="M12 92 H308" fill="none" stroke="#dbeafe" stroke-opacity="0.08"/>',
            '  <path d="M12 110 H308" fill="none" stroke="#dbeafe" stroke-opacity="0.08"/>',
            '  <path d="M12 316 V136" fill="none" stroke="#dbeafe" stroke-opacity="0.16"/>',
            '  <path d="M308 278 V126" fill="none" stroke="#dbeafe" stroke-opacity="0.12"/>',
            '  <path d="M186 334 C222 318, 252 306, 286 304 C260 318, 232 334, 206 350 Z" fill="#dbeafe" fill-opacity="0.08"/>',
            '  <rect x="28" y="32" width="162" height="28" rx="14" fill="url(#accent)"/>',
            '  <text x="40" y="50" font-family="Sora, sans-serif" font-size="11.2" font-weight="700" letter-spacing="1.9" fill="#f8fbff">PLML PUBLICATION</text>',
            *title_nodes,
            *subtitle_nodes,
            '  <circle cx="270" cy="42" r="8" fill="#dbeafe" fill-opacity="0.38"/>',
            '  <circle cx="287" cy="42" r="8" fill="#bfdbfe" fill-opacity="0.5"/>',
            '  <circle cx="304" cy="42" r="8" fill="#93c5fd" fill-opacity="0.62"/>',
            "</svg>",
        ]
    )


def main():
    updated = 0
    for path in sorted(PUBLICATIONS_DIR.glob("*.md")):
        text = path.read_text()
        data = yaml.safe_load(text.split("---", 2)[1])
        image = (data.get("image") or "").strip()
        title = (data.get("title") or "").strip()
        subtitle = clean_subtitle(data.get("subtitle") or "")

        if not image.endswith(".svg"):
            continue

        svg_path = ROOT / image
        svg_path.write_text(make_svg(title, subtitle))
        updated += 1

    print(f"updated_svg_fallbacks {updated}")


if __name__ == "__main__":
    main()
