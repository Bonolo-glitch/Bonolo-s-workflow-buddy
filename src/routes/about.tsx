import { createFileRoute } from "@tanstack/react-router";
import { Info, Mail, MessageSquare, BookOpenText, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { APP_VERSION } from "@/lib/app-info";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "About the AI Workplace Productivity Assistant: purpose, capabilities, version, and technology overview.",
      },
      { property: "og:title", content: "About AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "AI-powered productivity tools for professionals — private and free.",
      },
    ],
  }),
  component: AboutPage,
});

const capabilities = [
  { icon: Mail, text: "Generate professional emails in your chosen tone and length" },
  { icon: MessageSquare, text: "Ask workplace-related AI questions and get structured answers" },
  { icon: BookOpenText, text: "Summarise reports, articles, and research topics" },
  { icon: ShieldCheck, text: "Improve productivity with privacy-first, session-only tools" },
] as const;

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="text-center">
        <div className="gradient-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl shadow-glow">
          <Info className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          About <span className="text-gradient">AI Workplace Productivity Assistant</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Version {APP_VERSION}
        </p>
      </div>

      <Card className="mt-10 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">Our purpose</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This application was developed to improve workplace productivity through AI-powered
            tools that help professionals communicate more effectively, conduct research
            efficiently, and complete everyday workplace tasks faster — all without accounts,
            sign-ups, or stored data.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-5 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">What you can do</h2>
          <ul className="mt-4 space-y-3">
            {capabilities.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <item.icon className="h-4 w-4 text-accent-foreground" />
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-5 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">Technology overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Built as a modern web application with React and a fast server-rendered framework,
            powered by state-of-the-art AI language models for text generation. All AI processing
            happens on demand — no databases store your content, and each session starts fresh.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-5 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">Responsible AI statement</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            AI-generated content should always be reviewed before professional use, as responses may
            occasionally contain inaccuracies. This application collects no personal information,
            stores no conversations, and permanently saves no generated content. Please use AI
            responsibly and ethically, and avoid entering confidential information into prompts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
