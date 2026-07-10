import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageSquare, BookOpenText, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant — Dashboard" },
      {
        name: "description",
        content:
          "AI-powered tools to simplify communication, research, and everyday professional tasks. No account required.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant — Dashboard" },
      {
        property: "og:description",
        content: "AI-powered tools to simplify communication, research, and everyday professional tasks. No account required.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    title: "Smart Email Generator",
    description:
      "Generate polished, professional workplace emails in seconds. Choose the tone and length, then edit and copy.",
    icon: Mail,
    url: "/email",
  },
  {
    title: "AI Chat Assistant",
    description:
      "Ask workplace questions, draft reports, explain Excel formulas, and brainstorm ideas with an intelligent assistant.",
    icon: MessageSquare,
    url: "/chat",
  },
  {
    title: "AI Research Assistant",
    description:
      "Paste articles or enter topics to get structured summaries, key insights, and actionable recommendations.",
    icon: BookOpenText,
    url: "/research",
  },
  {
    title: "Responsible AI",
    description:
      "Learn how to use AI ethically and responsibly, and how this app protects your privacy with zero data storage.",
    icon: ShieldCheck,
    url: "/responsible-ai",
  },
] as const;

function Dashboard() {
  return (
    <div className="gradient-subtle min-h-full">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            No sign-up · Nothing stored · Free to use
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Welcome to <span className="text-gradient">AI Workplace</span>
            <br className="hidden sm:block" /> Productivity Assistant
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Boost workplace productivity with AI-powered tools designed to simplify communication,
            research, and everyday professional tasks.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <Card className="group h-full rounded-2xl border shadow-soft transition-shadow hover:shadow-glow">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="gradient-primary flex h-11 w-11 items-center justify-center rounded-xl shadow-glow">
                    <feature.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="mt-4 font-display text-lg font-bold">{feature.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{feature.description}</p>
                  <Button asChild variant="secondary" className="mt-5 w-fit rounded-full">
                    <Link to={feature.url}>
                      Open Tool
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
