#!/usr/bin/env python3

import argparse
import json
from pathlib import Path
import urllib.parse

from generate_publication_previews import (
    IMAGES_DIR,
    ROOT,
    candidate_links,
    download_file,
    dump_front_matter,
    load_front_matter,
    render_preview,
    resolve_pdf_url,
)
from regenerate_korean_publication_svgs import clean_subtitle, make_svg


PUBLICATIONS_DIR = ROOT / "_publications"
IMAGE_EXTENSIONS = (".png", ".svg")


def image_exists(image: str) -> bool:
    if not image:
        return False
    return (ROOT / image.lstrip("/")).exists()


def existing_generated_image(stem: str) -> str | None:
    for extension in IMAGE_EXTENSIONS:
        path = IMAGES_DIR / f"{stem}{extension}"
        if path.exists():
            return f"images/publications/{stem}{extension}"
    return None


def ensure_parent(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)


def try_generate_preview(data: dict, stem: str) -> str | None:
    output_path = IMAGES_DIR / f"{stem}.png"
    ensure_parent(output_path)

    pdf_url = None
    for link in candidate_links(data):
        pdf_url = resolve_pdf_url(link)
        if pdf_url:
            break

    if not pdf_url:
        return None

    temp_pdf = ROOT / ".tmp" / f"{stem}.pdf"
    ensure_parent(temp_pdf)
    try:
        download_file(pdf_url, temp_pdf)
        render_preview(temp_pdf, output_path)
        return f"images/publications/{stem}.png"
    except Exception:
        return None
    finally:
        temp_pdf.unlink(missing_ok=True)


def svg_data_uri(data: dict) -> str:
    title = (data.get("title") or "").strip()
    subtitle = clean_subtitle(data.get("subtitle") or "")
    svg = make_svg(title, subtitle)
    return "data:image/svg+xml," + urllib.parse.quote(svg, safe="")


def generate_svg_fallback(data: dict, stem: str) -> str:
    output_path = IMAGES_DIR / f"{stem}.svg"
    ensure_parent(output_path)
    title = (data.get("title") or "").strip()
    subtitle = clean_subtitle(data.get("subtitle") or "")
    output_path.write_text(make_svg(title, subtitle), encoding="utf-8")
    return f"images/publications/{stem}.svg"


def set_image(data: dict, body: str, path: Path, image: str, write: bool):
    data["image"] = image
    if write:
        dump_front_matter(path, data, body)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--no-write",
        action="store_true",
        help="Generate missing image files without updating publication front matter.",
    )
    parser.add_argument(
        "--map-file",
        type=Path,
        help="Write a JSON map of publication stems to resolved image values.",
    )
    args = parser.parse_args()
    write = not args.no_write
    image_map = {}

    checked = 0
    configured = 0
    linked_existing = 0
    generated_previews = 0
    generated_fallbacks = 0

    for path in sorted(PUBLICATIONS_DIR.glob("*.md")):
        data, body = load_front_matter(path)
        image = (data.get("image") or "").strip()
        checked += 1

        if image:
            configured += 1
            if not image_exists(image):
                print(f"CONFIGURED_MISSING {path.stem} -> {image}")
            continue

        existing_image = existing_generated_image(path.stem)
        if existing_image:
            image_map[path.stem] = existing_image
            set_image(data, body, path, existing_image, write)
            linked_existing += 1
            print(f"LINK {path.stem} -> {existing_image}")
            continue

        if args.no_write:
            fallback_image = svg_data_uri(data)
            image_map[path.stem] = fallback_image
            set_image(data, body, path, fallback_image, write)
            generated_fallbacks += 1
            print(f"FALLBACK {path.stem} -> data:image/svg+xml")
            continue

        preview_image = try_generate_preview(data, path.stem)
        if preview_image:
            image_map[path.stem] = preview_image
            set_image(data, body, path, preview_image, write)
            generated_previews += 1
            print(f"PREVIEW {path.stem} -> {preview_image}")
            continue

        fallback_image = generate_svg_fallback(data, path.stem)
        image_map[path.stem] = fallback_image
        set_image(data, body, path, fallback_image, write)
        generated_fallbacks += 1
        print(f"FALLBACK {path.stem} -> {fallback_image}")

    print(f"checked_publications {checked}")
    print(f"configured_images {configured}")
    print(f"linked_existing_images {linked_existing}")
    print(f"generated_previews {generated_previews}")
    print(f"generated_fallbacks {generated_fallbacks}")

    if args.map_file:
        args.map_file.parent.mkdir(parents=True, exist_ok=True)
        args.map_file.write_text(json.dumps(image_map), encoding="utf-8")


if __name__ == "__main__":
    main()
