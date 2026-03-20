import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, TrendingUp, AlertTriangle, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { PROJECTS, GANTT_ITEMS } from '../../data/projects';
import { TEAM_MEMBERS } from '../../data/team';
import { formatDate, formatCurrency } from '../../utils/dateUtils';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];
  const owner = TEAM_MEMBERS.find(m => m.id === project.owner);
  const gantt = GANTT_ITEMS.filter(g => g.projectId === project.id);

  return (
    <div className="project-detail animate-fade-in">
      <Link to="/projects" className="project-detail__back">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div className="project-detail__header">
        <div>
          <h1>{project.name}</h1>
          <p className="text-secondary">{project.description}</p>
        </div>
        <button className="btn btn-ai">
          <Sparkles size={15} /> AI Forecast
        </button>
      </div>

      <div className="project-detail__info-grid">
        <div className="project-detail__info glass-card-static">
          <Calendar size={16} className="text-secondary" />
          <div>
            <div className="text-xs text-tertiary">Timeline</div>
            <div className="text-sm font-medium">{formatDate(project.startDate)} – {formatDate(project.endDate)}</div>
          </div>
        </div>
        <div className="project-detail__info glass-card-static">
          <Users size={16} className="text-secondary" />
          <div>
            <div className="text-xs text-tertiary">Team</div>
            <div className="text-sm font-medium">{project.team.length} members</div>
          </div>
        </div>
        <div className="project-detail__info glass-card-static">
          <TrendingUp size={16} className="text-secondary" />
          <div>
            <div className="text-xs text-tertiary">Progress</div>
            <div className="text-sm font-medium">{project.progress}%</div>
          </div>
        </div>
        <div className="project-detail__info glass-card-static">
          <AlertTriangle size={16} className="text-secondary" />
          <div>
            <div className="text-xs text-tertiary">Budget Used</div>
            <div className="text-sm font-medium">{formatCurrency(project.budget.spent)}</div>
          </div>
        </div>
      </div>

      <section className="project-detail__section">
        <h2>Timeline</h2>
        <div className="gantt">
          <div className="gantt__labels">
            {gantt.map(item => (
              <div key={item.id} className="gantt__label text-sm">{item.title}</div>
            ))}
          </div>
          <div className="gantt__chart">
            {gantt.map(item => {
              const startOffset = Math.max(0, (new Date(item.start) - new Date('2026-02-01')) / (1000 * 60 * 60 * 24));
              const duration = (new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24);
              const totalDays = 150;
              return (
                <div key={item.id} className="gantt__row">
                  <div
                    className="gantt__bar"
                    style={{
                      left: `${(startOffset / totalDays) * 100}%`,
                      width: `${(duration / totalDays) * 100}%`,
                      background: item.color,
                    }}
                    title={`${item.title}: ${item.progress}%`}
                  >
                    <div className="gantt__bar-fill" style={{ width: `${item.progress}%`, opacity: 0.3 }} />
                    <span className="gantt__bar-text">{item.progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="project-detail__section">
        <h2>Milestones</h2>
        <div className="project-detail__milestones">
          {project.milestones.map(ms => (
            <div key={ms.id} className="milestone-card glass-card-static">
              <div className="milestone-card__icon">
                {ms.status === 'completed' ? (
                  <CheckCircle2 size={20} color="var(--accent-green)" />
                ) : (
                  <Clock size={20} color="var(--accent-amber)" />
                )}
              </div>
              <div className="milestone-card__info">
                <h4>{ms.title}</h4>
                <span className="text-sm text-secondary">{formatDate(ms.date)}</span>
              </div>
              <div className="milestone-card__progress">
                <div className="milestone-card__progress-bar">
                  <div className="milestone-card__progress-fill" style={{ width: `${ms.progress}%` }} />
                </div>
                <span className="text-xs text-tertiary">{ms.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
