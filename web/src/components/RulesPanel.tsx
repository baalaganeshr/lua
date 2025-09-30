import React, { useState } from 'react';
import './RulesPanel.scss';

interface Rule {
  id: number;
  category: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  examples?: string[];
}

const serverRules: Rule[] = [
  {
    id: 1,
    category: 'General Conduct',
    title: 'Respect All Players',
    description: 'Treat all players with respect. No harassment, bullying, or discriminatory language will be tolerated.',
    severity: 'critical',
    examples: ['No racial slurs', 'No personal attacks', 'Be courteous in chat']
  },
  {
    id: 2,
    category: 'Roleplay',
    title: 'Stay In Character',
    description: 'Maintain your character at all times. Breaking character disrupts the roleplay experience.',
    severity: 'high',
    examples: ['No OOC chat in IC channels', 'Act according to your character', 'Use /ooc for out-of-character']
  },
  {
    id: 3,
    category: 'Combat',
    title: 'No Random Death Match (RDM)',
    description: 'Do not kill other players without proper roleplay reason or initiation.',
    severity: 'critical',
    examples: ['Initiate RP before combat', 'Have valid IC reason', 'Follow fear RP rules']
  },
  {
    id: 4,
    category: 'Vehicles',
    title: 'No Vehicle Death Match (VDM)',
    description: 'Using vehicles as weapons without roleplay context is prohibited.',
    severity: 'high',
    examples: ['No ramming players', 'RP vehicle accidents', 'Use vehicles realistically']
  },
  {
    id: 5,
    category: 'Metagaming',
    title: 'No Metagaming',
    description: 'Do not use information obtained outside of roleplay in your character interactions.',
    severity: 'medium',
    examples: ['No Discord coordination', 'No stream sniping', 'Keep IC and OOC separate']
  },
  {
    id: 6,
    category: 'Exploiting',
    title: 'No Bug Exploitation',
    description: 'Report bugs instead of exploiting them. Abuse of game mechanics is prohibited.',
    severity: 'critical',
    examples: ['Report glitches to staff', 'No money exploits', 'No duplication glitches']
  },
  {
    id: 7,
    category: 'Communication',
    title: 'English Only in Global Chat',
    description: 'Use English in global channels to ensure all players can understand.',
    severity: 'low',
    examples: ['English in /ooc', 'Other languages in private', 'Use translation if needed']
  },
  {
    id: 8,
    category: 'Names',
    title: 'Realistic Character Names',
    description: 'Use realistic first and last names for your character.',
    severity: 'medium',
    examples: ['No meme names', 'No celebrity names', 'Use proper format: First_Last']
  }
];

export const RulesPanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedRule, setExpandedRule] = useState<number | null>(null);

  const categories = ['all', ...Array.from(new Set(serverRules.map(rule => rule.category)))];
  
  const filteredRules = selectedCategory === 'all' 
    ? serverRules 
    : serverRules.filter(rule => rule.category === selectedCategory);

  const getSeverityColor = (severity: Rule['severity']) => {
    switch (severity) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#f97316';
      case 'critical': return '#ef4444';
    }
  };

  const getSeverityIcon = (severity: Rule['severity']) => {
    switch (severity) {
      case 'low': return 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z';
      case 'medium': return 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z';
      case 'high': return 'M12,2L13.09,8.26L22,9L17,14L18.18,21L12,17.77L5.82,21L7,14L2,9L8.91,8.26L12,2Z';
      case 'critical': return 'M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z';
    }
  };

  return (
    <div className="rules-panel">
      <div className="rules-header">
        <h2 className="rules-title">Server Rules</h2>
        <p className="rules-subtitle">Please read and follow all server rules to ensure a positive experience for everyone</p>
      </div>
      
      <div className="rules-filters">
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Rules' : category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="rules-list">
        {filteredRules.map((rule) => (
          <div 
            key={rule.id} 
            className={`rule-card ${expandedRule === rule.id ? 'expanded' : ''}`}
          >
            <div 
              className="rule-header"
              onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
            >
              <div className="rule-title-section">
                <div 
                  className="severity-indicator"
                  style={{ backgroundColor: getSeverityColor(rule.severity) }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={getSeverityIcon(rule.severity)} />
                  </svg>
                </div>
                
                <div className="rule-info">
                  <h3 className="rule-title">{rule.title}</h3>
                  <span className="rule-category">{rule.category}</span>
                </div>
              </div>
              
              <div className="rule-actions">
                <span className={`severity-badge ${rule.severity}`}>
                  {rule.severity.toUpperCase()}
                </span>
                
                <button className="expand-button">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={expandedRule === rule.id ? 'rotated' : ''}
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="rule-content">
              <p className="rule-description">{rule.description}</p>
              
              {rule.examples && rule.examples.length > 0 && (
                <div className="rule-examples">
                  <h4>Examples:</h4>
                  <ul>
                    {rule.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="rules-footer">
        <div className="footer-content">
          <div className="severity-legend">
            <h4>Severity Levels:</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: getSeverityColor('low') }}></div>
                <span>Low - Warning</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: getSeverityColor('medium') }}></div>
                <span>Medium - Kick</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: getSeverityColor('high') }}></div>
                <span>High - Temporary Ban</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ backgroundColor: getSeverityColor('critical') }}></div>
                <span>Critical - Permanent Ban</span>
              </div>
            </div>
          </div>
          
          <div className="contact-info">
            <p>Questions about rules? Contact staff on Discord or use /report in-game</p>
          </div>
        </div>
      </div>
    </div>
  );
};
