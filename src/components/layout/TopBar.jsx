import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu, Command } from 'lucide-react';
import { CURRENT_USER } from '../../data/team';
import './TopBar.css';

const ROUTE_NAMES = {
  '/': 'Dashboard',
  '/kanban': 'Kanban Board',
  '/projects': 'Projects',
  '/meetings': 'Meetings',
  '/okrs': 'OKRs',
  '/ai': 'AI Assistant',
  '/settings': 'Settings',
};

export default function TopBar({ onMenuClick }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const routeName = ROUTE_NAMES['/' + (pathSegments[0] || '')] || 'Dashboard';

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="topbar__menu-btn" onClick={onMenuClick} aria-label="Menu">
          <Menu size={20} />
        </button>
        <div className="topbar__breadcrumb">
          <span className="topbar__breadcrumb-item topbar__breadcrumb-item--muted">TeamAI</span>
          <span className="topbar__breadcrumb-sep">/</span>
          <span className="topbar__breadcrumb-item">{routeName}</span>
          {pathSegments.length > 1 && (
            <>
              <span className="topbar__breadcrumb-sep">/</span>
              <span className="topbar__breadcrumb-item">Detail</span>
            </>
          )}
        </div>
      </div>

      <div className="topbar__center">
        <div className="topbar__search">
          <Search size={16} className="topbar__search-icon" />
          <input
            type="text"
            placeholder="Search tasks, projects, meetings..."
            className="topbar__search-input"
          />
          <div className="topbar__search-shortcut">
            <Command size={11} />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="topbar__right">
        <button className="topbar__icon-btn" aria-label="Notifications">
          <Bell size={19} />
          <span className="topbar__notif-badge">3</span>
        </button>
        <div className="topbar__user">
          <div className="topbar__user-avatar" style={{ background: CURRENT_USER.color }}>
            {CURRENT_USER.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
