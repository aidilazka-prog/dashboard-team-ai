export const COLUMNS = [
  { id: 'backlog', title: 'Backlog', color: 'var(--text-tertiary)' },
  { id: 'todo', title: 'To Do', color: 'var(--accent-blue)' },
  { id: 'in-progress', title: 'In Progress', color: 'var(--accent-amber)' },
  { id: 'review', title: 'Review', color: 'var(--accent-purple)' },
  { id: 'done', title: 'Done', color: 'var(--accent-green)' },
];

export const TASKS = [
  {
    id: 't1', title: 'Design dashboard wireframe', description: 'Create low-fidelity wireframes for the main dashboard view',
    column: 'done', priority: 'high', assignee: 'u4', tags: ['design', 'ui'],
    subtasks: 4, subtasksDone: 4, dueDate: '2026-03-15', aiGenerated: false,
  },
  {
    id: 't2', title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment',
    column: 'in-progress', priority: 'high', assignee: 'u5', tags: ['devops', 'infra'],
    subtasks: 3, subtasksDone: 1, dueDate: '2026-03-22', aiGenerated: false,
  },
  {
    id: 't3', title: 'Implement auth API endpoints', description: 'Build login, register, and token refresh endpoints',
    column: 'in-progress', priority: 'high', assignee: 'u3', tags: ['backend', 'auth'],
    subtasks: 5, subtasksDone: 3, dueDate: '2026-03-20', aiGenerated: false,
  },
  {
    id: 't4', title: 'Create Kanban board component', description: 'Build the drag-and-drop Kanban board with column management',
    column: 'review', priority: 'medium', assignee: 'u2', tags: ['frontend', 'kanban'],
    subtasks: 6, subtasksDone: 5, dueDate: '2026-03-21', aiGenerated: false,
  },
  {
    id: 't5', title: 'AI task suggestion algorithm', description: 'Develop ML model for smart task prioritization and assignment',
    column: 'todo', priority: 'high', assignee: 'u3', tags: ['ai', 'backend'],
    subtasks: 4, subtasksDone: 0, dueDate: '2026-03-28', aiGenerated: true,
  },
  {
    id: 't6', title: 'Mobile responsive layout', description: 'Ensure all views work on mobile devices with touch interactions',
    column: 'todo', priority: 'medium', assignee: 'u2', tags: ['frontend', 'mobile'],
    subtasks: 3, subtasksDone: 0, dueDate: '2026-03-25', aiGenerated: false,
  },
  {
    id: 't7', title: 'Meeting recording integration', description: 'Add audio upload and transcription pipeline for meeting minutes',
    column: 'backlog', priority: 'medium', assignee: 'u3', tags: ['backend', 'ai'],
    subtasks: 5, subtasksDone: 0, dueDate: '2026-04-05', aiGenerated: true,
  },
  {
    id: 't8', title: 'OKR progress dashboard', description: 'Build circular progress rings and key result tracking view',
    column: 'backlog', priority: 'low', assignee: 'u2', tags: ['frontend', 'okr'],
    subtasks: 3, subtasksDone: 0, dueDate: '2026-04-10', aiGenerated: false,
  },
  {
    id: 't9', title: 'User onboarding flow', description: 'Design and implement first-time user onboarding experience',
    column: 'todo', priority: 'low', assignee: 'u4', tags: ['design', 'ux'],
    subtasks: 4, subtasksDone: 0, dueDate: '2026-03-30', aiGenerated: true,
  },
  {
    id: 't10', title: 'Database schema migration', description: 'Update PostgreSQL schema to support OKR and meeting modules',
    column: 'backlog', priority: 'high', assignee: 'u3', tags: ['backend', 'database'],
    subtasks: 2, subtasksDone: 0, dueDate: '2026-03-26', aiGenerated: false,
  },
  {
    id: 't11', title: 'Notification system', description: 'Build real-time notification service with WebSocket support',
    column: 'review', priority: 'medium', assignee: 'u5', tags: ['backend', 'infra'],
    subtasks: 4, subtasksDone: 3, dueDate: '2026-03-19', aiGenerated: false,
  },
  {
    id: 't12', title: 'Write API documentation', description: 'Document all REST endpoints with Swagger/OpenAPI spec',
    column: 'todo', priority: 'low', assignee: 'u3', tags: ['docs', 'backend'],
    subtasks: 2, subtasksDone: 0, dueDate: '2026-04-01', aiGenerated: true,
  },
];

export const PRIORITY_CONFIG = {
  high: { label: 'High', color: 'var(--accent-red)', bg: 'var(--accent-red-soft)', icon: '🔴' },
  medium: { label: 'Medium', color: 'var(--accent-amber)', bg: 'var(--accent-amber-soft)', icon: '🟡' },
  low: { label: 'Low', color: 'var(--accent-green)', bg: 'var(--accent-green-soft)', icon: '🟢' },
};
