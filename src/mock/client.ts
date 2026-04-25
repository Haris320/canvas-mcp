import type { CanvasClient, CanvasResponse } from '../canvas/client.js';
import {
  MOCK_USER,
  MOCK_COURSES,
  MOCK_ASSIGNMENTS,
  MOCK_ENROLLMENTS,
  MOCK_ANNOUNCEMENTS,
  MOCK_CALENDAR_EVENTS,
  MOCK_DISCUSSIONS,
  MOCK_FILES,
  MOCK_SYLLABUSES,
  MOCK_SUBMISSIONS,
} from './data.js';

function mockResponse<T>(data: unknown): Promise<CanvasResponse<T>> {
  return Promise.resolve({ data: data as T, headers: {} });
}

function extractCourseId(url: string): number {
  const match = url.match(/\/courses\/(\d+)/);
  return match?.[1] ? parseInt(match[1], 10) : 0;
}

export const mockCanvasClient: CanvasClient = {
  get<T = unknown>(url: string, config?: { params?: Record<string, unknown> }): Promise<CanvasResponse<T>> {
    // /users/self — startup ping
    if (url === '/users/self') {
      return mockResponse(MOCK_USER);
    }

    // /courses — list all courses
    if (url === '/courses') {
      return mockResponse(MOCK_COURSES);
    }

    // /courses/:id/assignments
    if (/\/courses\/\d+\/assignments$/.test(url)) {
      const id = extractCourseId(url);
      return mockResponse(MOCK_ASSIGNMENTS[id] ?? []);
    }

    // /courses/:id/enrollments
    if (/\/courses\/\d+\/enrollments$/.test(url)) {
      const id = extractCourseId(url);
      return mockResponse(MOCK_ENROLLMENTS[id] ?? []);
    }

    // /announcements (uses context_codes param, not course in URL)
    if (url === '/announcements') {
      const contextCodes = config?.params?.['context_codes'];
      const courseId = Array.isArray(contextCodes)
        ? parseInt(String(contextCodes[0]).replace('course_', ''), 10)
        : 0;
      return mockResponse(MOCK_ANNOUNCEMENTS[courseId] ?? []);
    }

    // /calendar_events
    if (url === '/calendar_events') {
      return mockResponse(MOCK_CALENDAR_EVENTS);
    }

    // /courses/:id/discussion_topics
    if (/\/courses\/\d+\/discussion_topics$/.test(url)) {
      const id = extractCourseId(url);
      return mockResponse(MOCK_DISCUSSIONS[id] ?? []);
    }

    // /courses/:id/files
    if (/\/courses\/\d+\/files$/.test(url)) {
      const id = extractCourseId(url);
      return mockResponse(MOCK_FILES[id] ?? []);
    }

    // /courses/:id/assignments/:aid/submissions/self
    const submissionMatch = url.match(/\/courses\/(\d+)\/assignments\/(\d+)\/submissions\/self/);
    if (submissionMatch?.[1] && submissionMatch[2]) {
      const key = `${submissionMatch[1]}_${submissionMatch[2]}`;
      return mockResponse(
        MOCK_SUBMISSIONS[key] ?? {
          id: 0,
          assignment_id: parseInt(submissionMatch[2], 10),
          workflow_state: 'unsubmitted',
          score: null,
          submitted_at: null,
          late: false,
          missing: true,
        }
      );
    }

    // /courses/:id (syllabus — single object, not a list)
    if (/\/courses\/\d+$/.test(url)) {
      const id = extractCourseId(url);
      return mockResponse(MOCK_SYLLABUSES[id] ?? null);
    }

    return mockResponse<T>([]);
  },
};
