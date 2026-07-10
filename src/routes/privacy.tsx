import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "No accounts, no stored data. Everything you generate is temporary and clears when your session ends.",
      },
      { property: "og:title", content: "Privacy Notice" },
      {
        property: "og:description",
        content: "A privacy-first application: no registration, no storage, no tracking.",
      },
    ],
  }),
  component: PrivacyPage,
});

const commitments = [
  "No registration is required.",
  "No login is required.",
  "No user accounts are created.",
  "No passwords are collected.",
  "No personal information is requested.",
  "No conversations are permanently stored.",
  "No generated emails are saved.",
  "No research summaries are retained.",
  "No databases are used for storing user information.",
  "All interactions remain only during the current browser session.",
  "Closing or refreshing the application clears all generated content.",
] as const;

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="text-center">
        <div className="gradient-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl shadow-glow">
          <Lock className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          Privacy <span className="text-gradient">Notice</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          This application is built privacy-first. Here is exactly what we do — and don't do — with
          your information.
        </p>
      </div>

      <Card className="mt-10 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">Our commitments</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {commitments.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-5 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">A note on AI prompts</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            While nothing is stored by this application, your prompts are processed by AI language
            models to generate responses. Please avoid entering confidential or sensitive
            information into AI prompts.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The only value saved in your browser is your theme preference (light/dark/system) —
            an appearance setting that contains no personal information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
