---
slug: 2025-international-03-impact-of-large-language-models-of-code-on-fault-localization
title: Impact of Large Language Models of Code on Fault Localization
subtitle: "ICST 2025: IEEE International Conference on Software Testing,
  Verification and Validation. 31 March – 4 April 2025"
authors:
  - Suhwan Ji
  - Sanghwa Lee
  - Changsup Lee
  - Yo-Sub Han
  - Hyeonseung Im
support:
  - 지역지능화
  - BRL후속
  - Post-Doc.
image: /new/images/publications/2025-international-03-impact-of-large-language-models-of-code-on-fault-localization.png
tags:
  - international
  - ICST
  - machine-learning
  - software-engineering
date: 2025-03-01
buttons:
  - text: PDF
    link: https://ieeexplore.ieee.org/document/10989036
    icon: fa-solid fa-file-lines
  - text: GitHub
    link: https://github.com/knu-plml/LLM4FL
    icon: fa-brands fa-github
abstract: Identifying the point of error is imperative in software debugging.
  Traditional fault localization (FL) techniques rely on executing the program
  and using the code coverage matrix in tandem with test case results to
  calculate a suspiciousness score for each method or line. Recently,
  learning-based FL techniques have harnessed machine learning models to extract
  meaningful features from the code coverage matrix and improve FL performance.
  These techniques, however, require compilable source code, existing test
  cases, and specialized tools for generating the code coverage matrix for each
  programming language of interest. In this paper, we propose, for the first
  time, a simple but effective sequence generation approach for fine-tuning
  large language models of code (LLMCs) for FL tasks. LLMCs have recently
  received much attention for various software engineering problems. In line
  with these, we leverage the innate understanding of code that LLMCs have
  acquired through pre-training on large code corpora. Specifically, we
  fine-tune 13 representative encoder, encoder-decoder, and decoder-based LLMCs
  (across 7 different architectures) for FL tasks. Unlike previous approaches,
  LLM Cs can analyze code sequences that do not compile. Still, they have a
  limitation on the length of the input data. Therefore, for a fair comparison
  with existing FL techniques, we extract methods with errors from the
  project-level benchmark, Defects4J, and analyze them at the line level.
  Experimental results show that LLMCs fine-tuned with our approach successfully
  pinpoint error positions in 50.6%, 64.2%, and 72.3% of 1,291 methods in
  Defects4J for Top-1/3/5 prediction, outperforming the best learning-based
  state-of-the-art technique by up to 1.35, 1.12, and 1.08 times, respectively.
  We also conduct an in-depth investigation of key factors that may affect the
  FL performance of LLMCs. Our findings suggest promising research directions
  for FL and automated program repair tasks using LLMCs.
---
