import { type ZodTypeAny } from 'zod';

import { getCoursesTool, getCoursesHandler } from './courses.js';
import { getAssignmentsTool, getAssignmentsHandler } from './assignments.js';
import { getGradesTool, getGradesHandler } from './grades.js';
import { getAnnouncementsTool, getAnnouncementsHandler } from './announcements.js';
import { getCalendarEventsTool, getCalendarEventsHandler } from './calendar.js';
import { getSubmissionsTool, getSubmissionsHandler } from './submissions.js';
import { getSyllabusTool, getSyllabusHandler } from './syllabus.js';
import { getDiscussionsTool, getDiscussionsHandler } from './discussions.js';
import { getFilesTool, getFilesHandler } from './files.js';

export interface ToolEntry {
  definition: {
    name: string;
    description: string;
    inputSchema: ZodTypeAny;
  };
  handler: (input: unknown) => Promise<string>;
}

export const tools: ToolEntry[] = [
  { definition: getCoursesTool,        handler: getCoursesHandler as (input: unknown) => Promise<string> },
  { definition: getAssignmentsTool,    handler: getAssignmentsHandler as (input: unknown) => Promise<string> },
  { definition: getGradesTool,         handler: getGradesHandler as (input: unknown) => Promise<string> },
  { definition: getAnnouncementsTool,  handler: getAnnouncementsHandler as (input: unknown) => Promise<string> },
  { definition: getCalendarEventsTool, handler: getCalendarEventsHandler as (input: unknown) => Promise<string> },
  { definition: getSubmissionsTool,    handler: getSubmissionsHandler as (input: unknown) => Promise<string> },
  { definition: getSyllabusTool,       handler: getSyllabusHandler as (input: unknown) => Promise<string> },
  { definition: getDiscussionsTool,    handler: getDiscussionsHandler as (input: unknown) => Promise<string> },
  { definition: getFilesTool,          handler: getFilesHandler as (input: unknown) => Promise<string> },
];
