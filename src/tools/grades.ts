import { z } from 'zod';
import { fetchAllPages } from '../canvas/paginate.js';
import { CanvasEnrollment } from '../schemas/canvas.js';
import { GetGradesInput } from '../schemas/tools.js';

export const getGradesSchema = GetGradesInput;

export const getGradesTool = {
  name: 'get_grades',
  description: 'Get your current and final grades for a Canvas course.',
  inputSchema: getGradesSchema,
};

export async function getGradesHandler(
  input: z.infer<typeof getGradesSchema>
): Promise<string> {
  const raw = await fetchAllPages<unknown>(
    `/courses/${input.courseId}/enrollments`,
    {
      type: ['StudentEnrollment'],
      include: ['grades'],
      per_page: 50,
    }
  );

  const enrollments = raw.map((e) => CanvasEnrollment.parse(e));
  const enrollment = enrollments[0];

  if (!enrollment) return 'No enrollment found for this course.';

  const grades = enrollment.grades;
  if (!grades) return 'Grade information is not available for this course.';

  const lines = [
    `**Course grades (ID: ${input.courseId})**`,
    `Current score: ${grades.current_score ?? 'N/A'}`,
    `Current grade: ${grades.current_grade ?? 'N/A'}`,
    `Final score: ${grades.final_score ?? 'N/A'}`,
    `Final grade: ${grades.final_grade ?? 'N/A'}`,
  ];

  return lines.join('\n');
}
