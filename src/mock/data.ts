// Fixture data for a fictional student at Westbrook University, Spring 2026

export const MOCK_USER = {
  id: 99001,
  name: 'Alex Johnson',
  login_id: 'ajohnson@westbrook.edu',
  email: 'ajohnson@westbrook.edu',
};

export const MOCK_COURSES = [
  {
    id: 1001,
    name: 'Data Structures & Algorithms',
    course_code: 'CS 301',
    enrollment_term_id: 20,
    workflow_state: 'available',
    enrollments: [{ type: 'student', enrollment_state: 'active' }],
  },
  {
    id: 1002,
    name: 'Calculus III',
    course_code: 'MATH 241',
    enrollment_term_id: 20,
    workflow_state: 'available',
    enrollments: [{ type: 'student', enrollment_state: 'active' }],
  },
  {
    id: 1003,
    name: 'Modern World History',
    course_code: 'HIST 201',
    enrollment_term_id: 20,
    workflow_state: 'available',
    enrollments: [{ type: 'student', enrollment_state: 'active' }],
  },
  {
    id: 1004,
    name: 'Academic Writing',
    course_code: 'ENGL 150',
    enrollment_term_id: 20,
    workflow_state: 'available',
    enrollments: [{ type: 'student', enrollment_state: 'active' }],
  },
];

export const MOCK_ASSIGNMENTS: Record<number, unknown[]> = {
  1001: [
    {
      id: 2001,
      name: 'Homework 4: Binary Trees',
      due_at: '2026-04-28T23:59:00Z',
      points_possible: 100,
      html_url: 'https://westbrook.instructure.com/courses/1001/assignments/2001',
      submission: { workflow_state: 'submitted', score: null },
    },
    {
      id: 2002,
      name: 'Lab 7: Graph Traversal',
      due_at: '2026-05-02T23:59:00Z',
      points_possible: 50,
      html_url: 'https://westbrook.instructure.com/courses/1001/assignments/2002',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
    {
      id: 2003,
      name: 'Midterm Exam',
      due_at: '2026-03-15T23:59:00Z',
      points_possible: 200,
      html_url: 'https://westbrook.instructure.com/courses/1001/assignments/2003',
      submission: { workflow_state: 'graded', score: 174 },
    },
    {
      id: 2004,
      name: 'Final Project: Algorithm Visualizer',
      due_at: '2026-05-10T23:59:00Z',
      points_possible: 150,
      html_url: 'https://westbrook.instructure.com/courses/1001/assignments/2004',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
  ],
  1002: [
    {
      id: 2101,
      name: 'Problem Set 8: Triple Integrals',
      due_at: '2026-04-29T23:59:00Z',
      points_possible: 80,
      html_url: 'https://westbrook.instructure.com/courses/1002/assignments/2101',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
    {
      id: 2102,
      name: 'Quiz 5: Vector Fields',
      due_at: '2026-04-27T23:59:00Z',
      points_possible: 30,
      html_url: 'https://westbrook.instructure.com/courses/1002/assignments/2102',
      submission: { workflow_state: 'graded', score: 26 },
    },
    {
      id: 2103,
      name: 'Midterm',
      due_at: '2026-03-12T23:59:00Z',
      points_possible: 150,
      html_url: 'https://westbrook.instructure.com/courses/1002/assignments/2103',
      submission: { workflow_state: 'graded', score: 132 },
    },
    {
      id: 2104,
      name: 'Final Exam',
      due_at: '2026-05-14T09:00:00Z',
      points_possible: 200,
      html_url: 'https://westbrook.instructure.com/courses/1002/assignments/2104',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
  ],
  1003: [
    {
      id: 2201,
      name: 'Essay: Causes of World War I',
      due_at: '2026-05-01T23:59:00Z',
      points_possible: 100,
      html_url: 'https://westbrook.instructure.com/courses/1003/assignments/2201',
      submission: { workflow_state: 'submitted', score: null },
    },
    {
      id: 2202,
      name: 'Reading Response 6',
      due_at: '2026-04-26T23:59:00Z',
      points_possible: 20,
      html_url: 'https://westbrook.instructure.com/courses/1003/assignments/2202',
      submission: { workflow_state: 'graded', score: 18 },
    },
    {
      id: 2203,
      name: 'Group Presentation: Cold War',
      due_at: '2026-05-07T14:00:00Z',
      points_possible: 75,
      html_url: 'https://westbrook.instructure.com/courses/1003/assignments/2203',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
  ],
  1004: [
    {
      id: 2301,
      name: 'Argumentative Essay Draft',
      due_at: '2026-04-30T23:59:00Z',
      points_possible: 50,
      html_url: 'https://westbrook.instructure.com/courses/1004/assignments/2301',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
    {
      id: 2302,
      name: 'Peer Review: Research Paper',
      due_at: '2026-05-03T23:59:00Z',
      points_possible: 25,
      html_url: 'https://westbrook.instructure.com/courses/1004/assignments/2302',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
    {
      id: 2303,
      name: 'Final Research Paper',
      due_at: '2026-05-12T23:59:00Z',
      points_possible: 150,
      html_url: 'https://westbrook.instructure.com/courses/1004/assignments/2303',
      submission: { workflow_state: 'unsubmitted', score: null },
    },
  ],
};

export const MOCK_ENROLLMENTS: Record<number, unknown[]> = {
  1001: [
    {
      id: 3001,
      course_id: 1001,
      type: 'StudentEnrollment',
      enrollment_state: 'active',
      grades: {
        current_score: 87.4,
        final_score: 87.4,
        current_grade: 'B+',
        final_grade: 'B+',
        html_url: 'https://westbrook.instructure.com/courses/1001/grades',
      },
    },
  ],
  1002: [
    {
      id: 3002,
      course_id: 1002,
      type: 'StudentEnrollment',
      enrollment_state: 'active',
      grades: {
        current_score: 91.2,
        final_score: 91.2,
        current_grade: 'A-',
        final_grade: 'A-',
        html_url: 'https://westbrook.instructure.com/courses/1002/grades',
      },
    },
  ],
  1003: [
    {
      id: 3003,
      course_id: 1003,
      type: 'StudentEnrollment',
      enrollment_state: 'active',
      grades: {
        current_score: 83.0,
        final_score: 83.0,
        current_grade: 'B',
        final_grade: 'B',
        html_url: 'https://westbrook.instructure.com/courses/1003/grades',
      },
    },
  ],
  1004: [
    {
      id: 3004,
      course_id: 1004,
      type: 'StudentEnrollment',
      enrollment_state: 'active',
      grades: {
        current_score: 78.5,
        final_score: 78.5,
        current_grade: 'C+',
        final_grade: 'C+',
        html_url: 'https://westbrook.instructure.com/courses/1004/grades',
      },
    },
  ],
};

export const MOCK_ANNOUNCEMENTS: Record<number, unknown[]> = {
  1001: [
    {
      id: 4001,
      title: 'Office Hours Moved This Week',
      message: '<p>Due to a department event, office hours on Thursday will be moved to 3–4 PM in Room 214. Please plan accordingly. Bring your questions about the upcoming lab on graph traversal.</p>',
      posted_at: '2026-04-24T10:00:00Z',
      author: { display_name: 'Prof. Sarah Chen' },
    },
    {
      id: 4002,
      title: 'Homework 4 Clarification',
      message: '<p>A few students have asked about problem 3b. You only need to implement an in-order traversal — pre-order and post-order are optional bonus. Good luck!</p>',
      posted_at: '2026-04-22T14:30:00Z',
      author: { display_name: 'Prof. Sarah Chen' },
    },
  ],
  1002: [
    {
      id: 4101,
      title: 'Final Exam Room Assignment',
      message: '<p>The final exam will be held in <strong>Hall B, Room 105</strong> on May 14th at 9:00 AM. You will have 2.5 hours. Bring a scientific calculator — no graphing calculators allowed.</p>',
      posted_at: '2026-04-23T09:00:00Z',
      author: { display_name: 'Prof. Marcus Webb' },
    },
  ],
  1003: [
    {
      id: 4201,
      title: 'Essay Submission Reminder',
      message: '<p>Just a reminder that the WWI essay is due May 1st at midnight. Please submit as a PDF through the portal. Late submissions will lose 10 points per day. Citations should follow Chicago style.</p>',
      posted_at: '2026-04-24T08:00:00Z',
      author: { display_name: 'Dr. Linda Park' },
    },
    {
      id: 4202,
      title: 'Guest Lecturer Next Tuesday',
      message: '<p>We are excited to welcome Dr. James Okafor, author of "The Cold War Revisited", who will be joining us on April 29th for a special lecture. Attendance is mandatory.</p>',
      posted_at: '2026-04-20T11:00:00Z',
      author: { display_name: 'Dr. Linda Park' },
    },
  ],
  1004: [
    {
      id: 4301,
      title: 'Feedback on Research Proposals',
      message: '<p>I have posted feedback on all research proposals in the gradebook. Please review my comments before submitting your first draft. Several proposals need a clearer thesis statement.</p>',
      posted_at: '2026-04-23T15:00:00Z',
      author: { display_name: 'Prof. Tom Rivera' },
    },
  ],
};

export const MOCK_DISCUSSIONS: Record<number, unknown[]> = {
  1001: [
    {
      id: 5001,
      title: 'Week 10 Discussion: Real-world Uses of Graph Algorithms',
      message: '<p>Discuss one real-world application of a graph algorithm we covered this week (BFS, DFS, Dijkstra). Provide a brief example and explain why that algorithm is well-suited for it.</p>',
      posted_at: '2026-04-21T09:00:00Z',
      discussion_type: 'threaded',
      author: { display_name: 'Prof. Sarah Chen' },
    },
  ],
  1003: [
    {
      id: 5201,
      title: 'Discussion: Should the Versailles Treaty be blamed for WWII?',
      message: '<p>After reading chapters 8–10, weigh in on whether the Treaty of Versailles was the primary cause of World War II. Respond to at least two classmates\' posts.</p>',
      posted_at: '2026-04-19T10:00:00Z',
      discussion_type: 'threaded',
      author: { display_name: 'Dr. Linda Park' },
    },
  ],
  1004: [
    {
      id: 5301,
      title: 'Introduction Thread: Research Paper Topics',
      message: '<p>Share your research paper topic and your working thesis statement. Give feedback to at least one peer on the clarity and arguability of their thesis.</p>',
      posted_at: '2026-04-15T08:00:00Z',
      discussion_type: 'threaded',
      author: { display_name: 'Prof. Tom Rivera' },
    },
  ],
};

export const MOCK_FILES: Record<number, unknown[]> = {
  1001: [
    {
      id: 6001,
      filename: 'CS301_Week10_Slides.pdf',
      display_name: 'Week 10 Lecture Slides — Graph Algorithms',
      url: 'https://westbrook.instructure.com/files/6001/download',
      size: 2457600,
      content_type: 'application/pdf',
      created_at: '2026-04-21T08:00:00Z',
    },
    {
      id: 6002,
      filename: 'CS301_HW4_Instructions.pdf',
      display_name: 'Homework 4 Instructions',
      url: 'https://westbrook.instructure.com/files/6002/download',
      size: 512000,
      content_type: 'application/pdf',
      created_at: '2026-04-20T10:00:00Z',
    },
    {
      id: 6003,
      filename: 'starter_code_lab7.zip',
      display_name: 'Lab 7 Starter Code',
      url: 'https://westbrook.instructure.com/files/6003/download',
      size: 102400,
      content_type: 'application/zip',
      created_at: '2026-04-22T09:00:00Z',
    },
  ],
  1002: [
    {
      id: 6101,
      filename: 'MATH241_Week10_Notes.pdf',
      display_name: 'Week 10 Notes — Stokes Theorem',
      url: 'https://westbrook.instructure.com/files/6101/download',
      size: 1843200,
      content_type: 'application/pdf',
      created_at: '2026-04-21T10:00:00Z',
    },
    {
      id: 6102,
      filename: 'practice_final.pdf',
      display_name: 'Practice Final Exam',
      url: 'https://westbrook.instructure.com/files/6102/download',
      size: 768000,
      content_type: 'application/pdf',
      created_at: '2026-04-23T09:00:00Z',
    },
  ],
  1003: [
    {
      id: 6201,
      filename: 'HIST201_Essay_Rubric.pdf',
      display_name: 'WWI Essay Grading Rubric',
      url: 'https://westbrook.instructure.com/files/6201/download',
      size: 307200,
      content_type: 'application/pdf',
      created_at: '2026-04-10T08:00:00Z',
    },
  ],
  1004: [
    {
      id: 6301,
      filename: 'ENGL150_Research_Paper_Guide.pdf',
      display_name: 'Research Paper Style Guide',
      url: 'https://westbrook.instructure.com/files/6301/download',
      size: 614400,
      content_type: 'application/pdf',
      created_at: '2026-04-01T09:00:00Z',
    },
  ],
};

export const MOCK_CALENDAR_EVENTS: unknown[] = [
  {
    id: 7001,
    title: 'CS 301 — Office Hours',
    start_at: '2026-04-28T15:00:00Z',
    end_at: '2026-04-28T16:00:00Z',
    context_code: 'course_1001',
    description: 'Moved to Room 214 this week.',
    location_name: 'Room 214, CS Building',
  },
  {
    id: 7002,
    title: 'HIST 201 — Guest Lecture: Dr. James Okafor',
    start_at: '2026-04-29T13:00:00Z',
    end_at: '2026-04-29T14:30:00Z',
    context_code: 'course_1003',
    description: 'Author of "The Cold War Revisited". Mandatory attendance.',
    location_name: 'Lecture Hall A',
  },
  {
    id: 7003,
    title: 'CS 301 — Lab 7 Due',
    start_at: '2026-05-02T23:59:00Z',
    end_at: null,
    context_code: 'course_1001',
    description: 'Graph Traversal Lab due by midnight.',
    location_name: null,
  },
  {
    id: 7004,
    title: 'ENGL 150 — Argumentative Essay Draft Due',
    start_at: '2026-04-30T23:59:00Z',
    end_at: null,
    context_code: 'course_1004',
    description: null,
    location_name: null,
  },
  {
    id: 7005,
    title: 'HIST 201 — Group Presentation',
    start_at: '2026-05-07T14:00:00Z',
    end_at: '2026-05-07T15:30:00Z',
    context_code: 'course_1003',
    description: 'Cold War group presentations.',
    location_name: 'Room 302, Humanities Building',
  },
  {
    id: 7006,
    title: 'CS 301 — Final Project Due',
    start_at: '2026-05-10T23:59:00Z',
    end_at: null,
    context_code: 'course_1001',
    description: 'Algorithm Visualizer project due.',
    location_name: null,
  },
  {
    id: 7007,
    title: 'ENGL 150 — Final Research Paper Due',
    start_at: '2026-05-12T23:59:00Z',
    end_at: null,
    context_code: 'course_1004',
    description: null,
    location_name: null,
  },
  {
    id: 7008,
    title: 'MATH 241 — Final Exam',
    start_at: '2026-05-14T09:00:00Z',
    end_at: '2026-05-14T11:30:00Z',
    context_code: 'course_1002',
    description: 'Hall B, Room 105. Scientific calculator allowed.',
    location_name: 'Hall B, Room 105',
  },
];

export const MOCK_SYLLABUSES: Record<number, unknown> = {
  1001: {
    id: 1001,
    name: 'Data Structures & Algorithms',
    syllabus_body: `<h2>CS 301 — Data Structures &amp; Algorithms</h2>
<p><strong>Instructor:</strong> Prof. Sarah Chen | <strong>Credits:</strong> 3 | <strong>Room:</strong> CS 101</p>
<h3>Course Description</h3>
<p>An in-depth study of data structures (arrays, linked lists, trees, heaps, graphs, hash tables) and algorithm design techniques including divide-and-conquer, dynamic programming, and greedy algorithms. Students will analyze time and space complexity using Big-O notation.</p>
<h3>Grading</h3>
<ul>
<li>Homeworks (8×): 30%</li>
<li>Labs (10×): 20%</li>
<li>Midterm Exam: 20%</li>
<li>Final Project: 20%</li>
<li>Participation: 10%</li>
</ul>
<h3>Policies</h3>
<p>Late submissions lose 10% per day. Academic integrity violations result in automatic course failure.</p>`,
  },
  1002: {
    id: 1002,
    name: 'Calculus III',
    syllabus_body: `<h2>MATH 241 — Calculus III</h2>
<p><strong>Instructor:</strong> Prof. Marcus Webb | <strong>Credits:</strong> 4 | <strong>Room:</strong> Math 220</p>
<h3>Course Description</h3>
<p>Multivariable calculus covering vectors, partial derivatives, multiple integrals, line integrals, surface integrals, and the theorems of Green, Stokes, and Gauss.</p>
<h3>Grading</h3>
<ul>
<li>Problem Sets (10×): 25%</li>
<li>Quizzes (6×): 15%</li>
<li>Midterm: 25%</li>
<li>Final Exam: 35%</li>
</ul>`,
  },
  1003: {
    id: 1003,
    name: 'Modern World History',
    syllabus_body: `<h2>HIST 201 — Modern World History</h2>
<p><strong>Instructor:</strong> Dr. Linda Park | <strong>Credits:</strong> 3 | <strong>Room:</strong> Humanities 302</p>
<h3>Course Description</h3>
<p>A survey of world history from 1900 to the present, covering major events including the World Wars, the Cold War, decolonization, and globalization. Emphasis on primary source analysis and essay writing.</p>
<h3>Grading</h3>
<ul>
<li>Reading Responses (8×): 20%</li>
<li>Essays (2×): 40%</li>
<li>Group Presentation: 15%</li>
<li>Midterm: 10%</li>
<li>Participation: 15%</li>
</ul>`,
  },
  1004: {
    id: 1004,
    name: 'Academic Writing',
    syllabus_body: `<h2>ENGL 150 — Academic Writing</h2>
<p><strong>Instructor:</strong> Prof. Tom Rivera | <strong>Credits:</strong> 3 | <strong>Room:</strong> Liberal Arts 104</p>
<h3>Course Description</h3>
<p>Develops students' academic writing skills through research, argumentation, and revision. Students will produce a full research paper over the course of the semester, with emphasis on thesis development, evidence integration, and citation.</p>
<h3>Grading</h3>
<ul>
<li>Weekly Responses: 15%</li>
<li>Argumentative Essay: 20%</li>
<li>Peer Review: 10%</li>
<li>Final Research Paper: 40%</li>
<li>Participation: 15%</li>
</ul>`,
  },
};

export const MOCK_SUBMISSIONS: Record<string, unknown> = {
  '1001_2001': {
    id: 8001,
    assignment_id: 2001,
    workflow_state: 'submitted',
    score: null,
    submitted_at: '2026-04-24T22:15:00Z',
    late: false,
    missing: false,
    body: null,
    url: null,
    attachments: [{ filename: 'hw4_binary_trees.pdf', url: 'https://westbrook.instructure.com/files/8001/download' }],
  },
  '1001_2003': {
    id: 8002,
    assignment_id: 2003,
    workflow_state: 'graded',
    score: 174,
    submitted_at: '2026-03-15T14:00:00Z',
    late: false,
    missing: false,
    body: null,
    url: null,
    attachments: [],
  },
  '1002_2102': {
    id: 8101,
    assignment_id: 2102,
    workflow_state: 'graded',
    score: 26,
    submitted_at: '2026-04-27T10:30:00Z',
    late: false,
    missing: false,
    body: null,
    url: null,
    attachments: [],
  },
};
