import { z } from 'zod';
import { fetchAllPages } from '../canvas/paginate.js';
import { CanvasCourse } from '../schemas/canvas.js';
import { GetCoursesInput } from '../schemas/tools.js';

export const getCoursesSchema = GetCoursesInput;

export const getCoursesTool = {
  name: 'get_courses',
  description: 'Get all Canvas courses you are enrolled in, with optional enrollment state filter.',
  inputSchema: getCoursesSchema,
};

export async function getCoursesHandler(
  input: z.infer<typeof getCoursesSchema>
): Promise<string> {
  const state = input.enrollmentState ?? 'active';

  const raw = await fetchAllPages<unknown>('/courses', {
    enrollment_state: state,
    include: ['total_scores', 'term'],
    per_page: 50,
  });

  const courses = raw.map((c) => CanvasCourse.parse(c));

  if (courses.length === 0) return `No ${state} courses found.`;

  return courses
    .map((c) => `**${c.name}** (${c.course_code}) — ID: ${c.id}`)
    .join('\n');
}
