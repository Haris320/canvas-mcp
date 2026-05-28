# Canvas MCP

> Bring your Canvas LMS into Claude — assignments, grades, deadlines, and feedback, all in one place.

Canvas MCP is an open-source [Model Context Protocol](https://modelcontextprotocol.io) server that connects Claude to Canvas LMS. Students can ask Claude about their courses, track deadlines, review professor feedback, and plan their academic week — powered by live Canvas data.

[Claude Chat Link](https://claude.ai/share/83f9da15-d08c-4d82-a38b-542e532339dd)

<img width="1003" height="1199" alt="image" src="https://github.com/user-attachments/assets/e94edec4-c035-43fe-8d36-aef61ee5abad" />


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
| `get_discussions` | Course discussion topics and posts |
| `get_submissions` | Submission details for a specific assignment |
| `get_syllabus` | Course syllabus as plain text |
| `get_files` | Files uploaded to a course |
| `get_calendar_events` | Deadlines, exam dates, and course events in one feed |

---

## Getting started

### 1. Install dependencies

```bash
npm install
```


### 2. Configure environment

```bash
cp .env.example .env
```

**Option A — Mock mode (no Canvas account needed):**

Set `USE_MOCK_DATA=true` in your `.env`. The server will use built-in sample data for a fictional student so you can explore all tools immediately.

```env
USE_MOCK_DATA=true
PORT=3000
```

**Option B — Real Canvas data:**

Get your API token from Canvas: **Account → Settings → Approved Integrations → New Access Token**

```env
USE_MOCK_DATA=false
CANVAS_BASE_URL=https://youruni.instructure.com
CANVAS_API_TOKEN=your_token_here
PORT=3000
```

> Note: Some institutions disable student token generation. If you see "Your Canvas administrators have chosen to limit your ability to generate your own access token", use mock mode or contact your admin.

### 3. Start the server

```bash
npm run dev
```

The MCP endpoint is available at `http://localhost:3000/mcp`.

### 4. Connect to Claude

**Claude Code (CLI) — no HTTPS required:**

```bash
claude mcp add --transport http canvas-mcp http://localhost:3000/mcp
```

**Claude.ai (web) — requires a public HTTPS URL:**

Install and run [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/) to create a free tunnel:

```bash
# Windows
winget install Cloudflare.cloudflared

# Run the tunnel (in a separate terminal while the server is running)
cloudflared tunnel --url http://localhost:3000
```

Cloudflared will print a URL like `https://something.trycloudflare.com`. Go to **Claude.ai → Settings → Integrations → Add custom connector** and paste `https://something.trycloudflare.com/mcp`.

> The tunnel URL changes every time you restart cloudflared.

---

## Self-hosting

Deploy for free on [Railway](https://railway.app), [Fly.io](https://fly.io), or [Vercel](https://vercel.com) to get a permanent HTTPS URL for Claude.ai.

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
