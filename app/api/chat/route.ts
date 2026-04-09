import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { matchFaq, getFaqContextForPrompt, getFallbackResponse } from "@/lib/matcher";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are SRMCEM Campus Assistant for Shri Ramswaroop Memorial College of Engineering & Management (SRMCEM), Lucknow.
Always provide concise, student-friendly responses.
Focus on these categories only: Admissions, Fees, Courses, Exams, Hostel, Placements, Library.
If the user asks outside these categories, politely redirect to the supported categories.
Use this institution context where relevant:
- SRMCEM is affiliated with Dr. A.P.J. Abdul Kalam Technical University, Lucknow.
- Programs include Engineering, Computer Application, Pharmacy, Management, and Commerce.
- Placement messaging should align with strong employability outcomes.
Prefer factual answers based on the provided FAQ context.
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = typeof body?.topic === "string" ? body.topic : "Admissions";
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    // Find last user message taking into account the array content structure
    const lastUserMessage = [...messages].reverse().find((message) => message?.role === "user");

    const textContent = Array.isArray(lastUserMessage?.content)
      ? lastUserMessage?.content.find((c: any) => c.type === "text")?.text || ""
      : typeof lastUserMessage?.content === "string"
        ? lastUserMessage.content
        : "";

    const faqMatch = textContent
      ? matchFaq(textContent)
      : { bestMatch: null, confidence: 0 };

    const hint =
      faqMatch.bestMatch && faqMatch.confidence >= 0.35
        ? `Best local FAQ match (${faqMatch.bestMatch.category}):\nQ: ${faqMatch.bestMatch.question}\nA: ${faqMatch.bestMatch.answer}`
        : `No strong FAQ match. If unsure, suggest contacting support: ${getFallbackResponse()}`;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          reply:
            faqMatch.bestMatch?.answer ??
            "Chat API is not configured yet. Add GROQ_API_KEY in .env.local.",
        },
        { status: 200 },
      );
    }
    const hasImage = messages.some(
      (m: any) => Array.isArray(m.content) && m.content.some((c: any) => c.type === "image_url")
    );

    if (hasImage) {
      return NextResponse.json({ 
        reply: "I see you uploaded an image! Unfortunately, Groq has recently decommissioned all of their Vision processing models, and your current API key does not grant access to any active image-reading models. Please send text-only questions for now." 
      });
    }

    const model = "llama-3.1-8b-instant"; // Using text-only model natively

    const result = await groq.chat.completions.create({
      model: model,
      temperature: 0.2,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}
Current selected topic: ${topic}

FAQ Context:
${getFaqContextForPrompt()}

Matching hint:
${hint}`,
        },
        ...messages,
      ],
    });

    const reply =
      result.choices?.[0]?.message?.content?.trim() ||
      faqMatch.bestMatch?.answer ||
      getFallbackResponse();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("GROQ API ERROR:", error);
    return NextResponse.json(
      {
        reply:
          `The assistant is temporarily unavailable. Error details: ${error?.message || 'Unknown error'}`,
      },
      { status: 200 }
    );
  }
}
