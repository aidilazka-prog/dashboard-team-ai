import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Mic, Clock, Users, CheckSquare, FileText, Sparkles, Calendar } from 'lucide-react';
import { MEETINGS } from '../../data/meetings';
import { TEAM_MEMBERS } from '../../data/team';
import { formatDateTime, formatDuration, formatDate } from '../../utils/dateUtils';
import './Meetings.css';

export default function MeetingList() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? MEETINGS
    : MEETINGS.filter(m => m.status === activeTab);

  return (
    <div className="meetings">
      <div className="meetings__header animate-slide-up">
        <div>
          <h1 className="meetings__title">Meetings</h1>
          <p className="text-sm text-secondary">{MEETINGS.length} meetings recorded</p>
        </div>
        <div className="meetings__actions">
          <button className="btn btn-ai">
            <Sparkles size={15} /> Upload Recording
          </button>
          <button className="btn btn-primary">
            <Plus size={15} /> New Meeting
          </button>
        </div>
      </div>

      <div className="meetings__tabs">
        {['all', 'finalized', 'draft'].map(tab => (
          <button
            key={tab}
            className={`meetings__tab ${activeTab === tab ? 'meetings__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="meetings__tab-count">
              {tab === 'all' ? MEETINGS.length : MEETINGS.filter(m => m.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      <div className="meetings__list">
        {filtered.map((meeting, i) => {
          const totalActions = meeting.actionItems.length;
          const doneActions = meeting.actionItems.filter(a => a.status === 'done').length;

          return (
            <Link
              key={meeting.id}
              to={`/meetings/${meeting.id}`}
              className="meeting-card glass-card animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, textDecoration: 'none', color: 'inherit' }}
            >
              <div className="meeting-card__left">
                <div className={`meeting-card__icon ${meeting.status === 'draft' ? 'meeting-card__icon--draft' : ''}`}>
                  <Mic size={20} />
                </div>
              </div>

              <div className="meeting-card__content">
                <div className="meeting-card__top">
                  <h3>{meeting.title}</h3>
                  <span className={`badge ${meeting.status === 'finalized' ? 'badge-green' : 'badge-amber'}`}>
                    {meeting.status}
                  </span>
                </div>

                <div className="meeting-card__meta">
                  <span className="meeting-card__meta-item">
                    <Calendar size={13} /> {formatDateTime(meeting.date)}
                  </span>
                  <span className="meeting-card__meta-item">
                    <Clock size={13} /> {formatDuration(meeting.duration)}
                  </span>
                  <span className="meeting-card__meta-item">
                    <Users size={13} /> {meeting.attendees.length} attendees
                  </span>
                </div>

                {meeting.summary && (
                  <p className="meeting-card__summary text-sm text-secondary">{meeting.summary}</p>
                )}

                <div className="meeting-card__footer">
                  {totalActions > 0 && (
                    <span className="meeting-card__actions-count">
                      <CheckSquare size={13} /> {doneActions}/{totalActions} action items
                    </span>
                  )}
                  <div className="meeting-card__attendees">
                    {meeting.attendees.slice(0, 4).map(id => {
                      const m = TEAM_MEMBERS.find(t => t.id === id);
                      return m ? (
                        <div key={m.id} className="meeting-card__avatar" style={{ background: m.color }} title={m.name}>
                          {m.initials}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
