import { z } from 'zod';
import { fetchAllPages } from '../canvas/paginate.js';
import { CanvasFile } from '../schemas/canvas.js';
import { GetFilesInput } from '../schemas/tools.js';

export const getFilesSchema = GetFilesInput;

export const getFilesTool = {
  name: 'get_files',
  description: 'Get files uploaded to a Canvas course, with optional filename search.',
  inputSchema: getFilesSchema,
};

export async function getFilesHandler(
  input: z.infer<typeof getFilesSchema>
): Promise<string> {
  const params: Record<string, unknown> = { per_page: 50 };
  if (input.searchTerm) params['search_term'] = input.searchTerm;

  const raw = await fetchAllPages<unknown>(`/courses/${input.courseId}/files`, params);
  const files = raw.map((f) => CanvasFile.parse(f));

  if (files.length === 0) return 'No files found for this course.';

  return files
    .map((f) => {
      const sizeKb = (f.size / 1024).toFixed(1);
      return `**${f.display_name}** (${f.content_type}, ${sizeKb} KB)\n${f.url}`;
    })
    .join('\n\n');
}
