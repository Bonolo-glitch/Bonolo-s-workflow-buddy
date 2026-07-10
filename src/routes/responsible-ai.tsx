import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Eye, Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "How to use AI responsibly and ethically, and how this application protects your privacy.",
      },
      { property: "og:title", content: "Responsible AI" },
      {
        property: "og:description",
        content: "Guidance on ethical AI usage and our privacy commitments.",
      },
    ],
  }),
  component: ResponsibleAI,
});

const sections = [
  {
    icon: AlertTriangle,
    title: "Review before you use",
    points: [
      "AI-generated content should always be reviewed before professional use.",
      "AI responses may occasionally contain inaccuracies.",
      "Users should independently verify important information before acting on it.",
    ],
  },
  {
    icon: Lock,
    title: "Your privacy is protected",
    points: [
      "No personal information is collected.",
      "No conversations are stored.",
      "No generated content is permanently saved — everything clears when you close or refresh the browser.",
    ],
  },
  {
    icon: Eye,
    title: "Use AI ethically",
    points: [
      "Use AI responsibly and ethically in your workplace.",
      "Avoid entering confidential, sensitive, or personal information into AI prompts.",
      "Be transparent with colleagues when content is AI-assisted, where appropriate.",
    ],
  },
] as const;

function ResponsibleAI() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="text-center">
        <div className="gradient-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl shadow-glow">
          <ShieldCheck className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          Responsible <span className="text-gradient">AI</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Artificial Intelligence is a powerful productivity tool — used thoughtfully. Here's what
          you should know when using this application.
        </p>
      </div>

      <div className="mt-10 space-y-5">
        {sections.map((section) => (
          <Card key={section.title} className="rounded-2xl shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent">
                  <section.icon className="h-4.5 w-4.5 text-accent-foreground" />
                </div>
                <h2 className="font-display text-lg font-bold">{section.title}</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
