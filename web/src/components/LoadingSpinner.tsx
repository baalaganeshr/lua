import React from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'primary',
  className = '' 
}) => {
  return (
    <div className={`loading-spinner ${size} ${color} ${className}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
