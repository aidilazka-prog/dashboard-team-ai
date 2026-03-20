import { Link } from 'react-router-dom';
import {
  CheckSquare, FolderKanban, Mic, Target, Sparkles,
  ArrowRight, TrendingUp, Clock, AlertTriangle
} from 'lucide-react';
import { TASKS, PRIORITY_CONFIG } from '../data/tasks';
import { PROJECTS } from '../data/projects';
import { MEETINGS } from '../data/meetings';
import { OKRS } from '../data/okrs';
import { TEAM_MEMBERS } from '../data/team';
import { getGreeting, getCurrentDate, formatDate, formatRelative } from '../utils/dateUtils';
import './Dashboard.css';

const ACTIVITIES = [
  { id: 1, user: 'u2', action: 'moved', target: '"Create Kanban board component"', detail: 'to Review', time: '2 min ago', icon: '📋' },
  { id: 2, user: 'u3', action: 'completed', target: '"Fix auth token refresh bug"', detail: '', time: '15 min ago', icon: '✅' },
  { id: 3, user: 'u4', action: 'uploaded', target: 'Dashboard wireframe v3', detail: '', time: '1 hour ago', icon: '📎' },
  { id: 4, user: 'u5', action: 'deployed', target: 'staging build #47', detail: '', time: '2 hours ago', icon: '🚀' },
  { id: 5, user: 'u1', action: 'created meeting', target: '"AI Integration Workshop"', detail: '', time: '3 hours ago', icon: '🎙️' },
];

export default function Dashboard() {
  const tasksToday = TASKS.filter(t => t.column !== 'done').length;
  const activeProjects = PROJECTS.filter(p => p.status === 'active').length;
  const upcomingMeetings = MEETINGS.filter(m => m.status === 'draft').length;
  const okrHealth = Math.round(OKRS.reduce((sum, o) => sum + o.progress, 0) / OKRS.length);

  const urgentTasks = TASKS
    .filter(t => t.column !== 'done' && t.priority === 'high')
    .slice(0, 4);

  return (
    <div className="dashboard">
      <div className="dashboard__header animate-slide-up">
        <div>
          <h1 className="dashboard__greeting">{getGreeting()}, Aidil 👋</h1>
          <p className="dashboard__date text-secondary">{getCurrentDate()}</p>
        </div>
        <Link to="/ai" className="btn btn-ai">
          <Sparkles size={16} />
          AI Assistant
        </Link>
      </div>

      <div className="dashboard__stats">
        <div className="stat-card glass-card animate-slide-up" style={{ animationDelay: '50ms' }}>
          <div className="stat-card__icon stat-card__icon--blue"><CheckSquare size={20} /></div>
          <div className="stat-card__info">
            <span className="stat-card__value">{tasksToday}</span>
            <span className="stat-card__label">Active Tasks</span>
          </div>
        </div>
        <div className="stat-card glass-card animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="stat-card__icon stat-card__icon--green"><FolderKanban size={20} /></div>
          <div className="stat-card__info">
            <span className="stat-card__value">{activeProjects}</span>
            <span className="stat-card__label">Active Projects</span>
          </div>
        </div>
        <div className="stat-card glass-card animate-slide-up" style={{ animationDelay: '150ms' }}>
          <div className="stat-card__icon stat-card__icon--amber"><Mic size={20} /></div>
          <div className="stat-card__info">
            <span className="stat-card__value">{upcomingMeetings}</span>
            <span className="stat-card__label">Upcoming Meetings</span>
          </div>
        </div>
        <div className="stat-card glass-card animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="stat-card__icon stat-card__icon--purple"><Target size={20} /></div>
          <div className="stat-card__info">
            <span className="stat-card__value">{okrHealth}%</span>
            <span className="stat-card__label">OKR Health</span>
          </div>
        </div>
      </div>

      <div className="dashboard__grid">
        <section className="dashboard__section animate-slide-up" style={{ animationDelay: '250ms' }}>
          <div className="dashboard__section-header">
            <h2>Priority Tasks</h2>
            <Link to="/kanban" className="dashboard__section-link">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="dashboard__tasks">
            {urgentTasks.map(task => {
              const assignee = TEAM_MEMBERS.find(m => m.id === task.assignee);
              const prio = PRIORITY_CONFIG[task.priority];
              return (
                <div key={task.id} className="dashboard__task-card glass-card">
                  <div className="dashboard__task-top">
                    <span className="badge" style={{ background: prio.bg, color: prio.color }}>
                      {prio.icon} {prio.label}
                    </span>
                    <span className="text-xs text-secondary">
                      <Clock size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                  <h3 className="dashboard__task-title">{task.title}</h3>
                  <div className="dashboard__task-bottom">
                    <div className="dashboard__task-tags">
                      {task.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="badge badge-blue">{tag}</span>
                      ))}
                    </div>
                    {assignee && (
                      <div className="dashboard__task-avatar" style={{ background: assignee.color }} title={assignee.name}>
                        {assignee.initials}
                      </div>
                    )}
                  </div>
                  {task.subtasks > 0 && (
                    <div className="dashboard__task-progress">
                      <div className="dashboard__task-progress-bar">
                        <div
                          className="dashboard__task-progress-fill"
                          style={{ width: `${(task.subtasksDone / task.subtasks) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-tertiary">{task.subtasksDone}/{task.subtasks}</span>
                    </div>
                  )}
                  {task.aiGenerated && (
                    <div className="dashboard__task-ai">
                      <Sparkles size={12} /> AI Generated
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="dashboard__section animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="dashboard__section-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="dashboard__activity">
            {ACTIVITIES.map(activity => {
              const user = TEAM_MEMBERS.find(m => m.id === activity.user);
              return (
                <div key={activity.id} className="dashboard__activity-item">
                  <div className="dashboard__activity-icon">{activity.icon}</div>
                  <div className="dashboard__activity-content">
                    <p className="dashboard__activity-text">
                      <strong>{user?.name?.split(' ')[0]}</strong> {activity.action} {activity.target}
                      {activity.detail && <span className="text-secondary"> {activity.detail}</span>}
                    </p>
                    <span className="text-xs text-tertiary">{activity.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="dashboard__ai-insight glass-card-static" style={{ marginTop: 'var(--sp-4)' }}>
            <div className="dashboard__ai-insight-header">
              <Sparkles size={16} className="dashboard__ai-insight-icon" />
              <span className="font-semibold">AI Insights</span>
            </div>
            <div className="dashboard__ai-insight-items">
              <div className="dashboard__ai-insight-item">
                <AlertTriangle size={14} color="var(--accent-amber)" />
                <span>3 tasks at risk of missing their deadlines</span>
              </div>
              <div className="dashboard__ai-insight-item">
                <TrendingUp size={14} color="var(--accent-green)" />
                <span>Team velocity increased 12% this sprint</span>
              </div>
              <div className="dashboard__ai-insight-item">
                <Clock size={14} color="var(--accent-blue)" />
                <span>Suggested: Reschedule "Database schema migration" to next week</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
