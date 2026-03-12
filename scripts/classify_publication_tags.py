#!/usr/bin/env python3

import re
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
PUBLICATIONS_DIR = ROOT / "_publications"

TOPIC_RULES = {
    "machine-learning": [
        "machine learning",
        "deep learning",
        "neural",
        "automl",
        "qlora",
        "large language model",
        "language model",
        "llm",
        "generative model",
        "prediction",
        "classifier",
        "denoising",
        "reconstruction",
        "ecg",
        "kalman",
        "sensor data",
        "dementia",
        "osteoporosis",
        "healthcare",
        "medical",
        "medicine",
        "cardiovascular",
        "blood pressure",
        "propensity score",
        "bitcoin",
        "기계학습",
        "딥 러닝",
        "딥러닝",
        "언어 모델",
        "거대 언어 모델",
        "생성 모델",
        "예측",
        "분류",
        "오토엠엘",
        "automl",
        "gru",
        "임베딩",
        "프롬프트",
        "심전도",
        "생체인증",
    ],
    "healthcare-ai": [
        "medical",
        "healthcare",
        "clinical",
        "ecg",
        "cardiovascular",
        "dementia",
        "osteoporosis",
        "blood pressure",
        "propensity score",
        "medicine",
        "rheumatoid",
        "hospital",
        "의료",
        "헬스케어",
        "심전도",
        "심혈관",
        "혈압",
        "문진",
        "치매",
        "의료데이터",
        "생체인증",
    ],
    "programming-languages": [
        "programming language",
        "functional",
        "xquery",
        "xml",
        "module",
        "type system",
        "types",
        "calculus",
        "regular expression",
        "regular expressions",
        "programming",
        "프로그래밍 언어",
        "점진적 타이핑",
        "재귀 모듈",
        "xpath",
        "실행 의미구조",
        "타입 추론",
        "타입 시스템",
        "재귀 타입",
    ],
    "formal-methods": [
        "theorem",
        "proof",
        "modal logic",
        "logic",
        "verification",
        "type system",
        "type-safe",
        "syntax",
        "semantics",
        "decision procedure",
        "calculus",
        "regular expression",
        "contractive",
        "cps transformation",
        "double negation",
        "correspondence",
        "타입 시스템",
        "타입 추론",
        "증명",
        "논리",
        "의미구조",
        "코인덕션",
        "서브타이핑",
    ],
    "software-engineering": [
        "software",
        "fault localization",
        "program repair",
        "repairing",
        "testing",
        "validation",
        "grading",
        "code translation",
        "debug",
        "bug",
        "code",
        "프로그램 자동 수정",
        "코드 수정",
        "코드 번역",
        "코드 분류",
        "소프트웨어",
    ],
    "data-systems": [
        "skyline",
        "database",
        "query",
        "queries",
        "xml",
        "top-k",
        "data stream",
        "big data",
        "uncertain databases",
        "kalman",
        "sensor data",
        "스카이라인",
        "데이터 과학",
    ],
    "security": [
        "blockchain",
        "ethereum",
        "smart contract",
        "security",
        "integrity",
        "content poisoning",
        "ndn",
        "보안",
    ],
    "computer-vision": [
        "3d shape",
        "image",
        "face mesh",
        "human motion",
        "motion",
        "denoising",
        "ocr",
        "plant",
        "shape completion",
        "이미지",
        "얼굴 메쉬",
        "모션",
        "광학 문자 인식",
        "수형",
    ],
}

PUBLICATION_FILTERS = [
    "machine-learning",
    "healthcare-ai",
    "software-engineering",
    "programming-languages",
    "formal-methods",
    "data-systems",
    "security",
    "computer-vision",
]


def load_front_matter(path: Path):
    text = path.read_text()
    _, front_matter, body = text.split("---", 2)
    return yaml.safe_load(front_matter), body


def dump_front_matter(path: Path, data, body: str):
    rendered = yaml.safe_dump(data, sort_keys=False, allow_unicode=True).strip()
    path.write_text(f"---\n{rendered}\n---{body}")


def normalize(text: str) -> str:
    cleaned = (text or "").lower()
    cleaned = cleaned.replace("::", " ")
    cleaned = re.sub(r"[\u2013\u2014]", " ", cleaned)
    cleaned = re.sub(r"[^0-9a-z\u3131-\u318e\uac00-\ud7a3\s-]", " ", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned


def infer_topics(text: str):
    topics = []
    for tag, keywords in TOPIC_RULES.items():
        if any(keyword in text for keyword in keywords):
            topics.append(tag)
    return topics


def main():
    updated = 0
    for path in sorted(PUBLICATIONS_DIR.glob("*.md")):
        data, body = load_front_matter(path)
        text = normalize(data.get("title", ""))

        base_tags = list(data.get("tags") or [])
        category_tags = [tag for tag in base_tags if tag not in PUBLICATION_FILTERS]
        topic_tags = infer_topics(text)
        merged_tags = category_tags + [tag for tag in PUBLICATION_FILTERS if tag in topic_tags]

        if merged_tags != base_tags:
            data["tags"] = merged_tags
            dump_front_matter(path, data, body)
            updated += 1

    print(f"updated_publication_tags {updated}")


if __name__ == "__main__":
    main()
