import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Copy, RefreshCw, Send, Trash2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/Markdown";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat Assistant — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Ask workplace questions, draft reports, and brainstorm with an AI assistant. Conversations are never stored.",
      },
      { property: "og:title", content: "AI Chat Assistant" },
      {
        property: "og:description",
        content: "An intelligent workplace assistant for productivity tasks.",
      },
    ],
  }),
  component: ChatAssistant,
});

const suggestedPrompts = [
  "Write meeting minutes from these notes",
  "Improve this paragraph",
  "Explain an Excel formula",
  "Generate project ideas",
  "Draft a professional report outline",
];

function messageText(parts: Array<{ type: string; text?: string }>) {
  return parts.map((part) => (part.type === "text" ? (part.text ?? "") : "")).join("");
}

function ChatAssistant() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, setMessages, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (error) => {
      const msg = error.message.includes("429")
        ? "Rate limit reached. Please try again shortly."
        : error.message.includes("402")
          ? "AI credits are exhausted. Please add credits to continue."
          : "Something went wrong. Please try again.";
      toast.error(msg);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  const copyMessage = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Response copied.");
  };

  const clearChat = () => {
    setMessages([]);
    toast.success("Chat cleared.");
  };

  const regenerateLast = async () => {
    await regenerate();
    toast.success("Response regenerated.");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
            AI <span className="text-gradient">Chat Assistant</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your workplace productivity companion. Conversations vanish when you leave.
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={clearChat}
          disabled={messages.length === 0}
          className="rounded-full"
        >
          <Trash2 className="mr-1.5 h-4 w-4" /> Clear Chat
        </Button>
      </div>

      <div
        ref={scrollRef}
        className="mt-5 flex-1 space-y-4 overflow-y-auto rounded-2xl border bg-card p-4 shadow-soft"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <div className="gradient-primary flex h-12 w-12 items-center justify-center rounded-2xl shadow-glow">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Ask a workplace question or try a suggestion:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => submit(prompt)}
                  className="rounded-full border bg-background px-3.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const text = messageText(message.parts as Array<{ type: string; text?: string }>);
          const isUser = message.role === "user";
          const isLastAssistant = !isUser && index === messages.length - 1;
          return (
            <div key={message.id} className={isUser ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  isUser
                    ? "max-w-[85%] rounded-2xl rounded-br-md bg-bubble-user px-4 py-2.5 text-sm text-bubble-user-foreground shadow-soft"
                    : "max-w-[90%] rounded-2xl rounded-bl-md bg-bubble-ai px-4 py-3 text-bubble-ai-foreground shadow-soft"
                }
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{text}</p>
                ) : (
                  <>
                    <Markdown>{text}</Markdown>
                    {!isLoading || !isLastAssistant ? (
                      <div className="mt-2 flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 rounded-full px-2 text-xs"
                          onClick={() => copyMessage(text)}
                        >
                          <Copy className="mr-1 h-3 w-3" /> Copy
                        </Button>
                        {isLastAssistant && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 rounded-full px-2 text-xs"
                            onClick={regenerateLast}
                          >
                            <RefreshCw className="mr-1 h-3 w-3" /> Regenerate
                          </Button>
                        )}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-bubble-ai px-4 py-3 text-sm text-bubble-ai-foreground shadow-soft">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>

      <form
        className="mt-4 flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(input);
            }
          }}
          placeholder="Ask a workplace question..."
          rows={2}
          className="resize-none rounded-2xl"
          aria-label="Message input"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          size="icon"
          aria-label="Send message"
          className="gradient-primary h-11 w-11 shrink-0 rounded-full border-0 text-primary-foreground shadow-glow hover:opacity-90"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
