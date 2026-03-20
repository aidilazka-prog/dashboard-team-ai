import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Kanban, FolderKanban, Mic, Target,
  Sparkles, Settings, ChevronLeft, ChevronRight, Users
} from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/team';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/kanban', icon: Kanban, label: 'Kanban', badge: 12 },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/meetings', icon: Mic, label: 'Meetings', badge: 2 },
  { to: '/okrs', icon: Target, label: 'OKRs' },
  { to: '/ai', icon: Sparkles, label: 'AI Assistant' },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <Sparkles size={20} />
          </div>
          {!collapsed && <span className="sidebar__logo-text">TeamAI</span>}
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} className="sidebar__link-icon" />
            {!collapsed && (
              <>
                <span className="sidebar__link-label">{item.label}</span>
                {item.badge && (
                  <span className="sidebar__badge">{item.badge}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        {!collapsed && (
          <div className="sidebar__team">
            <div className="sidebar__team-label">
              <Users size={14} />
              <span>Team Online</span>
            </div>
            <div className="sidebar__team-avatars">
              {TEAM_MEMBERS.slice(0, 4).map(member => (
                <div
                  key={member.id}
                  className="sidebar__avatar"
                  style={{ background: member.color }}
                  title={member.name}
                >
                  {member.initials}
                </div>
              ))}
              {TEAM_MEMBERS.length > 4 && (
                <div className="sidebar__avatar sidebar__avatar--more">
                  +{TEAM_MEMBERS.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
          }
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={20} className="sidebar__link-icon" />
          {!collapsed && <span className="sidebar__link-label">Settings</span>}
        </NavLink>

        <button className="sidebar__toggle" onClick={onToggle} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
