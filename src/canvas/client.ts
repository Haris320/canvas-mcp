import axios, { type AxiosError } from 'axios';
import { logger } from '../utils/logger.js';
import { mapCanvasError } from './errors.js';

const CANVAS_BASE_URL = process.env['CANVAS_BASE_URL'];
const CANVAS_API_TOKEN = process.env['CANVAS_API_TOKEN'];

export const canvasClient = axios.create({
  baseURL: `${CANVAS_BASE_URL}/api/v1`,
  timeout: 10_000,
  headers: {
    Authorization: `Bearer ${CANVAS_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Log method + url at debug level — never log the auth header
canvasClient.interceptors.request.use((config) => {
  logger.debug('Canvas request', { method: config.method?.toUpperCase(), url: config.url });
  return config;
});

// Translate all HTTP errors into typed CanvasError subclasses
canvasClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => mapCanvasError(error)
);
