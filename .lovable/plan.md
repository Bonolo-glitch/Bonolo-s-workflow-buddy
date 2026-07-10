# AI Workplace Productivity Assistant — Build Plan

A privacy-first, no-login SaaS with a pink→purple aesthetic. All AI runs through Lovable AI Gateway. Nothing is persisted — no database, no auth, no history. State lives only in React memory for the session.

## Design system (src/styles.css)

- Palette: pink (`oklch(0.70 0.20 0)` range) → purple (`oklch(0.55 0.24 300)`) gradient tokens.
- Tokens: `--gradient-primary`, `--gradient-subtle`, `--shadow-soft`, `--shadow-glow`, rounded-2xl defaults.
- Typography: Plus Jakarta Sans (display) + Inter (body), loaded via `<link>` in `__root.tsx`.
- Full light + dark theme variants using semantic tokens (no hardcoded colors in components).
- Subtle animations via tw-animate-css + Motion for hero/card entrances.

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx              → shell + SidebarProvider + Toaster + head metadata + fonts
  index.tsx               → Dashboard (hero + 4 feature cards)
  email.tsx               → Smart Email Generator
  chat.tsx                → AI Chat Assistant
  research.tsx            → AI Research Assistant
  responsible-ai.tsx      → Responsible AI info
  help.tsx                → Help + FAQ + troubleshooting
  about.tsx               → About + version + tech overview
  settings.tsx            → Appearance only (theme + accent preview)
  privacy.tsx             → Privacy Notice
  api/chat.ts             → Streaming chat endpoint (useChat transport)
  api/generate.ts         → Non-streaming endpoint for email + research (JSON in/out)
```

Each page defines its own `head()` with unique title/description/og tags.

## Layout

- `AppSidebar` (shadcn sidebar, `collapsible="icon"`): Dashboard, Email, Chat, Research, Responsible AI, Help, About, Settings, Privacy. Active-route highlighting via `useRouterState`.
- Top bar: logo + title + `SidebarTrigger` + theme toggle + Help/About icon links. No profile, no auth.
- Footer: name, version, privacy link, responsible AI link, copyright.
- Mobile: sidebar becomes offcanvas via built-in shadcn behavior.

## Feature 1 — Smart Email Generator (`/email`)

- Form: recipient (optional), subject, purpose, additional context, tone (Formal/Friendly/Persuasive), length (Short/Medium/Long).
- Generate button → POST `/api/generate` with `{ kind: "email", ...fields }`.
- Output: editable `<Textarea>` (large), Copy / Regenerate / Clear buttons with sonner toasts.
- Loading skeleton while generating.

## Feature 2 — AI Chat Assistant (`/chat`)

- `useChat` + `DefaultChatTransport({ api: "/api/chat" })`.
- Streaming responses via `streamText` + `toUIMessageStreamResponse`.
- User bubbles pink, AI bubbles purple, markdown rendered with `react-markdown`.
- Suggested prompt cards (5 examples) that populate composer.
- Per-message actions: Copy, Regenerate (resends prior user turn), Edit (local only).
- Clear Chat button resets in-memory state. No thread routing — single ephemeral conversation.

## Feature 3 — AI Research Assistant (`/research`)

- Single large textarea + 4 action buttons: Summarise, Generate Insights, Generate Recommendations, Clear.
- Each action POSTs `/api/generate` with `{ kind: "research", mode, input }`.
- Structured output rendered with markdown headings/bullets: Summary, Key Insights, Recommendations, Takeaways.
- Editable result area, Copy / Regenerate / Clear.

## Static content pages

- **Responsible AI**: bullet list of usage guidance + no-storage guarantees.
- **Help**: sectioned accordion (Getting Started, each tool, FAQ, Troubleshooting, placeholder contact).
- **About**: mission, capabilities, version (`1.0.0`), tech overview (React + TanStack Start + Lovable AI), responsible-AI statement.
- **Settings**: theme radio group (Light / Dark / System) with live accent gradient preview swatch. Persists to `localStorage` only for theme preference (appearance only, non-personal) — acceptable since spec says "no user credentials/conversations/generated content".
- **Privacy Notice**: verbatim privacy commitments from spec.

## AI backend (Lovable AI Gateway)

- Provider helper in `src/lib/ai-gateway.server.ts` using `@ai-sdk/openai-compatible` + `LOVABLE_API_KEY` header.
- Model: `google/gemini-3-flash-preview` for both chat streaming and email/research generation (fast, multimodal-capable, low cost).
- Chat route: `streamText` with system prompt from spec.
- Generate route (`/api/generate`): `generateText` with tailored system prompts per kind/mode; returns `{ text }`.
- Enable Lovable Cloud for `LOVABLE_API_KEY` provisioning (no DB tables created).
- Error handling: surface 402/429/500 as sonner toasts.

## Privacy guarantees in code

- No Supabase tables, no auth middleware, no cookies for app data.
- All tool state via `useState`; wiped on refresh.
- Only `localStorage` write is theme preference (documented in Privacy Notice as appearance-only).

## Technical notes

- Add `bun add motion react-markdown` for animations and markdown rendering.
- Fonts loaded via `<link>` in root head; families registered in `@theme` block.
- All new colors as semantic tokens in `src/styles.css` — no hex/tailwind color utilities in components.
- Head metadata: real title/description on every route; og:image omitted (hosting injects).
