import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
  getLovableAiGatewayResponseHeaders,
} from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { z } from "zod";

const EmailInput = z.object({
  kind: z.literal("email"),
  recipient: z.string().max(200).optional(),
  subject: z.string().min(1).max(300),
  purpose: z.string().min(1).max(2000),
  context: z.string().max(4000).optional(),
  tone: z.enum(["formal", "friendly", "persuasive"]),
  length: z.enum(["short", "medium", "long"]),
});

const ResearchInput = z.object({
  kind: z.literal("research"),
  mode: z.enum(["summarise", "insights", "recommendations"]),
  input: z.string().min(1).max(30000),
});

const GenerateInput = z.discriminatedUnion("kind", [EmailInput, ResearchInput]);

const EMAIL_SYSTEM =
  "You are a professional workplace communication assistant. Generate a professional email using the selected tone, subject, purpose, and additional context. Ensure the email is polite, grammatically correct, concise, and suitable for workplace communication. Output only the email itself (greeting, body, sign-off) — no preamble or commentary.";

const RESEARCH_SYSTEM =
  "You are an AI Research Assistant. Summarise the provided content, identify key points, highlight important findings, explain business implications, and provide actionable recommendations using clear markdown headings and bullet points.";

function buildPrompt(data: z.infer<typeof GenerateInput>) {
  if (data.kind === "email") {
    const lengthGuide = {
      short: "Keep it brief — around 3-5 sentences.",
      medium: "A standard-length email of 1-2 short paragraphs.",
      long: "A detailed email of 2-4 paragraphs covering all relevant points.",
    }[data.length];
    return [
      data.recipient ? `Recipient: ${data.recipient}` : null,
      `Subject: ${data.subject}`,
      `Purpose: ${data.purpose}`,
      data.context ? `Additional context: ${data.context}` : null,
      `Tone: ${data.tone}`,
      `Length: ${lengthGuide}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  const modeGuide = {
    summarise:
      "Produce a structured output with these markdown sections: ## Summary, ## Key Insights, ## Important Takeaways.",
    insights:
      "Focus on key insights. Produce markdown sections: ## Key Insights, ## Business Implications, ## Important Takeaways.",
    recommendations:
      "Focus on actionable recommendations. Produce markdown sections: ## Recommendations, ## Rationale, ## Important Takeaways.",
  }[data.mode];

  return `${modeGuide}\n\nContent or topic:\n${data.input}`;
}

export const Route = createFileRoute("/api/generate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let parsed: z.infer<typeof GenerateInput>;
        try {
          parsed = GenerateInput.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return Response.json({ error: "Missing LOVABLE_API_KEY" }, { status: 500 });
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(key, initialRunId);
        const model = gateway("google/gemini-3-flash-preview");

        try {
          const result = await generateText({
            model,
            system: parsed.kind === "email" ? EMAIL_SYSTEM : RESEARCH_SYSTEM,
            prompt: buildPrompt(parsed),
          });

          return Response.json(
            { text: result.text },
            { headers: getLovableAiGatewayResponseHeaders(result.response.headers) },
          );
        } catch (error) {
          const message = error instanceof Error ? error.message : "Generation failed";
          const status = message.includes("429") ? 429 : message.includes("402") ? 402 : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
