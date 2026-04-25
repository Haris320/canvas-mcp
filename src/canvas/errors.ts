import type { AxiosError } from 'axios';

export class CanvasAuthError extends Error {
  readonly code = 'CANVAS_AUTH_ERROR' as const;
  constructor() {
    super('Canvas API token is invalid or expired.');
    this.name = 'CanvasAuthError';
  }
}

export class CanvasNotFoundError extends Error {
  readonly code = 'CANVAS_NOT_FOUND' as const;
  constructor(public readonly resource: string) {
    super(`Canvas resource not found: ${resource}`);
    this.name = 'CanvasNotFoundError';
  }
}

export class CanvasRateLimitError extends Error {
  readonly code = 'CANVAS_RATE_LIMIT' as const;
  constructor(public readonly retryAfter?: number) {
    super(`Canvas rate limit hit. Retry after ${retryAfter ?? 'unknown'} seconds.`);
    this.name = 'CanvasRateLimitError';
  }
}

export class CanvasApiError extends Error {
  readonly code = 'CANVAS_API_ERROR' as const;
  constructor(public readonly status: number, message: string) {
    super(`Canvas API error ${status}: ${message}`);
    this.name = 'CanvasApiError';
  }
}

export function mapCanvasError(error: AxiosError): never {
  const status = error.response?.status;
  const retryAfter = error.response?.headers?.['retry-after'];

  switch (status) {
    case 401:
      throw new CanvasAuthError();
    case 404:
      throw new CanvasNotFoundError(error.config?.url ?? 'unknown');
    case 429:
      throw new CanvasRateLimitError(
        retryAfter !== undefined ? Number(retryAfter) : undefined
      );
    default:
      throw new CanvasApiError(
        status ?? 0,
        error.message ?? 'Unknown error'
      );
  }
}
