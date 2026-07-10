import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, RefreshCw, Trash2, Loader2, FileText, Lightbulb, ListChecks } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/Markdown";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Summarise articles, reports, and research topics with AI. Get key insights and recommendations — nothing stored.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Summarise workplace content and get actionable insights with AI.",
      },
    ],
  }),
  component: ResearchAssistant,
});

type Mode = "summarise" | "insights" | "recommendations";

function ResearchAssistant() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<Mode | null>(null);
  const [lastMode, setLastMode] = useState<Mode | null>(null);

  const run = async (mode: Mode) => {
    if (!input.trim()) {
      toast.error("Please paste an article or enter a topic first.");
      return;
    }
    setLoading(mode);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "research", mode, input: input.trim() }),
      });
      if (!res.ok) {
        const message =
          res.status === 429
            ? "Rate limit reached. Please try again in a moment."
            : res.status === 402
              ? "AI credits are exhausted. Please add credits to continue."
              : "Something went wrong. Please try again.";
        toast.error(message);
        return;
      }
      const data = (await res.json()) as { text: string };
      setOutput(data.text);
      setLastMode(mode);
      setEditMode(false);
      toast.success(lastMode === mode ? "Response regenerated." : "Analysis complete.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Output copied successfully.");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setLastMode(null);
    toast.success("Output cleared.");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
        AI <span className="text-gradient">Research Assistant</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Summarise reports, articles, and workplace topics. All processing is temporary.
      </p>

      <Card className="mt-8 rounded-2xl shadow-soft">
        <CardHeader>
          <CardTitle className="font-display text-lg">Your content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste an article or enter a research topic..."
            rows={8}
            className="resize-y text-sm leading-relaxed"
            aria-label="Research input"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => run("summarise")}
              disabled={loading !== null}
              className="gradient-primary rounded-full border-0 text-primary-foreground shadow-glow hover:opacity-90"
            >
              {loading === "summarise" ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <FileText className="mr-1.5 h-4 w-4" />
              )}
              Summarise
            </Button>
            <Button
              variant="secondary"
              onClick={() => run("insights")}
              disabled={loading !== null}
              className="rounded-full"
            >
              {loading === "insights" ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-1.5 h-4 w-4" />
              )}
              Generate Insights
            </Button>
            <Button
              variant="secondary"
              onClick={() => run("recommendations")}
              disabled={loading !== null}
              className="rounded-full"
            >
              {loading === "recommendations" ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <ListChecks className="mr-1.5 h-4 w-4" />
              )}
              Generate Recommendations
            </Button>
            <Button
              variant="ghost"
              onClick={clearAll}
              disabled={!input && !output}
              className="rounded-full"
            >
              <Trash2 className="mr-1.5 h-4 w-4" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="mt-6 rounded-2xl shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-lg">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={editMode ? "edit" : "preview"} onValueChange={(v) => setEditMode(v === "edit")}>
              <TabsList className="rounded-full">
                <TabsTrigger value="preview" className="rounded-full">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="edit" className="rounded-full">
                  Edit
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <Markdown>{output}</Markdown>
              </TabsContent>
              <TabsContent value="edit" className="mt-4">
                <Textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  rows={14}
                  className="resize-y text-sm leading-relaxed"
                  aria-label="Edit results"
                />
              </TabsContent>
            </Tabs>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={copy} className="rounded-full">
                <Copy className="mr-1.5 h-4 w-4" /> Copy
              </Button>
              {lastMode && (
                <Button
                  variant="secondary"
                  onClick={() => run(lastMode)}
                  disabled={loading !== null}
                  className="rounded-full"
                >
                  <RefreshCw className="mr-1.5 h-4 w-4" /> Regenerate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
