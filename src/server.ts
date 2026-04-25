import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { InitializeRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ZodError } from 'zod';
import { tools } from './tools/index.js';
import { logger } from './utils/logger.js';
import {
  CanvasAuthError,
  CanvasNotFoundError,
  CanvasRateLimitError,
  CanvasApiError,
} from './canvas/errors.js';

// ──────────────────────────────────────────────
// MCP server instance
// ──────────────────────────────────────────────

const mcpServer = new McpServer({
  name: 'canvas-mcp',
  version: '1.0.0',
});

// Register each tool via the v2 registerTool API
for (const { definition, handler } of tools) {
  mcpServer.registerTool(
    definition.name,
    {
      description: definition.description,
      inputSchema: definition.inputSchema,
    },
    async (input: Record<string, unknown>) => {
      try {
        const result = await handler(input);
        return { content: [{ type: 'text' as const, text: result }] };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: formatErrorForClaude(error) }],
          isError: true,
        };
      }
    }
  );
}

// ──────────────────────────────────────────────
// Error formatting — never expose stack traces to Claude
// ──────────────────────────────────────────────

function formatErrorForClaude(error: unknown): string {
  if (error instanceof CanvasAuthError) {
    return 'Your Canvas API token appears to be invalid or expired. Go to Canvas → Account → Settings → Approved Integrations to generate a new token.';
  }
  if (error instanceof CanvasNotFoundError) {
    return `Could not find ${error.resource} in Canvas. The course or item may not exist or you may not have access.`;
  }
  if (error instanceof CanvasRateLimitError) {
    return `Canvas is rate limiting requests right now. Please wait ${error.retryAfter ?? 60} seconds and try again.`;
  }
  if (error instanceof ZodError) {
    return `Invalid input: ${error.errors.map((e) => e.message).join(', ')}`;
  }
  if (error instanceof CanvasApiError) {
    return `Canvas returned an error (${error.status}). This is usually a temporary issue — try again in a moment.`;
  }
  // Log real error server-side; return safe message to Claude
  logger.error('Unhandled error in tool handler', {
    error: error instanceof Error ? error.message : String(error),
  });
  return 'Something went wrong fetching your Canvas data. Check that your token and Canvas URL are correct.';
}

// ──────────────────────────────────────────────
// HTTP server with Streamable HTTP transport
// Sessions are tracked by Mcp-Session-Id header
// ──────────────────────────────────────────────

const transports = new Map<string, StreamableHTTPServerTransport>();

function setCorsHeaders(res: ServerResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Mcp-Session-Id, Authorization');
  res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204).end();
    return;
  }

  if (req.url !== '/mcp') {
    res.writeHead(404).end('Not found');
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405).end('Method not allowed');
    return;
  }

  // Read request body
  const body = await new Promise<string>((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: Buffer) => { data += chunk.toString(); });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    res.writeHead(400).end('Invalid JSON');
    return;
  }

  const sessionId = req.headers['mcp-session-id'];
  const existingSessionId = Array.isArray(sessionId) ? sessionId[0] : sessionId;

  if (existingSessionId && transports.has(existingSessionId)) {
    // Reuse existing session transport
    const transport = transports.get(existingSessionId)!;
    await transport.handleRequest(req, res, parsed);
    return;
  }

  // New session — must be an initialize request
  const isInit = InitializeRequestSchema.safeParse(parsed).success;
  if (!isInit) {
    res.writeHead(400).end('Expected initialize request for new session');
    return;
  }

  const newSessionId = randomUUID();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => newSessionId,
    onsessioninitialized: (sid) => {
      transports.set(sid, transport);
      logger.info('MCP session started', { sessionId: sid });
    },
  });

  transport.onclose = () => {
    transports.delete(newSessionId);
    logger.info('MCP session closed', { sessionId: newSessionId });
  };

  await mcpServer.connect(transport);
  await transport.handleRequest(req, res, parsed);
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

export function startServer(port: number): void {
  const httpServer = createServer((req, res) => {
    handleRequest(req, res).catch((err: unknown) => {
      logger.error('Unhandled request error', {
        error: err instanceof Error ? err.message : String(err),
      });
      if (!res.headersSent) res.writeHead(500).end('Internal server error');
    });
  });

  httpServer.listen(port, () => {
    logger.info('Canvas MCP server listening', { port, endpoint: `http://localhost:${port}/mcp` });
  });
}
