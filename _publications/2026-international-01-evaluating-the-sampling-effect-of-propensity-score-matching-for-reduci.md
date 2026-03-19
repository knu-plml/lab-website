---
slug: 2026-international-01-evaluating-the-sampling-effect-of-propensity-score-matching-for-reduci
title: Evaluating the sampling effect of propensity score matching for reducing
  selection bias in medical data
subtitle: Frontiers in Public Health. 2026, 14:1747762
authors:
  - Minji Roh
  - Sujin Yum
  - Gihun Joo
  - Jae-Won Jang
  - Hyeonseung Im
support:
  - 글로컬랩
  - PACEN
  - Post-Doc.
  - RISE
image: /images/publications/2026-international-01-evaluating-the-sampling-effect-of-propensity-score-matching-for-reduci.png
tags:
  - international
  - machine-learning
  - healthcare-ai
date: 2026-01-01
buttons:
  - text: DOI
    link: https://doi.org/10.3389/fpubh.2026.1747762
    icon: fa-solid fa-file-lines
abstract: >-
  Background

  In real-world medical data, selection bias can significantly impact the
  performance of machine learning models, potentially leading to distorted
  outcomes. However, research aimed at mitigating selection bias remains
  relatively limited.


  Methods

  In this study, we evaluate the effectiveness of Propensity Score Matching
  (PSM) in reducing selection bias and assessing its impact on classification
  performance in imbalanced medical data. Specifically, we apply PSM alongside
  five undersampling, three oversampling, and three hybrid sampling techniques
  to three medical datasets: rapidly progressive dementia prediction (ADNI, n =
  628, events = 51), hypothyroidism prediction (UCI, n = 3,772, events = 3,481),
  and cardiovascular disease prediction (Kaggle, n = 253,680, events = 23,893),
  each exhibiting varying degrees of demographic selection bias. We train and
  compare six classification models to assess the impact of each resampling
  technique on model performance. The magnitude of selection bias is quantified
  using the standardized mean difference (SMD), while model performance is
  assessed using the Area Under the Receiver Operating Characteristic Curve
  (AUROC), the Area Under the Precision-Recall Curve (AUPRC), accuracy,
  precision, recall, F1-score, specificity, calibration curves, Brier score, and
  decision curve analysis.


  Results

  The results indicate that PSM reduces SMD within the dataset, maintains stable
  classification performance, and enhances the internal validity of the model
  under conditions of limited or moderate demographic imbalance.


  Conclusion

  These advantages suggest its potential for improving model reliability and
  facilitating better generalization to external datasets in real-world medical
  applications. However, in datasets with extreme selection bias or when overly
  restrictive matching is applied, PSM can degrade model performance,
  underscoring the importance of choosing strategies that account for dataset
  characteristics.


  Keywords: imbalanced data, machine learning, medical data analysis, propensity
  score matching, selection bias
---
