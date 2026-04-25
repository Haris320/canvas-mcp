import { z } from 'zod';
import { fetchAllPages } from '../canvas/paginate.js';
import { CanvasAnnouncement } from '../schemas/canvas.js';
import { GetAnnouncementsInput } from '../schemas/tools.js';
import { stripHtml } from '../utils/html.js';
import { formatDueDate } from '../utils/date.js';

export const getAnnouncementsSchema = GetAnnouncementsInput;

export const getAnnouncementsTool = {
  name: 'get_announcements',
  description: 'Get recent announcements for a Canvas course.',
  inputSchema: getAnnouncementsSchema,
};

export async function getAnnouncementsHandler(
  input: z.infer<typeof getAnnouncementsSchema>
): Promise<string> {
  const limit = input.limit ?? 10;

  const raw = await fetchAllPages<unknown>('/announcements', {
    context_codes: [`course_${input.courseId}`],
    per_page: limit,
  });

  const announcements = raw
    .slice(0, limit)
    .map((a) => CanvasAnnouncement.parse(a));

  if (announcements.length === 0) return 'No announcements found for this course.';

  return announcements
    .map((a) => {
      const body = a.message ? stripHtml(a.message).slice(0, 300) : '(no body)';
      const ellipsis = (a.message && stripHtml(a.message).length > 300) ? '…' : '';
      const date = a.posted_at ? formatDueDate(a.posted_at) : 'Unknown date';
      return [`**${a.title}**`, `Posted: ${date}`, body + ellipsis].join('\n');
    })
    .join('\n\n');
}
