import { z } from 'zod';

export const GetCoursesInput = z.object({
  enrollmentState: z
    .enum(['active', 'completed', 'invited'])
    .optional()
    .describe('Filter courses by enrollment state (default: active)'),
});

export const GetAssignmentsInput = z.object({
  courseId: z.string().describe('The Canvas course ID'),
  dueBefore: z
    .string()
    .optional()
    .describe('ISO date string — only return assignments due before this date'),
  dueAfter: z
    .string()
    .optional()
    .describe('ISO date string — only return assignments due after this date'),
});

export const GetGradesInput = z.object({
  courseId: z.string().describe('The Canvas course ID'),
});

export const GetAnnouncementsInput = z.object({
  courseId: z.string().describe('The Canvas course ID'),
  limit: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Maximum number of announcements to return (default: 10)'),
});

export const GetCalendarEventsInput = z.object({
  startDate: z
    .string()
    .optional()
    .describe('ISO date string — start of the date range'),
  endDate: z
    .string()
    .optional()
    .describe('ISO date string — end of the date range'),
  contextCodes: z
    .array(z.string())
    .optional()
    .describe('Canvas context codes to filter by (e.g. ["course_123"])'),
});

export const GetSubmissionsInput = z.object({
  courseId: z.string().describe('The Canvas course ID'),
  assignmentId: z.string().describe('The Canvas assignment ID'),
});

export const GetSyllabusInput = z.object({
  courseId: z.string().describe('The Canvas course ID'),
});

export const GetDiscussionsInput = z.object({
  courseId: z.string().describe('The Canvas course ID'),
});

export const GetFilesInput = z.object({
  courseId: z.string().describe('The Canvas course ID'),
  searchTerm: z
    .string()
    .optional()
    .describe('Optional filename search term'),
});
