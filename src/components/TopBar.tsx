import { Link } from "@tanstack/react-router";
import { Moon, Sun, LifeBuoy, Info, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/lib/theme";

export function TopBar() {
  const { resolved, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur-md sm:px-4">
      <SidebarTrigger aria-label="Toggle sidebar" />

      <Link to="/" className="flex min-w-0 items-center gap-2">
        <div className="gradient-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:hidden">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="truncate font-display text-sm font-bold sm:text-base">
          AI Workplace Productivity Assistant
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
        >
          {resolved === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" asChild aria-label="Help">
          <Link to="/help">
            <LifeBuoy className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild aria-label="About">
          <Link to="/about">
            <Info className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
