import { CONTACT_FALLBACK, FAQS, type FaqItem } from "@/data/faqs";

type MatchResult = {
  bestMatch: FaqItem | null;
  confidence: number;
};

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

export function matchFaq(question: string): MatchResult {
  const words = new Set(tokenize(question));
  let bestMatch: FaqItem | null = null;
  let maxScore = 0;

  for (const faq of FAQS) {
    let score = 0;

    for (const keyword of faq.keywords) {
      const normalized = keyword.toLowerCase();
      if (words.has(normalized)) {
        score += 3;
      } else if (Array.from(words).some((word) => normalized.includes(word) || word.includes(normalized))) {
        score += 1;
      }
    }

    for (const token of tokenize(faq.question)) {
      if (words.has(token)) score += 0.5;
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = faq;
    }
  }

  const confidence = Math.min(1, maxScore / 8);
  return { bestMatch, confidence };
}

export function getFaqContextForPrompt() {
  return FAQS.map(
    (faq) => `Category: ${faq.category}\nQ: ${faq.question}\nA: ${faq.answer}`,
  ).join("\n\n");
}

export function getFallbackResponse() {
  return CONTACT_FALLBACK;
}
