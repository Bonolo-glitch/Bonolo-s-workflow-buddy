# AI Workplace Productivity Assistant

A modern, responsive, AI-powered SaaS-style web application that helps professionals automate everyday workplace tasks. Built with a polished pink-to-purple visual identity, the app requires **no account or sign-in** and keeps all user data in memory only — nothing is stored on a server.

Live URL: https://swift-focus-ai-10.lovable.app

## Project Overview

The AI Workplace Productivity Assistant provides a friendly dashboard and three core AI tools designed to reduce busywork and improve communication:

- **Smart Email Generator** — quickly draft professional emails tailored by recipient, subject, purpose, tone, and length.
- **AI Chat Assistant** — ask a workplace-focused AI anything in real-time with streaming responses.
- **AI Research Assistant** — paste research, reports, or articles and get summaries, insights, and recommendations.

The application also includes dedicated **Help**, **About**, **Responsible AI**, and **Privacy Notice** pages to ensure transparency, ethical AI use, and user trust.

## Features Implemented

### Dashboard
- Hero section with a feature card grid
- Quick navigation to Email, Chat, Research, and Responsible AI tools
- Responsive layout with collapsible sidebar and mobile off-canvas support

### Smart Email Generator (`/email`)
- Form fields: recipient, subject, purpose, additional context, tone (Formal / Friendly / Persuasive), and length (Short / Medium / Long)
- One-click email generation via AI
- Editable output area with Copy, Regenerate, and Clear actions
- Toast notifications for feedback

### AI Chat Assistant (`/chat`)
- Streaming chat using `useChat` and `DefaultChatTransport`
- Suggested prompt cards to start conversations quickly
- Markdown-rendered AI responses
- Per-message actions: Copy, Edit, Regenerate
- Clear Chat button to reset the ephemeral conversation

### AI Research Assistant (`/research`)
- Single large input textarea
- Action buttons: Summarise, Generate Insights, Generate Recommendations, Clear
- Structured markdown output with headings and bullet points
- Copy, Regenerate, and Clear controls

### Static Content Pages
- **Responsible AI** — ethical usage guidance and no-storage guarantees
- **Help** — FAQ, getting started, tool guides, and troubleshooting
- **About** — mission, capabilities, version, and tech overview
- **Privacy Notice** — clear privacy commitments
- **Settings** — theme selection (Light / Dark / System) with accent preview

### Design & UX
- Pink-to-purple gradient design system using semantic CSS tokens
- Light and dark mode support
- Plus Jakarta Sans + Inter typography
- Subtle Motion animations for hero and card entrances
- Fully responsive sidebar, top bar, and footer

## Technologies and Tools Used

| Category | Technology |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start/) v1 (React 19 + full-stack SSR/SSG) |
| Build Tool | [Vite](https://vitejs.dev/) 8 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 + `tw-animate-css` |
| UI Components | shadcn/ui primitives via Radix UI |
| Animation | [Motion](https://motion.dev/) |
| AI / LLM | [Lovable AI Gateway](https://ai.gateway.lovable.dev) using `@ai-sdk/openai-compatible` and `google/gemini-3-flash-preview` |
| Chat Streaming | `ai` SDK (`streamText`, `toUIMessageStreamResponse`) + `@ai-sdk/react` |
| Markdown | `react-markdown` |
| Validation | `zod` |
| Notifications | `sonner` |
| Package Manager | [Bun](https://bun.sh/) |

## Setup Instructions

### Prerequisites
- [Bun](https://bun.sh/) installed locally
- A `LOVABLE_API_KEY` environment variable for AI generation (provided by the Lovable AI Gateway)

### 1. Clone / Open the Project

```bash
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root if it does not already exist, and add:

```env
LOVABLE_API_KEY=your_lovable_api_key_here
```

No database, Supabase keys, or auth providers are required.

### 3. Start the Development Server

```bash
bun dev
```

The app will be available at `http://localhost:8080`.

### 4. Build for Production

```bash
bun build
```

Preview the production build locally:

```bash
bun preview
```

### 5. Lint & Format

```bash
bun lint
bun format
```

## Project Structure

```
src/
  components/        # Shared UI components (AppSidebar, TopBar, AppFooter, Markdown)
  lib/               # Utilities, AI gateway helper, app info, theme provider
  routes/            # TanStack Start file-based routes
    api/chat.ts      # Streaming chat API endpoint
    api/generate.ts  # Non-streaming email/research generation endpoint
    __root.tsx       # Root layout and shell
    index.tsx        # Dashboard
    email.tsx        # Smart Email Generator
    chat.tsx         # AI Chat Assistant
    research.tsx     # AI Research Assistant
    ...
  styles.css         # Semantic design tokens and gradient theme
```

## Privacy & Security

- **No account required**: users can access the tools without registering or signing in.
- **No data persistence**: user inputs, generated emails, chat history, and research results are held only in React state and are lost on page refresh.
- **Only local storage write**: theme preference (light/dark/system) is saved via `localStorage` purely for appearance.
- **No database tables, no auth middleware, no cookies** for application data.

## License

This project is generated as a Lovable application and is intended for the creator's use. Refer to Lovable's terms for deployment and redistribution guidance.
