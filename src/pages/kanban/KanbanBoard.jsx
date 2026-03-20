import { useState } from 'react';
import { DndContext, closestCorners, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Filter, SortAsc, LayoutGrid, List, Sparkles, Plus } from 'lucide-react';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import { COLUMNS, TASKS as INITIAL_TASKS } from '../../data/tasks';
import { TEAM_MEMBERS } from '../../data/team';
import './KanbanBoard.css';

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeTask, setActiveTask] = useState(null);
  const [viewMode, setViewMode] = useState('board');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(event) {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const taskId = active.id;
    let newColumn = over.id;

    // If dropped on a task, find that task's column
    const overTask = tasks.find(t => t.id === over.id);
    if (overTask) {
      newColumn = overTask.column;
    }

    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, column: newColumn } : t))
    );
  }

  const getColumnTasks = (columnId) => tasks.filter(t => t.column === columnId);

  const handleAddTask = () => {
    const newTask = {
      id: `t${Date.now()}`,
      title: 'New Task',
      description: 'Click to edit description',
      column: 'todo',
      priority: 'medium',
      assignee: 'u2',
      tags: ['new'],
      subtasks: 0,
      subtasksDone: 0,
      dueDate: new Date().toISOString().split('T')[0],
      aiGenerated: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <div className="kanban">
      <div className="kanban__header animate-slide-up">
        <div>
          <h1 className="kanban__title">Kanban Board</h1>
          <p className="text-sm text-secondary">{tasks.length} tasks across {COLUMNS.length} columns</p>
        </div>
        <div className="kanban__actions">
          <button className="btn btn-secondary">
            <Filter size={15} /> Filter
          </button>
          <button className="btn btn-secondary">
            <SortAsc size={15} /> Sort
          </button>
          <div className="kanban__view-toggle">
            <button
              className={`kanban__view-btn ${viewMode === 'board' ? 'kanban__view-btn--active' : ''}`}
              onClick={() => setViewMode('board')}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              className={`kanban__view-btn ${viewMode === 'list' ? 'kanban__view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={15} />
            </button>
          </div>
          <button className="btn btn-ai">
            <Sparkles size={15} /> AI Create Task
          </button>
          <button className="btn btn-primary" onClick={handleAddTask}>
            <Plus size={15} /> Add Task
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban__board animate-fade-in">
          {COLUMNS.map(column => {
            const columnTasks = getColumnTasks(column.id);
            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                count={columnTasks.length}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskCard task={activeTask} isDragOverlay />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
