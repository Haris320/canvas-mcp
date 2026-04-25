# Canvas MCP

> Bring your Canvas LMS into Claude — assignments, grades, deadlines, and feedback, all in one place.

Canvas MCP is an open-source [Model Context Protocol](https://modelcontextprotocol.io) server that connects Claude to Canvas LMS. Students can ask Claude about their courses, track deadlines, review professor feedback, and plan their academic week — powered by live Canvas data.

---

## What you can do

Ask Claude things like:

- *"Plan my week — I have 3 assignments due and a midterm Friday"*
- *"Help me respond to the feedback on my essay in HIST 201"*
- *"What's my workload looking like for the next two weeks?"*
- *"Which assignments will impact my grade the most right now?"*

---

## Tools

| Tool | Description |
|---|---|
| `get_courses` | Active enrollments, syllabus, instructor info |
| `get_assignments` | Due dates, submission status, per-course filtering |
| `get_grades` | Current scores, submission feedback, grade breakdowns |
| `get_announcements` | Unread course announcements and discussion posts |
| `get_feedback` | Professor comments, rubric scores, submission history |
| `get_calendar` | Deadlines, exam dates, and course events in one feed |

---

## Getting started

### 1. Get your Canvas API token

1. Log into your Canvas account
2. Go to **Account → Settings → Approved Integrations**
3. Click **New Access Token** and copy the token

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
CANVAS_BASE_URL=https://youruni.instructure.com
CANVAS_API_TOKEN=your_token_here
PORT=3000
```

### 3. Install and run

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000/sse`.

### 4. Connect to Claude

Add the server URL to Claude's MCP settings:

```
http://localhost:3000/sse
```

---

## Multi-institution support

Each user can configure their own institution's Canvas URL (e.g. `mit.instructure.com`, `canvas.stanford.edu`). Tokens are passed per-request and never stored server-side.

---

## Self-hosting

Deploy for free on [Railway](https://railway.app), [Fly.io](https://fly.io), or [Vercel](https://vercel.com) — all have tiers accessible for students.

---

## Development

```bash
npm run dev      # watch mode
npm run build    # compile TypeScript
npm run check    # type-check only
```

**Stack:** Node.js · TypeScript · [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk) · Axios · Zod

---

## Privacy & security

- API tokens are never stored server-side — passed per-request only
- No Canvas data is persisted beyond the current session
- Designed with FERPA considerations in mind

---

## Contributing

Contributions welcome. Open an issue or PR — whether you're a student, developer, or university ambassador.

---

## License

MIT
