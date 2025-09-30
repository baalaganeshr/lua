import React from 'react';
import { isEnvBrowser } from '@utilities/misc';

export const DevInfo: React.FC = () => {
  if (!isEnvBrowser()) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#10b981',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      border: '1px solid rgba(16, 185, 129, 0.3)'
    }}>
      DEV MODE | Browser Environment
    </div>
  );
};

export default DevInfo;