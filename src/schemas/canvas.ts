import { z } from 'zod';

// ──────────────────────────────────────────────
// Courses
// ──────────────────────────────────────────────

export const CanvasCourse = z.object({
  id: z.number(),
  name: z.string(),
  course_code: z.string(),
  enrollment_term_id: z.number(),
  workflow_state: z.string().optional(),
  enrollments: z.array(z.object({
    type: z.string(),
    enrollment_state: z.string(),
  })).optional(),
});
export type Course = z.infer<typeof CanvasCourse>;

// ──────────────────────────────────────────────
// Assignments
// ──────────────────────────────────────────────

export const CanvasSubmissionSummary = z.object({
  workflow_state: z.string(),
  score: z.number().nullable(),
});

export const CanvasAssignment = z.object({
  id: z.number(),
  name: z.string(),
  due_at: z.string().nullable(),
  points_possible: z.number().nullable(),
  html_url: z.string().optional(),
  submission: CanvasSubmissionSummary.optional(),
});
export type Assignment = z.infer<typeof CanvasAssignment>;

// ──────────────────────────────────────────────
// Grades / Enrollments
// ──────────────────────────────────────────────

export const CanvasGrades = z.object({
  html_url: z.string().optional(),
  current_score: z.number().nullable().optional(),
  final_score: z.number().nullable().optional(),
  current_grade: z.string().nullable().optional(),
  final_grade: z.string().nullable().optional(),
});

export const CanvasEnrollment = z.object({
  id: z.number(),
  course_id: z.number(),
  type: z.string(),
  enrollment_state: z.string(),
  grades: CanvasGrades.optional(),
});
export type Enrollment = z.infer<typeof CanvasEnrollment>;

// ──────────────────────────────────────────────
// Announcements
// ──────────────────────────────────────────────

export const CanvasAnnouncement = z.object({
  id: z.number(),
  title: z.string(),
  message: z.string().nullable(),
  posted_at: z.string().nullable(),
  author: z.object({ display_name: z.string() }).optional(),
});
export type Announcement = z.infer<typeof CanvasAnnouncement>;

// ──────────────────────────────────────────────
// Calendar Events
// ──────────────────────────────────────────────

export const CanvasCalendarEvent = z.object({
  id: z.number(),
  title: z.string(),
  start_at: z.string().nullable(),
  end_at: z.string().nullable(),
  context_code: z.string(),
  description: z.string().nullable().optional(),
  location_name: z.string().nullable().optional(),
});
export type CalendarEvent = z.infer<typeof CanvasCalendarEvent>;

// ──────────────────────────────────────────────
// Submissions
// ──────────────────────────────────────────────

export const CanvasSubmission = z.object({
  id: z.number(),
  assignment_id: z.number(),
  workflow_state: z.string(),
  score: z.number().nullable(),
  submitted_at: z.string().nullable(),
  late: z.boolean().optional(),
  missing: z.boolean().optional(),
  body: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  attachments: z.array(z.object({
    filename: z.string(),
    url: z.string(),
  })).optional(),
});
export type Submission = z.infer<typeof CanvasSubmission>;

// ──────────────────────────────────────────────
// Syllabus (returned inside a Course)
// ──────────────────────────────────────────────

export const CanvasCourseWithSyllabus = z.object({
  id: z.number(),
  name: z.string(),
  syllabus_body: z.string().nullable(),
});
export type CourseWithSyllabus = z.infer<typeof CanvasCourseWithSyllabus>;

// ──────────────────────────────────────────────
// Discussion Topics
// ──────────────────────────────────────────────

export const CanvasDiscussionTopic = z.object({
  id: z.number(),
  title: z.string(),
  message: z.string().nullable(),
  posted_at: z.string().nullable(),
  discussion_type: z.string().optional(),
  author: z.object({ display_name: z.string() }).optional(),
});
export type DiscussionTopic = z.infer<typeof CanvasDiscussionTopic>;

// ──────────────────────────────────────────────
// Files
// ──────────────────────────────────────────────

export const CanvasFile = z.object({
  id: z.number(),
  filename: z.string(),
  display_name: z.string(),
  url: z.string(),
  size: z.number(),
  content_type: z.string(),
  created_at: z.string(),
});
export type File = z.infer<typeof CanvasFile>;
