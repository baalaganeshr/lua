import React, { useState } from 'react';
import './Navigation.scss';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z' },
  { id: 'players', label: 'Players', icon: 'M16,4C18.11,4 19.8,5.69 19.8,7.8C19.8,9.91 18.11,11.6 16,11.6C13.89,11.6 12.2,9.91 12.2,7.8C12.2,5.69 13.89,4 16,4M16,13.4C18.78,13.4 24,14.79 24,17.6V20H8V17.6C8,14.79 13.22,13.4 16,13.4Z', badge: 42 },
  { id: 'info', label: 'Server Info', icon: 'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' }
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''} ${hoveredTab === item.id ? 'hovered' : ''}`}
            onClick={() => onTabChange(item.id)}
            onMouseEnter={() => setHoveredTab(item.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="nav-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d={item.icon} />
              </svg>
            </div>
            <span className="nav-label">{item.label}</span>
            {item.badge && (
              <div className="nav-badge">
                {item.badge}
              </div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
