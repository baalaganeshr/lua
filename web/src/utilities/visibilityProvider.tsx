import React, { createContext, useContext, useState, ReactNode } from 'react';
import { isEnvBrowser } from './misc';

interface VisibilityContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const useVisibility = () => {
  const context = useContext(VisibilityContext);
  if (!context) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }
  return context;
};

interface VisibilityProviderProps {
  children: ReactNode;
}

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({ children }) => {
  // Start visible in browser for testing, hidden in FiveM by default
  const [visible, setVisible] = useState<boolean>(isEnvBrowser());

  return (
    <VisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </VisibilityContext.Provider>
  );
};
