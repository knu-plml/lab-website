#!/usr/bin/env python3

import argparse
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
GALLERY_DIR = ROOT / "images" / "gallery"
THUMBNAIL_DIR = GALLERY_DIR / "thumbnails"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def thumbnail_path(source: Path, width: int, height: int) -> Path:
    return THUMBNAIL_DIR / f"{source.stem}-{width}x{height}.jpg"


def needs_update(source: Path, output: Path) -> bool:
    return not output.exists() or source.stat().st_mtime > output.stat().st_mtime


def generate_thumbnail(source: Path, output: Path, width: int, height: int, quality: int) -> bool:
    if not needs_update(source, output):
        return False

    output.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image = image.convert("RGB")
        image = ImageOps.fit(
            image,
            (width, height),
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        image.save(output, "JPEG", quality=quality, optimize=True, progressive=True)

    return True


def gallery_images() -> list[Path]:
    if not GALLERY_DIR.exists():
        return []

    return sorted(
        path
        for path in GALLERY_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--width", type=int, default=640)
    parser.add_argument("--height", type=int, default=400)
    parser.add_argument("--quality", type=int, default=78)
    args = parser.parse_args()

    generated = 0
    skipped = 0

    for source in gallery_images():
        output = thumbnail_path(source, args.width, args.height)
        if generate_thumbnail(source, output, args.width, args.height, args.quality):
            generated += 1
            print(f"THUMBNAIL {source.relative_to(ROOT)} -> {output.relative_to(ROOT)}")
        else:
            skipped += 1

    print(f"checked_gallery_images {generated + skipped}")
    print(f"generated_gallery_thumbnails {generated}")
    print(f"unchanged_gallery_thumbnails {skipped}")


if __name__ == "__main__":
    main()
