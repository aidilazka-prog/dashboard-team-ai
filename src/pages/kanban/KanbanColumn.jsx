import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

export default function KanbanColumn({ column, tasks, count }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="kanban-column" style={{ borderTopColor: isOver ? column.color : undefined }}>
      <div className="kanban-column__header">
        <div className="kanban-column__title-row">
          <div className="kanban-column__dot" style={{ background: column.color }} />
          <span className="kanban-column__title">{column.title}</span>
          <span className="kanban-column__count">{count}</span>
        </div>
        <button className="kanban-column__add" aria-label="Add task">
          <Plus size={16} />
        </button>
      </div>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className="kanban-column__tasks"
          style={{ background: isOver ? 'var(--bg-hover)' : undefined }}
        >
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
