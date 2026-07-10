import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, Sun, Moon, Monitor } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content: "Appearance settings: choose light, dark, or system theme.",
      },
      { property: "og:title", content: "Settings" },
      { property: "og:description", content: "Appearance settings for the app." },
    ],
  }),
  component: SettingsPage,
});

const options: Array<{ value: Theme; label: string; icon: typeof Sun; description: string }> = [
  { value: "light", label: "Light Mode", icon: Sun, description: "Bright and clean" },
  { value: "dark", label: "Dark Mode", icon: Moon, description: "Easy on the eyes" },
  { value: "system", label: "System Theme", icon: Monitor, description: "Follows your device" },
];

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="text-center">
        <div className="gradient-primary mx-auto flex h-12 w-12 items-center justify-center rounded-2xl shadow-glow">
          <SettingsIcon className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
          <span className="text-gradient">Appearance</span> Settings
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Only appearance options here — this app has no accounts, passwords, or stored preferences
          beyond your theme choice.
        </p>
      </div>

      <Card className="mt-10 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">Theme</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Theme">
            {options.map((option) => (
              <button
                key={option.value}
                role="radio"
                aria-checked={theme === option.value}
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border-2 p-5 text-center transition-all",
                  theme === option.value
                    ? "border-primary bg-accent shadow-glow"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <option.icon className="h-6 w-6" />
                <span className="text-sm font-semibold">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5 rounded-2xl shadow-soft">
        <CardContent className="p-6">
          <h2 className="font-display text-lg font-bold">Accent colour preview</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The application uses a pink-to-purple gradient accent throughout.
          </p>
          <div className="mt-4 space-y-3">
            <div className="gradient-primary h-14 rounded-2xl shadow-glow" aria-hidden="true" />
            <div className="flex gap-3">
              <div className="flex-1 rounded-xl bg-bubble-user p-3 text-center text-xs font-medium text-bubble-user-foreground">
                Pink — your messages
              </div>
              <div className="flex-1 rounded-xl bg-bubble-ai p-3 text-center text-xs font-medium text-bubble-ai-foreground">
                Purple — AI responses
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
