import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Kanban, FolderKanban, Mic, MoreHorizontal } from 'lucide-react';
import './MobileTabBar.css';

const TABS = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/kanban', icon: Kanban, label: 'Kanban' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/meetings', icon: Mic, label: 'Meetings' },
  { to: '/okrs', icon: MoreHorizontal, label: 'More' },
];

export default function MobileTabBar() {
  return (
    <nav className="mobile-tab-bar">
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `mobile-tab-bar__item ${isActive ? 'mobile-tab-bar__item--active' : ''}`
          }
        >
          <tab.icon size={20} />
          <span className="mobile-tab-bar__label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
