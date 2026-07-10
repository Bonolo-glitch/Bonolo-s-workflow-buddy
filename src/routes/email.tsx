import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, RefreshCw, Trash2, WandSparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails with AI. Choose tone and length, edit, and copy — nothing is stored.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Generate professional workplace emails with AI in seconds.",
      },
    ],
  }),
  component: EmailGenerator,
});

type Tone = "formal" | "friendly" | "persuasive";
type Length = "short" | "medium" | "long";

function EmailGenerator() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [length, setLength] = useState<Length>("medium");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!subject.trim() || !purpose.trim()) {
      toast.error("Please fill in the subject and purpose.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "email",
          recipient: recipient.trim() || undefined,
          subject: subject.trim(),
          purpose: purpose.trim(),
          context: context.trim() || undefined,
          tone,
          length,
        }),
      });
      if (!res.ok) {
        const message =
          res.status === 429
            ? "Rate limit reached. Please try again in a moment."
            : res.status === 402
              ? "AI credits are exhausted. Please add credits to continue."
              : "Something went wrong generating your email.";
        toast.error(message);
        return;
      }
      const data = (await res.json()) as { text: string };
      setOutput(data.text);
      toast.success(output ? "Response regenerated." : "Email generated.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Email copied successfully.");
  };

  const clear = () => {
    setOutput("");
    toast.success("Output cleared.");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
        Smart <span className="text-gradient">Email Generator</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Generate professional workplace emails quickly. Nothing you enter is stored.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-lg">Email details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="recipient">Recipient (optional)</Label>
              <Input
                id="recipient"
                placeholder="e.g. Sarah, the marketing team"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g. Project timeline update"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="purpose">Purpose of email</Label>
              <Textarea
                id="purpose"
                placeholder="e.g. Inform the team that the deadline moved to Friday"
                rows={3}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="context">Additional context (optional)</Label>
              <Textarea
                id="context"
                placeholder="Any extra details the email should mention"
                rows={3}
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Length</Label>
                <Select value={length} onValueChange={(v) => setLength(v as Length)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={generate}
              disabled={loading}
              className="gradient-primary w-full rounded-full border-0 text-primary-foreground shadow-glow hover:opacity-90"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <WandSparkles className="mr-2 h-4 w-4" />
              )}
              {loading ? "Generating..." : "Generate Email"}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-soft">
          <CardHeader>
            <CardTitle className="font-display text-lg">Generated email</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Your generated email will appear here. You can edit it before copying."
              rows={16}
              className="resize-y font-sans text-sm leading-relaxed"
              aria-label="Generated email (editable)"
            />
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={copy} disabled={!output} className="rounded-full">
                <Copy className="mr-1.5 h-4 w-4" /> Copy
              </Button>
              <Button
                variant="secondary"
                onClick={generate}
                disabled={loading || !subject.trim() || !purpose.trim()}
                className="rounded-full"
              >
                <RefreshCw className="mr-1.5 h-4 w-4" /> Regenerate
              </Button>
              <Button variant="ghost" onClick={clear} disabled={!output} className="rounded-full">
                <Trash2 className="mr-1.5 h-4 w-4" /> Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
