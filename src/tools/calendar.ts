import { z } from 'zod';
import { fetchAllPages } from '../canvas/paginate.js';
import { CanvasCalendarEvent } from '../schemas/canvas.js';
import { GetCalendarEventsInput } from '../schemas/tools.js';
import { formatDueDate } from '../utils/date.js';

export const getCalendarEventsSchema = GetCalendarEventsInput;

export const getCalendarEventsTool = {
  name: 'get_calendar_events',
  description: 'Get upcoming calendar events across all your courses, with optional date range and course filters.',
  inputSchema: getCalendarEventsSchema,
};

export async function getCalendarEventsHandler(
  input: z.infer<typeof getCalendarEventsSchema>
): Promise<string> {
  const params: Record<string, unknown> = { per_page: 50 };
  if (input.startDate) params['start_date'] = input.startDate;
  if (input.endDate) params['end_date'] = input.endDate;
  if (input.contextCodes && input.contextCodes.length > 0) {
    params['context_codes[]'] = input.contextCodes;
  }

  const raw = await fetchAllPages<unknown>('/calendar_events', params);
  const events = raw.map((e) => CanvasCalendarEvent.parse(e));

  if (events.length === 0) return 'No calendar events found for the given filters.';

  const sorted = [...events].sort((a, b) => {
    const ta = a.start_at ? new Date(a.start_at).getTime() : 0;
    const tb = b.start_at ? new Date(b.start_at).getTime() : 0;
    return ta - tb;
  });

  return sorted
    .map((e) => {
      const start = e.start_at ? formatDueDate(e.start_at) : 'No date';
      const end = e.end_at ? ` → ${formatDueDate(e.end_at)}` : '';
      const location = e.location_name ? `\nLocation: ${e.location_name}` : '';
      return `**${e.title}**\n${start}${end}${location}\nContext: ${e.context_code}`;
    })
    .join('\n\n');
}
