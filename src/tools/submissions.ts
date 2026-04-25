import { z } from 'zod';
import { canvasClient } from '../canvas/client.js';
import { CanvasSubmission } from '../schemas/canvas.js';
import { GetSubmissionsInput } from '../schemas/tools.js';
import { formatDueDate } from '../utils/date.js';

export const getSubmissionsSchema = GetSubmissionsInput;

export const getSubmissionsTool = {
  name: 'get_submissions',
  description: 'Get your submission details for a specific assignment in a Canvas course.',
  inputSchema: getSubmissionsSchema,
};

export async function getSubmissionsHandler(
  input: z.infer<typeof getSubmissionsSchema>
): Promise<string> {
  const response = await canvasClient.get<unknown>(
    `/courses/${input.courseId}/assignments/${input.assignmentId}/submissions/self`
  );

  const submission = CanvasSubmission.parse(response.data);

  const lines = [
    `**Submission for assignment ${input.assignmentId}**`,
    `Status: ${submission.workflow_state}`,
    `Score: ${submission.score ?? 'Not graded'}`,
    `Submitted: ${submission.submitted_at ? formatDueDate(submission.submitted_at) : 'Not submitted'}`,
    submission.late ? '⚠ Late submission' : null,
    submission.missing ? '⚠ Missing' : null,
  ].filter(Boolean);

  if (submission.attachments && submission.attachments.length > 0) {
    lines.push(`\nAttachments:`);
    for (const att of submission.attachments) {
      lines.push(`  - ${att.filename}: ${att.url}`);
    }
  }

  return lines.join('\n');
}
