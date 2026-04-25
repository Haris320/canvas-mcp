import { z } from 'zod';
import { canvasClient } from '../canvas/client.js';
import { CanvasCourseWithSyllabus } from '../schemas/canvas.js';
import { GetSyllabusInput } from '../schemas/tools.js';
import { stripHtml } from '../utils/html.js';

export const getSyllabusSchema = GetSyllabusInput;

export const getSyllabusTool = {
  name: 'get_syllabus',
  description: 'Get the syllabus for a Canvas course as plain text.',
  inputSchema: getSyllabusSchema,
};

export async function getSyllabusHandler(
  input: z.infer<typeof getSyllabusSchema>
): Promise<string> {
  const response = await canvasClient.get<unknown>(`/courses/${input.courseId}`, {
    params: { include: ['syllabus_body'] },
  });

  const course = CanvasCourseWithSyllabus.parse(response.data);

  if (!course.syllabus_body) return `No syllabus found for course "${course.name}".`;

  const text = stripHtml(course.syllabus_body);
  return `**Syllabus: ${course.name}**\n\n${text}`;
}
