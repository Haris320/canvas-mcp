import axios, { type AxiosError } from 'axios';
import { logger } from '../utils/logger.js';
import { mapCanvasError } from './errors.js';
import { mockCanvasClient } from '../mock/client.js';

const USE_MOCK = process.env['USE_MOCK_DATA'] === 'true';

const CANVAS_BASE_URL = process.env['CANVAS_BASE_URL'];
const CANVAS_API_TOKEN = process.env['CANVAS_API_TOKEN'];

export interface CanvasResponse<T> {
  data: T;
  headers: Record<string, string | undefined>;
}

export interface CanvasClient {
  get<T = unknown>(
    url: string,
    config?: { params?: Record<string, unknown> }
  ): Promise<CanvasResponse<T>>;
}

const realClient = axios.create({
  baseURL: `${CANVAS_BASE_URL}/api/v1`,
  timeout: 10_000,
  headers: {
    Authorization: `Bearer ${CANVAS_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Log method + url at debug level — never log the auth header
realClient.interceptors.request.use((config) => {
  logger.debug('Canvas request', { method: config.method?.toUpperCase(), url: config.url });
  return config;
});

// Translate all HTTP errors into typed CanvasError subclasses
realClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => mapCanvasError(error)
);

export const canvasClient: CanvasClient = USE_MOCK
  ? mockCanvasClient
  : (realClient as unknown as CanvasClient);
