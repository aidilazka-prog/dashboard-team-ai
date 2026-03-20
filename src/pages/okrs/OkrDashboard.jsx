import { Link } from 'react-router-dom';
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { OKRS } from '../../data/okrs';
import { TEAM_MEMBERS } from '../../data/team';
import './Okrs.css';

const STATUS_CONFIG = {
  'on-track': { label: 'On Track', color: 'var(--accent-green)', bg: 'var(--accent-green-soft)' },
  'at-risk': { label: 'At Risk', color: 'var(--accent-amber)', bg: 'var(--accent-amber-soft)' },
  'behind': { label: 'Behind', color: 'var(--accent-red)', bg: 'var(--accent-red-soft)' },
};

export default function OkrDashboard() {
  return (
    <div className="okrs">
      <div className="okrs__header animate-slide-up">
        <div>
          <h1 className="okrs__title">OKR Tracker</h1>
          <p className="text-sm text-secondary">Q1 2026 · {OKRS.length} objectives</p>
        </div>
        <button className="btn btn-primary">
          <Target size={15} /> New Objective
        </button>
      </div>

      <div className="okrs__grid">
        {OKRS.map((okr, i) => {
          const st = STATUS_CONFIG[okr.status];
          const owner = TEAM_MEMBERS.find(m => m.id === okr.owner);

          return (
            <div key={okr.id} className="okr-card glass-card animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="okr-card__header">
                <div className="okr-card__progress-ring">
                  <svg width="72" height="72" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="30" fill="none" stroke="var(--bg-hover)" strokeWidth="5" />
                    <circle
                      cx="36" cy="36" r="30" fill="none"
                      stroke={st.color} strokeWidth="5"
                      strokeDasharray={`${okr.progress * 1.885} ${188.5 - okr.progress * 1.885}`}
                      strokeDashoffset="47.1"
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 0.6s ease' }}
                    />
                  </svg>
                  <span className="okr-card__progress-text">{okr.progress}%</span>
                </div>
                <div className="okr-card__meta">
                  <span className="badge" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                  <div className="okr-card__ai-prob">
                    <Sparkles size={13} color="var(--accent-purple)" />
                    <span className="text-sm font-medium">{okr.aiProbability}% likely</span>
                  </div>
                </div>
              </div>

              <h3 className="okr-card__objective">{okr.objective}</h3>
              {owner && <span className="text-xs text-secondary">Owned by {owner.name}</span>}

              <div className="okr-card__key-results">
                {okr.keyResults.map(kr => {
                  const pct = Math.min(100, Math.round((kr.current / kr.target) * 100));
                  return (
                    <div key={kr.id} className="kr-item">
                      <div className="kr-item__header">
                        <span className="text-sm">{kr.title}</span>
                        <span className="text-xs text-secondary">{kr.current}/{kr.target}{kr.unit}</span>
                      </div>
                      <div className="kr-item__bar">
                        <div
                          className="kr-item__fill"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 70 ? 'var(--accent-green)' : pct >= 40 ? 'var(--accent-amber)' : 'var(--accent-red)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
