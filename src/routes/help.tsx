import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Mail } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & FAQ — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Learn how to use the Smart Email Generator, AI Chat Assistant, and AI Research Assistant. FAQ and troubleshooting.",
      },
      { property: "og:title", content: "Help & FAQ" },
      { property: "og:description", content: "Guides, FAQ, and troubleshooting for all AI tools." },
    ],
  }),
  component: HelpPage,
});

const guides = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <p>
        No account is needed — simply open the application and start using any tool right away.
        There is no registration, login, or setup. Choose a tool from the sidebar or dashboard, and
        remember that everything you generate exists only during your current browser session.
      </p>
    ),
  },
  {
    id: "email",
    title: "Smart Email Generator",
    content: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Enter the subject and purpose of your email (recipient and context are optional).</li>
        <li>Select a tone — Formal, Friendly, or Persuasive — and a length.</li>
        <li>Click Generate Email and wait a moment for the result.</li>
        <li>Edit the generated email directly in the output box.</li>
        <li>Click Copy to copy it to your clipboard, Regenerate for a new version, or Clear to start over.</li>
      </ul>
    ),
  },
  {
    id: "chat",
    title: "AI Chat Assistant",
    content: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Type any workplace-related question into the message box and press Send.</li>
        <li>Use the suggested prompt cards to get started quickly.</li>
        <li>Copy any AI response with the Copy button beneath it.</li>
        <li>Regenerate the latest response if you'd like a different answer.</li>
        <li>Click Clear Chat to erase the conversation at any time.</li>
      </ul>
    ),
  },
  {
    id: "research",
    title: "AI Research Assistant",
    content: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li>Paste an article, report, or enter a research topic into the text box.</li>
        <li>Click Summarise for a structured summary with key insights.</li>
        <li>Use Generate Insights or Generate Recommendations for focused analysis.</li>
        <li>Switch to the Edit tab to modify the output, then Copy it.</li>
      </ul>
    ),
  },
] as const;

const faqs = [
  {
    q: "Is registration required?",
    a: "No. The application works instantly without any account, login, or registration.",
  },
  {
    q: "Is my information stored?",
    a: "No. Nothing you type or generate is stored. All content exists only in your current browser session and disappears when you refresh or close the page.",
  },
  {
    q: "Can I edit AI responses?",
    a: "Yes. Generated emails and research outputs are fully editable before you copy them, and chat responses can be copied and adjusted anywhere you like.",
  },
  {
    q: "Is the application free to use?",
    a: "Yes, the application is free to use with no account or payment required.",
  },
  {
    q: "What should I do if AI generates incorrect information?",
    a: "Always review AI output before professional use. If something looks wrong, use the Regenerate button for a new version and independently verify important facts.",
  },
] as const;

const troubleshooting = [
  {
    q: "The AI response never appears",
    a: "Check your internet connection and try again. If the issue persists, the service may be temporarily rate-limited — wait a minute and retry.",
  },
  {
    q: "I lost my generated content",
    a: "Content is intentionally not stored. Refreshing or closing the browser clears everything, so copy anything you want to keep before leaving the page.",
  },
  {
    q: "The page looks broken",
    a: "Try refreshing the browser or switching between light and dark mode in Settings.",
  },
] as const;

function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="text-center">
        <div className="gradient-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl shadow-glow">
          <LifeBuoy className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          Help & <span className="text-gradient">FAQ</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Everything you need to know about using the AI Workplace Productivity Assistant.
        </p>
      </div>

      <h2 className="mt-10 font-display text-lg font-bold">Guides</h2>
      <Accordion type="single" collapsible className="mt-3">
        {guides.map((guide) => (
          <AccordionItem key={guide.id} value={guide.id}>
            <AccordionTrigger className="font-display text-sm font-semibold">
              {guide.title}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {guide.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h2 className="mt-10 font-display text-lg font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="mt-3">
        {faqs.map((faq) => (
          <AccordionItem key={faq.q} value={faq.q}>
            <AccordionTrigger className="text-left text-sm font-semibold">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h2 className="mt-10 font-display text-lg font-bold">Troubleshooting</h2>
      <Accordion type="single" collapsible className="mt-3">
        {troubleshooting.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left text-sm font-semibold">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="mt-10 rounded-2xl shadow-soft">
        <CardContent className="flex items-start gap-3 p-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent">
            <Mail className="h-4.5 w-4.5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold">Need more help?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              A support contact channel is coming soon. No account will ever be required to reach
              support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
