import 'dotenv/config';
import { canvasClient } from './canvas/client.js';
import { logger } from './utils/logger.js';
import { startServer } from './server.js';

// ──────────────────────────────────────────────
// Fail fast if required env vars are missing
// ──────────────────────────────────────────────

function validateEnv(): void {
  const required = ['CANVAS_BASE_URL', 'CANVAS_API_TOKEN'];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error(`[canvas-mcp] Missing required environment variables: ${missing.join(', ')}`);
    console.error('Copy .env.example to .env and fill in your Canvas credentials.');
    process.exit(1);
  }
}

// ──────────────────────────────────────────────
// Startup ping — verify the token works before serving
// ──────────────────────────────────────────────

async function pingCanvas(): Promise<void> {
  try {
    await canvasClient.get('/users/self');
    logger.info('Canvas API connection verified');
  } catch (error) {
    logger.error('Canvas API startup ping failed — check CANVAS_BASE_URL and CANVAS_API_TOKEN', {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

// ──────────────────────────────────────────────
// Boot
// ──────────────────────────────────────────────

const PORT = parseInt(process.env['PORT'] ?? '3000', 10);

if (process.env['USE_MOCK_DATA'] === 'true') {
  logger.info('Mock mode enabled — using sample Canvas data (no API key required)');
} else {
  validateEnv();
  await pingCanvas();
}

startServer(PORT);
