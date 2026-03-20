import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, CheckCircle2, Circle, ExternalLink, Sparkles } from 'lucide-react';
import { MEETINGS } from '../../data/meetings';
import { TEAM_MEMBERS } from '../../data/team';
import { formatDateTime, formatDuration, formatDate } from '../../utils/dateUtils';
import { useState } from 'react';

export default function MeetingDetail() {
  const { id } = useParams();
  const meeting = MEETINGS.find(m => m.id === id) || MEETINGS[0];
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = ['summary', 'action-items', 'transcript'];

  return (
    <div className="meeting-detail animate-fade-in">
      <Link to="/meetings" className="project-detail__back">
        <ArrowLeft size={16} /> Back to Meetings
      </Link>

      <div className="meetings__header">
        <div>
          <h1 className="meetings__title">{meeting.title}</h1>
          <div className="meeting-card__meta" style={{ marginTop: 8 }}>
            <span className="meeting-card__meta-item"><Calendar size={13} /> {formatDateTime(meeting.date)}</span>
            <span className="meeting-card__meta-item"><Clock size={13} /> {formatDuration(meeting.duration)}</span>
            <span className="meeting-card__meta-item"><Users size={13} /> {meeting.attendees.length} attendees</span>
          </div>
        </div>
        <div className="meetings__actions">
          <button className="btn btn-ai"><Sparkles size={15} /> Resummarize</button>
        </div>
      </div>

      <div className="meeting-detail__attendees">
        {meeting.attendees.map(aId => {
          const m = TEAM_MEMBERS.find(t => t.id === aId);
          return m ? (
            <div key={m.id} className="meeting-detail__attendee">
              <div className="meeting-card__avatar" style={{ background: m.color, marginLeft: 0, border: 'none' }}>{m.initials}</div>
              <span className="text-sm">{m.name}</span>
            </div>
          ) : null;
        })}
      </div>

      <div className="meetings__tabs" style={{ marginTop: 'var(--sp-4)' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`meetings__tab ${activeTab === tab ? 'meetings__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="meeting-detail__content glass-card-static" style={{ padding: 'var(--sp-5)', marginTop: 'var(--sp-4)' }}>
        {activeTab === 'summary' && (
          <div className="animate-fade-in">
            {meeting.summary ? (
              <>
                <h3 style={{ marginBottom: 'var(--sp-3)' }}>AI Summary</h3>
                <p className="text-secondary" style={{ lineHeight: 1.7, marginBottom: 'var(--sp-5)' }}>{meeting.summary}</p>
                <h3 style={{ marginBottom: 'var(--sp-3)' }}>Key Decisions</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {meeting.decisions.map((d, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-2)' }}>
                      <CheckCircle2 size={16} color="var(--accent-green)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span className="text-sm">{d}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--sp-10)' }}>
                <Sparkles size={32} color="var(--accent-purple)" style={{ marginBottom: 'var(--sp-3)' }} />
                <p className="text-secondary">Upload a recording or paste notes to generate an AI summary</p>
                <button className="btn btn-ai" style={{ marginTop: 'var(--sp-4)' }}>
                  <Sparkles size={15} /> Generate Summary
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'action-items' && (
          <div className="animate-fade-in">
            {meeting.actionItems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {meeting.actionItems.map(item => {
                  const owner = TEAM_MEMBERS.find(m => m.id === item.owner);
                  return (
                    <div key={item.id} style={{
                      display: 'flex', alignItems: 'center', gap: 'var(--sp-3)',
                      padding: 'var(--sp-3)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)'
                    }}>
                      {item.status === 'done' ? (
                        <CheckCircle2 size={18} color="var(--accent-green)" />
                      ) : (
                        <Circle size={18} color="var(--text-tertiary)" />
                      )}
                      <div style={{ flex: 1 }}>
                        <p className="text-sm font-medium" style={{ textDecoration: item.status === 'done' ? 'line-through' : 'none', opacity: item.status === 'done' ? 0.6 : 1 }}>
                          {item.text}
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-1)' }}>
                          <span className="text-xs text-tertiary">{owner?.name}</span>
                          <span className="text-xs text-tertiary">Due: {formatDate(item.dueDate)}</span>
                        </div>
                      </div>
                      <span className={`badge ${item.status === 'done' ? 'badge-green' : item.status === 'in-progress' ? 'badge-amber' : 'badge-blue'}`}>
                        {item.status}
                      </span>
                      {item.linkedTask && (
                        <Link to="/kanban" className="btn btn-ghost" style={{ padding: 'var(--sp-1)' }}>
                          <ExternalLink size={14} />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-secondary" style={{ textAlign: 'center', padding: 'var(--sp-8)' }}>
                No action items yet. Generate from the meeting summary.
              </p>
            )}
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="animate-fade-in">
            {meeting.transcript ? (
              <div className="text-sm text-secondary" style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                {meeting.transcript}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--sp-10)' }}>
                <p className="text-secondary">No transcript available. Upload a recording to transcribe.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
