---
title: Automated Program Repair using quantized language models and
  parameter-efficient fine-tuning
scope: international
kind: journal
subtitle: "Information and Software Technology. 2026, "
venue: Information and Software Technology
venue_url: https://www.sciencedirect.com/journal/information-and-software-technology
abstract: >-
  Context:

  Large language models have demonstrated remarkable capabilities in Automated
  Program Repair (APR), outperforming traditional template- and rule-based
  approaches. However, their extensive memory and computational requirements
  pose significant challenges for local deployment on consumer-grade GPUs, which
  are essential for maintaining data privacy and avoiding dependency on
  cloud-based API services.

  Objective:

  This paper presents a comprehensive evaluation of parameter-efficient
  fine-tuning methods across various language models to reduce memory usage
  while maintaining APR effectiveness.

  Methods:

  We use QLoRA, which combines 4-bit quantization with Low-Rank Adapter (LoRA),
  and evaluate its impact on APR performance across multiple models. We conduct
  a comprehensive evaluation of various code language models such as CodeGen,
  InCoder, CodeLlama, StarCoder, and Qwen-Coder, after applying QLoRA-based
  efficient fine-tuning. The evaluation is performed on three Java-specific
  benchmarks (Defects4J, QuixBugs, and HumanEval-Java), measuring repair
  accuracy, inference latency, and memory utilization for each model
  configuration.

  Results:

  Our results demonstrate that QLoRA-tuned models generate 5-27% more plausible
  patches while using 51-71% less memory compared to baseline models.
  Furthermore, within a 24GB GPU memory constraint, QLoRA enables the
  utilization of larger parameter models, leading to 35% more plausible patches.

  Conclusion:

  These findings highlight the potential of APR techniques to be effectively
  deployed in consumer-grade GPUs, enabling individual developers and
  privacy-conscious organizations to leverage advanced APR capabilites without
  relying on external API services.

  Keywords

  Large language modelAutomated program repairParameter-efficient
  fine-tuningQuantization
image: images/Automated Program Repair using quantized language models and
  parameter-efficient fine-tuning-1.png
authors:
  - Yongkyu Lee
  - Sanghwa Lee
  - Suhwan Ji
  - Wonjun Song
  - Hyeonseung Im
support:
  - BRL후속
  - Post-Doc.
  - 글로컬랩
  - RISE
tags:
  - software-engineering
  - machine-learning
date: 2026-04-30
buttons:
  - text: DOI
    link: https://doi.org/10.1016/j.infsof.2026.108181
    icon: fa-solid fa-file-lines
---
