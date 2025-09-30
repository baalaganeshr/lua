import React from 'react';
import { useVisibility } from '@utilities/visibilityProvider';
import './Header.scss';

interface HeaderProps {
  serverName: string;
  onlineCount: number;
  maxPlayers: number;
}

export const Header: React.FC<HeaderProps> = ({ serverName, onlineCount, maxPlayers }) => {
  const { setVisible } = useVisibility();

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="server-brand">
            <div className="server-logo">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="server-info">
              <h1 className="server-name">{serverName}</h1>
              <div className="server-status">
                <div className="status-dot online"></div>
                <span className="status-text">Online</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <div className="player-count">
            <div className="count-display">
              <span className="current">{onlineCount}</span>
              <span className="separator">/</span>
              <span className="max">{maxPlayers}</span>
            </div>
            <span className="count-label">Players Online</span>
          </div>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <button className="action-btn" title="Minimize">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13H5v-2h14v2z"/>
              </svg>
            </button>
            <button className="action-btn close-btn" onClick={handleClose} title="Close">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
