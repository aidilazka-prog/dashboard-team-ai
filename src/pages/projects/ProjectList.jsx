import { Link } from 'react-router-dom';
import { Plus, AlertTriangle, TrendingUp, Users, Calendar, Sparkles } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { TEAM_MEMBERS } from '../../data/team';
import { formatDate, formatCurrency } from '../../utils/dateUtils';
import './Projects.css';

const RISK_CONFIG = {
  low: { label: 'Low Risk', color: 'var(--accent-green)', bg: 'var(--accent-green-soft)' },
  medium: { label: 'Medium Risk', color: 'var(--accent-amber)', bg: 'var(--accent-amber-soft)' },
  high: { label: 'High Risk', color: 'var(--accent-red)', bg: 'var(--accent-red-soft)' },
};

export default function ProjectList() {
  return (
    <div className="projects">
      <div className="projects__header animate-slide-up">
        <div>
          <h1 className="projects__title">Projects</h1>
          <p className="text-sm text-secondary">{PROJECTS.length} active projects</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={15} /> New Project
        </button>
      </div>

      <div className="projects__grid">
        {PROJECTS.map((project, i) => {
          const risk = RISK_CONFIG[project.riskLevel];
          const owner = TEAM_MEMBERS.find(m => m.id === project.owner);
          const budgetPct = Math.round((project.budget.spent / project.budget.allocated) * 100);

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="project-card glass-card animate-slide-up"
              style={{ animationDelay: `${i * 80}ms`, textDecoration: 'none', color: 'inherit' }}
            >
              <div className="project-card__header">
                <div className="project-card__progress-ring">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="var(--bg-hover)" strokeWidth="4" />
                    <circle
                      cx="28" cy="28" r="24" fill="none"
                      stroke="var(--accent-blue)" strokeWidth="4"
                      strokeDasharray={`${project.progress * 1.508} ${150.8 - project.progress * 1.508}`}
                      strokeDashoffset="37.7"
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 0.6s ease' }}
                    />
                  </svg>
                  <span className="project-card__progress-text">{project.progress}%</span>
                </div>
                <span className="badge" style={{ background: risk.bg, color: risk.color }}>
                  {project.riskLevel === 'high' && <AlertTriangle size={11} style={{ marginRight: 3 }} />}
                  {risk.label}
                </span>
              </div>

              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__desc text-sm text-secondary">{project.description}</p>

              <div className="project-card__meta">
                <div className="project-card__meta-item">
                  <Calendar size={13} />
                  <span>{formatDate(project.startDate)} – {formatDate(project.endDate)}</span>
                </div>
              </div>

              <div className="project-card__milestones">
                {project.milestones.slice(0, 2).map(ms => (
                  <div key={ms.id} className="project-card__milestone">
                    <span className={`project-card__milestone-dot ${ms.status === 'completed' ? 'project-card__milestone-dot--done' : ''}`} />
                    <span className="text-sm">{ms.title}</span>
                    <span className="text-xs text-tertiary" style={{ marginLeft: 'auto' }}>{formatDate(ms.date)}</span>
                  </div>
                ))}
              </div>

              <div className="project-card__footer">
                <div className="project-card__team">
                  {project.team.slice(0, 3).map(memberId => {
                    const m = TEAM_MEMBERS.find(t => t.id === memberId);
                    return m ? (
                      <div key={m.id} className="project-card__avatar" style={{ background: m.color }} title={m.name}>
                        {m.initials}
                      </div>
                    ) : null;
                  })}
                  {project.team.length > 3 && (
                    <div className="project-card__avatar project-card__avatar--more">+{project.team.length - 3}</div>
                  )}
                </div>
                <div className="project-card__budget">
                  <div className="project-card__budget-bar">
                    <div
                      className="project-card__budget-fill"
                      style={{
                        width: `${budgetPct}%`,
                        background: budgetPct > 80 ? 'var(--accent-red)' : 'var(--accent-green)'
                      }}
                    />
                  </div>
                  <span className="text-xs text-tertiary">{formatCurrency(project.budget.spent)} / {formatCurrency(project.budget.allocated)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
