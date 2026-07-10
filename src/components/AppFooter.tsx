import { Link } from "@tanstack/react-router";

import { APP_VERSION } from "@/lib/app-info";

export function AppFooter() {
  return (
    <footer className="border-t px-4 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>
          AI Workplace Productivity Assistant · v{APP_VERSION} · ©{" "}
          {new Date().getFullYear()}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/privacy" className="hover:text-foreground">
            Privacy Notice
          </Link>
          <Link to="/responsible-ai" className="hover:text-foreground">
            Responsible AI
          </Link>
        </nav>
      </div>
    </footer>
  );
}
