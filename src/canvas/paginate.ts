import { canvasClient } from './client.js';

// Canvas Link header format: <url>; rel="current", <url>; rel="next", <url>; rel="last"
export function parseLinkHeader(header: string | undefined): { next?: string } {
  if (!header) return {};

  for (const part of header.split(',')) {
    const match = part.trim().match(/^<([^>]+)>;\s*rel="next"$/);
    if (match?.[1]) return { next: match[1] };
  }

  return {};
}

export async function fetchAllPages<T>(
  url: string,
  params: Record<string, unknown> = {}
): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const response: { data: T[]; headers: Record<string, string | undefined> } = await canvasClient.get<T[]>(nextUrl, {
      // Only send params on the first request; subsequent URLs already embed them
      params: nextUrl === url ? params : {},
    });
    results.push(...response.data);
    nextUrl = parseLinkHeader(response.headers['link'])?.next ?? null;
  }

  return results;
}
