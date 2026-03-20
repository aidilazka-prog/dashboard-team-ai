import { User, Bell, Shield, Palette, Globe, Moon, ChevronRight } from 'lucide-react';
import './Settings.css';
import { CURRENT_USER } from '../../data/team';

const SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Profile Settings', desc: 'Manage your name, avatar, and role' },
      { icon: Bell, label: 'Notifications', desc: 'Configure email and push notifications' },
      { icon: Shield, label: 'Privacy & Security', desc: 'Two-factor authentication, data export' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Palette, label: 'Appearance', desc: 'Theme, colors, and display density' },
      { icon: Globe, label: 'Language & Region', desc: 'Timezone: UTC+7 (Cikarang Utara, Indonesia)' },
      { icon: Moon, label: 'Working Hours', desc: 'Set your available hours for scheduling' },
    ],
  },
];

export default function Settings() {
  return (
    <div className="settings animate-fade-in">
      <h1 className="settings__title">Settings</h1>

      <div className="settings__profile glass-card-static">
        <div className="settings__profile-avatar" style={{ background: CURRENT_USER.color }}>
          {CURRENT_USER.initials}
        </div>
        <div className="settings__profile-info">
          <h3>{CURRENT_USER.name}</h3>
          <span className="text-sm text-secondary">{CURRENT_USER.role}</span>
        </div>
        <button className="btn btn-secondary">Edit Profile</button>
      </div>

      {SECTIONS.map(section => (
        <section key={section.title} className="settings__section">
          <h2 className="settings__section-title">{section.title}</h2>
          <div className="settings__list glass-card-static">
            {section.items.map((item, i) => (
              <button key={i} className="settings__item">
                <div className="settings__item-icon">
                  <item.icon size={18} />
                </div>
                <div className="settings__item-info">
                  <span className="settings__item-label">{item.label}</span>
                  <span className="settings__item-desc text-sm text-secondary">{item.desc}</span>
                </div>
                <ChevronRight size={16} className="text-tertiary" />
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
