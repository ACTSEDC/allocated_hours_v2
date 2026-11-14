import {
  Calendar,
  Clock,
  LayoutDashboard,
} from 'lucide-react';
import actsLogo from '../../acts logo png.png';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'hours', label: 'Hour Records', icon: Clock },
];

export default function Sidebar({ activePage, onPageChange, isLoading, hasRecord }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img className="brand-logo" src={actsLogo} alt="ACTS logo" />
        <div className="brand-copy">
          <span className="brand-title">ACTS</span>
          <span className="brand-tag">EDC</span>
        </div>
      </div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            onClick={() => onPageChange(id)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span className={`status-dot ${hasRecord ? 'online' : ''}`} />
        <span>{isLoading ? 'Loading...' : hasRecord ? 'Connected' : 'Search required'}</span>
      </div>
    </aside>
  );
}
