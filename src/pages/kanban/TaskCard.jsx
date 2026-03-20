import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Sparkles, Clock } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/team';
import { PRIORITY_CONFIG } from '../../data/tasks';
import { formatDate, isOverdue } from '../../utils/dateUtils';

export default function TaskCard({ task, isDragOverlay }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const assignee = TEAM_MEMBERS.find(m => m.id === task.assignee);
  const prio = PRIORITY_CONFIG[task.priority];
  const overdue = isOverdue(task.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? 'task-card--dragging' : ''} ${isDragOverlay ? 'task-card--overlay' : ''}`}
    >
      <div className="task-card__header">
        <span className="badge" style={{ background: prio.bg, color: prio.color }}>
          {prio.icon} {prio.label}
        </span>
        {task.aiGenerated && (
          <span className="task-card__ai" title="AI Generated">
            <Sparkles size={13} />
          </span>
        )}
      </div>
      <h4 className="task-card__title">{task.title}</h4>
      <div className="task-card__tags">
        {task.tags.map(tag => (
          <span key={tag} className="badge badge-blue">{tag}</span>
        ))}
      </div>
      <div className="task-card__footer">
        {task.subtasks > 0 && (
          <div className="task-card__progress">
            <div className="task-card__progress-bar">
              <div
                className="task-card__progress-fill"
                style={{ width: `${(task.subtasksDone / task.subtasks) * 100}%` }}
              />
            </div>
            <span className="text-xs text-tertiary">{task.subtasksDone}/{task.subtasks}</span>
          </div>
        )}
        {assignee && (
          <div className="task-card__assignee" style={{ background: assignee.color }} title={assignee.name}>
            {assignee.initials}
          </div>
        )}
      </div>
      {task.dueDate && (
        <div className={`task-card__due ${overdue ? 'task-card__due--overdue' : ''}`}>
          <Clock size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />
          {formatDate(task.dueDate)}
        </div>
      )}
    </div>
  );
}
