import { z } from 'zod';
import { fetchAllPages } from '../canvas/paginate.js';
import { CanvasAssignment } from '../schemas/canvas.js';
import { GetAssignmentsInput } from '../schemas/tools.js';
import { formatDueDate } from '../utils/date.js';

export const getAssignmentsSchema = GetAssignmentsInput;

export const getAssignmentsTool = {
  name: 'get_assignments',
  description: 'Get all assignments for a Canvas course, with optional due date filters and submission status.',
  inputSchema: getAssignmentsSchema,
};

export async function getAssignmentsHandler(
  input: z.infer<typeof getAssignmentsSchema>
): Promise<string> {
  const raw = await fetchAllPages<unknown>(`/courses/${input.courseId}/assignments`, {
    include: ['submission'],
    order_by: 'due_at',
    per_page: 50,
  });

  const assignments = raw.map((a) => CanvasAssignment.parse(a));

  const filtered = assignments.filter((a) => {
    if (!a.due_at) return true;
    const due = new Date(a.due_at);
    if (input.dueAfter && due < new Date(input.dueAfter)) return false;
    if (input.dueBefore && due > new Date(input.dueBefore)) return false;
    return true;
  });

  if (filtered.length === 0) return 'No assignments found for the given filters.';

  return filtered
    .map((a) =>
      [
        `**${a.name}**`,
        `Due: ${a.due_at ? formatDueDate(a.due_at) : 'No due date'}`,
        `Points: ${a.points_possible ?? 'Ungraded'}`,
        `Status: ${a.submission?.workflow_state ?? 'not submitted'}`,
        a.submission?.score !== undefined && a.submission.score !== null
          ? `Score: ${a.submission.score}`
          : null,
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n\n');
}
