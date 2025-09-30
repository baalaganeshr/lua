import React from 'react';
import { useVisibility } from '@utilities/visibilityProvider';
import { isEnvBrowser } from '@utilities/misc';
import './DemoControls.scss';

interface DemoControlsProps {
  onDataUpdate: (data: any) => void;
}

export const DemoControls: React.FC<DemoControlsProps> = ({ onDataUpdate }) => {
  const { visible, setVisible } = useVisibility();

  if (!isEnvBrowser()) {
    return null; // Only show in browser
  }

  const toggleUI = () => {
    setVisible(!visible);
  };

  const updateServerData = () => {
    const mockData = {
      ServerName: "Demo FiveM Server",
      MaxPlayers: Math.floor(Math.random() * 64) + 16,
      StartingMoney: Math.floor(Math.random() * 10000) + 1000,
      isPvpEnabled: Math.random() > 0.5
    };
    onDataUpdate(mockData);
    setVisible(true);
  };

  return (
    <div className="demo-controls">
      <h3>Demo Controls</h3>
      <p>Browser testing mode active</p>
      <div className="demo-buttons">
        <button onClick={toggleUI} className="demo-btn primary">
          {visible ? 'Hide UI' : 'Show UI'}
        </button>
        <button onClick={updateServerData} className="demo-btn secondary">
          Update Data
        </button>
      </div>
    </div>
  );
};

export default DemoControls;