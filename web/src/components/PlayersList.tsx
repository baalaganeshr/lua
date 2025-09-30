import React, { useState } from 'react';
import './PlayersList.scss';

interface Player {
  id: number;
  name: string;
  level: number;
  job: string;
  ping: number;
  playtime: string;
  isVip: boolean;
  status: 'online' | 'away' | 'busy';
}

interface PlayersListProps {
  maxPlayers: number;
}

const mockPlayers: Player[] = [
  { id: 1, name: 'John_Doe', level: 45, job: 'Police Officer', ping: 35, playtime: '4h 32m', isVip: true, status: 'online' },
  { id: 2, name: 'Jane_Smith', level: 67, job: 'Doctor', ping: 42, playtime: '2h 15m', isVip: false, status: 'online' },
  { id: 3, name: 'Mike_Johnson', level: 23, job: 'Mechanic', ping: 58, playtime: '1h 45m', isVip: true, status: 'away' },
  { id: 4, name: 'Sarah_Wilson', level: 89, job: 'Business Owner', ping: 28, playtime: '6h 22m', isVip: true, status: 'online' },
  { id: 5, name: 'Alex_Brown', level: 34, job: 'Taxi Driver', ping: 48, playtime: '3h 10m', isVip: false, status: 'busy' },
  { id: 6, name: 'Lisa_Davis', level: 56, job: 'Lawyer', ping: 33, playtime: '2h 55m', isVip: false, status: 'online' },
];

export const PlayersList: React.FC<PlayersListProps> = ({ maxPlayers }) => {
  const [players] = useState<Player[]>(mockPlayers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'ping' | 'playtime'>('name');

  const filteredPlayers = players
    .filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.job.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'level':
          return b.level - a.level;
        case 'ping':
          return a.ping - b.ping;
        case 'playtime':
          return b.playtime.localeCompare(a.playtime);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getStatusColor = (status: Player['status']) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'away': return '#f59e0b';
      case 'busy': return '#ef4444';
    }
  };

  const getPingColor = (ping: number) => {
    if (ping < 50) return '#10b981';
    if (ping < 100) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="players-list">
      <div className="players-header">
        <div className="header-top">
          <h2 className="players-title">Online Players</h2>
          <div className="players-count">
            <span className="current">{players.length}</span>
            <span className="separator">/</span>
            <span className="max">{maxPlayers}</span>
          </div>
        </div>
        
        <div className="header-controls">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search players or jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sort-select">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="name">Sort by Name</option>
              <option value="level">Sort by Level</option>
              <option value="ping">Sort by Ping</option>
              <option value="playtime">Sort by Playtime</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-header">
              <div className="player-avatar">
                <div className="avatar-circle">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(player.status) }}
                ></div>
              </div>
              
              <div className="player-info">
                <div className="player-name">
                  {player.name}
                  {player.isVip && (
                    <svg className="vip-badge" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2L15.09,8.26L22,9L17,14L18.18,21L12,17.77L5.82,21L7,14L2,9L8.91,8.26L12,2Z"/>
                    </svg>
                  )}
                </div>
                <div className="player-job">{player.job}</div>
              </div>
            </div>
            
            <div className="player-stats">
              <div className="stat-item">
                <span className="stat-label">Level</span>
                <span className="stat-value">{player.level}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Ping</span>
                <span 
                  className="stat-value ping"
                  style={{ color: getPingColor(player.ping) }}
                >
                  {player.ping}ms
                </span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Playtime</span>
                <span className="stat-value">{player.playtime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPlayers.length === 0 && (
        <div className="no-players">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V3.5L19,9Z"/>
          </svg>
          <h3>No players found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};
