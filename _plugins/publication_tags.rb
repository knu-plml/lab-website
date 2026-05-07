# frozen_string_literal: true

module Jekyll
  module PublicationTags
    TOPIC_RULES = {
      "machine-learning" => [
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
        "transformer",
        "pretrained model",
        "미세조정",
        "fine-tuning",
      ].freeze,
      "healthcare-ai" => [
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
        "rppg",
        "alzheimer",
        "neuropsychological",
      ].freeze,
      "programming-languages" => [
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
        "프로그래밍",
        "점진적 타이핑",
        "재귀 모듈",
        "xpath",
        "실행 의미구조",
        "타입 추론",
        "타입 시스템",
        "타입시스템",
        "재귀 타입",
      ].freeze,
      "formal-methods" => [
        "theorem",
        "proof",
        "modal logic",
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
        "타입시스템",
        "타입 추론",
        "증명",
        "논리",
        "의미구조",
        "코인덕션",
        "서브타이핑",
      ].freeze,
      "software-engineering" => [
        "software",
        "fault localization",
        "program repair",
        "repairing",
        "testing",
        "validation",
        "grading",
        "code translation",
        "code clone",
        "debug",
        "bug",
        "프로그램 자동 수정",
        "코드 수정",
        "코드 번역",
        "코드 분류",
        "소프트웨어",
        "program synthesis",
      ].freeze,
      "data-systems" => [
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
      ].freeze,
      "security" => [
        "blockchain",
        "ethereum",
        "smart contract",
        "security",
        "integrity",
        "content poisoning",
        "ndn",
        "보안",
      ].freeze,
      "computer-vision" => [
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
      ].freeze,
    }.freeze

    module_function

    def filter_tags(site)
      Array(site.data["publication_filters"]).map { |item| item["tag"].to_s }
    end

    def normalize(text)
      text
        .to_s
        .downcase
        .gsub("::", " ")
        .gsub(/[\u2013\u2014]/, " ")
        .gsub(/[^0-9a-zㄱ-ㅎㅏ-ㅣ가-힣\s-]/, " ")
        .gsub(/\s+/, " ")
        .strip
    end

    def infer_topics(text)
      TOPIC_RULES.select do |_tag, keywords|
        keywords.any? { |keyword| text.include?(keyword) }
      end.keys
    end

    def assign!(site)
      publications = site.collections["publications"]
      return unless publications

      ordered_filters = filter_tags(site)

      publications.docs.each do |doc|
        existing_tags = Array(doc.data["tags"])
        custom_tags = existing_tags.reject { |tag| ordered_filters.include?(tag) }
        inferred_tags = infer_topics(normalize(doc.data["title"]))

        doc.data["tags"] = custom_tags + ordered_filters.select { |tag| inferred_tags.include?(tag) }
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  Jekyll::PublicationTags.assign!(site)
end
