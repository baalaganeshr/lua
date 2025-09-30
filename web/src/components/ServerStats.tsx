import React from 'react';
import './ServerStats.scss';

interface ServerStatsProps {
  data: {
    ServerName: string;
    MaxPlayers: number;
    StartingMoney: number;
    isPvpEnabled: boolean;
    onlineCount?: number;
    uptime?: string;
    ping?: number;
    location?: string;
  };
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  sublabel?: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan';
  trend?: 'up' | 'down' | 'stable';
  percentage?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sublabel, color, trend, percentage }) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number' && val > 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(val);
    }
    return val;
  };

  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-header">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d={icon} />
          </svg>
        </div>
        {trend && (
          <div className={`trend-indicator ${trend}`}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              {trend === 'up' && <path d="M7 14l5-5 5 5z" />}
              {trend === 'down' && <path d="M7 10l5 5 5-5z" />}
              {trend === 'stable' && <path d="M9 16h6v-6h4l-7-7-7 7h4z" />}
            </svg>
            {percentage && <span>{percentage}%</span>}
          </div>
        )}
      </div>
      <div className="stat-content">
        <div className="stat-value">{formatValue(value)}</div>
        <div className="stat-label">{label}</div>
        {sublabel && <div className="stat-sublabel">{sublabel}</div>}
      </div>
      <div className="stat-overlay"></div>
    </div>
  );
};

export const ServerStats: React.FC<ServerStatsProps> = ({ data }) => {
  const stats = [
    {
      icon: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.24-.71-.85-1.2-1.51-1.36-.28-.07-.56-.01-.82.12l-2 2.98C13.75 11.13 13.39 11 13 11H7c-.83 0-1.5.67-1.5 1.5S6.17 14 7 14h5l-1.78 2.67L9 19l1.41 1.41L12.83 18H20z",
      label: "Players Online",
      value: `${data.onlineCount || 0}/${data.MaxPlayers}`,
      sublabel: "Active connections",
      color: "blue" as const,
      trend: "up" as const,
      percentage: Math.round(((data.onlineCount || 0) / data.MaxPlayers) * 100)
    },
    {
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      label: "Starting Money",
      value: data.StartingMoney,
      sublabel: "New player bonus",
      color: "green" as const,
      trend: "stable" as const
    },
    {
      icon: data.isPvpEnabled ? "M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" : "M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V3.5L19,9Z",
      label: "PvP Status",
      value: data.isPvpEnabled ? "Enabled" : "Disabled",
      sublabel: "Player vs Player",
      color: data.isPvpEnabled ? "red" as const : "green" as const,
      trend: data.isPvpEnabled ? "up" as const : "down" as const
    },
    {
      icon: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C14.8,12.4 14.1,13.2 13.2,13.2H10.8C9.9,13.2 9.2,12.4 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7Z",
      label: "Server Ping",
      value: `${data.ping || 45}ms`,
      sublabel: "Response time",
      color: "cyan" as const,
      trend: "stable" as const
    },
    {
      icon: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z",
      label: "Server Uptime",
      value: data.uptime || "24h 15m",
      sublabel: "Continuous runtime",
      color: "purple" as const,
      trend: "up" as const,
      percentage: 99
    },
    {
      icon: "M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2Z",
      label: "Location",
      value: data.location || "US East",
      sublabel: "Server region",
      color: "orange" as const,
      trend: "stable" as const
    }
  ];

  return (
    <div className="server-stats">
      <div className="stats-header">
        <h2 className="stats-title">Server Statistics</h2>
        <p className="stats-subtitle">Real-time server performance and information</p>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="stats-footer">
        <div className="last-updated">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
          </svg>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};
