import React, { useState } from 'react';
import './SettingsPanel.scss';

interface SettingsPanelProps {
  onClose?: () => void;
}

interface Setting {
  id: string;
  category: string;
  name: string;
  description: string;
  type: 'toggle' | 'slider' | 'select' | 'input';
  value: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
}

const defaultSettings: Setting[] = [
  {
    id: 'notifications',
    category: 'General',
    name: 'Show Notifications',
    description: 'Display system notifications and alerts',
    type: 'toggle',
    value: true
  },
  {
    id: 'sound',
    category: 'General',
    name: 'Sound Effects',
    description: 'Enable UI sound effects and notifications',
    type: 'toggle',
    value: true
  },
  {
    id: 'volume',
    category: 'General',
    name: 'Volume',
    description: 'Master volume for UI sounds',
    type: 'slider',
    value: 75,
    min: 0,
    max: 100,
    step: 5
  },
  {
    id: 'theme',
    category: 'Appearance',
    name: 'UI Theme',
    description: 'Choose your preferred UI theme',
    type: 'select',
    value: 'dark',
    options: [
      { label: 'Dark Theme', value: 'dark' },
      { label: 'Midnight', value: 'midnight' },
      { label: 'Blue Dark', value: 'blue-dark' }
    ]
  },
  {
    id: 'animations',
    category: 'Appearance',
    name: 'Animations',
    description: 'Enable smooth animations and transitions',
    type: 'toggle',
    value: true
  },
  {
    id: 'blur',
    category: 'Appearance',
    name: 'Background Blur',
    description: 'Blur intensity for glassmorphism effects',
    type: 'slider',
    value: 20,
    min: 0,
    max: 40,
    step: 2
  },
  {
    id: 'showFPS',
    category: 'Performance',
    name: 'Show FPS Counter',
    description: 'Display frames per second counter',
    type: 'toggle',
    value: false
  },
  {
    id: 'reducedMotion',
    category: 'Performance',
    name: 'Reduced Motion',
    description: 'Reduce animations for better performance',
    type: 'toggle',
    value: false
  },
  {
    id: 'autoSave',
    category: 'Data',
    name: 'Auto Save',
    description: 'Automatically save settings changes',
    type: 'toggle',
    value: true
  },
  {
    id: 'dataSync',
    category: 'Data',
    name: 'Cloud Sync',
    description: 'Sync settings across devices',
    type: 'toggle',
    value: false
  }
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [settings, setSettings] = useState<Setting[]>(defaultSettings);
  const [activeCategory, setActiveCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const categories = [...new Set(settings.map(s => s.category))];

  const filteredSettings = settings.filter(setting => {
    const matchesCategory = setting.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      setting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      setting.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateSetting = (id: string, value: any) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
    setHasChanges(true);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasChanges(false);
  };

  const saveSettings = () => {
    // In a real app, you'd save to localStorage or send to server
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const exportSettings = () => {
    const settingsData = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fivem-ui-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderSettingControl = (setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={(e) => updateSetting(setting.id, e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        );
        
      case 'slider':
        return (
          <div className="slider-container">
            <input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={setting.value}
              onChange={(e) => updateSetting(setting.id, Number(e.target.value))}
              className="range-slider"
            />
            <span className="slider-value">{setting.value}{setting.id === 'volume' ? '%' : ''}</span>
          </div>
        );
        
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="select-control"
          >
            {setting.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'input':
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => updateSetting(setting.id, e.target.value)}
            className="text-input"
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <div className="header-content">
          <h2 className="settings-title">Settings</h2>
          <p className="settings-subtitle">Customize your FiveM UI experience</p>
        </div>
        
        <div className="header-actions">
          {hasChanges && (
            <button className="save-btn" onClick={saveSettings}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M15,9H5V5H15V9Z"/>
              </svg>
              Save Changes
            </button>
          )}
          
          <button className="export-btn" onClick={exportSettings}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Export
          </button>
        </div>
      </div>
      
      <div className="settings-content">
        <div className="settings-sidebar">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
            </svg>
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-list">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <div className="category-icon">
                  {category === 'General' && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                    </svg>
                  )}
                  {category === 'Appearance' && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,18C8.69,18 6,15.31 6,12C6,8.69 8.69,6 12,6C15.31,6 18,8.69 18,12C18,15.31 15.31,18 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>
                    </svg>
                  )}
                  {category === 'Performance' && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13,2.05V5.08C16.39,5.57 19,8.47 19,12C19,12.9 18.82,13.75 18.5,14.54L21.12,16.07C21.68,14.83 22,13.45 22,12C22,6.82 18.05,2.55 13,2.05M12,19C8.13,19 5,15.87 5,12C5,8.13 8.13,5 12,5V1C5.93,1 1,5.93 1,12C1,18.07 5.93,23 12,23C15.73,23 19.13,21.42 21.42,18.9L18.5,17.37C16.93,18.47 14.57,19 12,19Z"/>
                    </svg>
                  )}
                  {category === 'Data' && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"/>
                    </svg>
                  )}
                </div>
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="settings-main">
          <div className="settings-grid">
            {filteredSettings.map(setting => (
              <div key={setting.id} className="setting-item">
                <div className="setting-info">
                  <h4 className="setting-name">{setting.name}</h4>
                  <p className="setting-description">{setting.description}</p>
                </div>
                <div className="setting-control">
                  {renderSettingControl(setting)}
                </div>
              </div>
            ))}
          </div>
          
          {filteredSettings.length === 0 && (
            <div className="no-results">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
              </svg>
              <h3>No settings found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="settings-footer">
        <button className="reset-btn" onClick={resetSettings}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z"/>
          </svg>
          Reset to Defaults
        </button>
        
        <div className="footer-info">
          <span>Changes are saved automatically</span>
        </div>
      </div>
    </div>
  );
};
