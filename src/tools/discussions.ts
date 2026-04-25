import { z } from 'zod';
import { fetchAllPages } from '../canvas/paginate.js';
import { CanvasDiscussionTopic } from '../schemas/canvas.js';
import { GetDiscussionsInput } from '../schemas/tools.js';
import { stripHtml } from '../utils/html.js';
import { formatDueDate } from '../utils/date.js';

export const getDiscussionsSchema = GetDiscussionsInput;

export const getDiscussionsTool = {
  name: 'get_discussions',
  description: 'Get discussion topics for a Canvas course.',
  inputSchema: getDiscussionsSchema,
};

export async function getDiscussionsHandler(
  input: z.infer<typeof getDiscussionsSchema>
): Promise<string> {
  const raw = await fetchAllPages<unknown>(
    `/courses/${input.courseId}/discussion_topics`,
    { per_page: 50 }
  );

  const topics = raw.map((t) => CanvasDiscussionTopic.parse(t));

  if (topics.length === 0) return 'No discussion topics found for this course.';

  return topics
    .map((t) => {
      const preview = t.message ? stripHtml(t.message).slice(0, 200) : '(no description)';
      const ellipsis = t.message && stripHtml(t.message).length > 200 ? '…' : '';
      const date = t.posted_at ? formatDueDate(t.posted_at) : 'Unknown date';
      const author = t.author?.display_name ? ` by ${t.author.display_name}` : '';
      return [`**${t.title}**`, `Posted: ${date}${author}`, preview + ellipsis].join('\n');
    })
    .join('\n\n');
}
