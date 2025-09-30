import React from 'react';
import './EconomyPanel.scss';

interface EconomyData {
  startingMoney: number;
  bankRate: number;
  jobMultiplier: number;
  taxRate: number;
}

interface EconomyPanelProps {
  data: EconomyData;
}

interface JobInfo {
  name: string;
  baseSalary: number;
  requirements: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

const jobs: JobInfo[] = [
  {
    name: 'Delivery Driver',
    baseSalary: 150,
    requirements: 'Valid License',
    description: 'Deliver packages and food around the city',
    icon: 'M19,7H9V5A3,3 0 0,0 6,2A3,3 0 0,0 3,5V19A3,3 0 0,0 6,22H18A3,3 0 0,0 21,19V10A3,3 0 0,0 18,7H19M3,5A1,1 0 0,1 4,4A1,1 0 0,1 5,5V19A1,1 0 0,1 4,20A1,1 0 0,1 3,19V5M8,7H18A1,1 0 0,1 19,8V19A1,1 0 0,1 18,20H8V7Z',
    difficulty: 'Easy'
  },
  {
    name: 'Police Officer',
    baseSalary: 300,
    requirements: 'Clean Record, Training',
    description: 'Protect and serve the community',
    icon: 'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C14.8,12.4 14.1,13.2 13.2,13.2H10.8C9.9,13.2 9.2,12.4 9.2,11.5V10.5C9.2,8.6 10.6,7 12,7Z',
    difficulty: 'Hard'
  },
  {
    name: 'Doctor',
    baseSalary: 500,
    requirements: 'Medical License, Experience',
    description: 'Provide medical care and save lives',
    icon: 'M18,14V17H15V19H18V22H20V19H23V17H20V14H18M12.5,12A2.5,2.5 0 0,0 15,9.5A2.5,2.5 0 0,0 12.5,7A2.5,2.5 0 0,0 10,9.5A2.5,2.5 0 0,0 12.5,12M12.5,2A7.5,7.5 0 0,1 20,9.5C20,10.5 19.8,11.5 19.5,12.4L18.1,11C18.4,10.2 18.5,9.9 18.5,9.5A6,6 0 0,0 12.5,3.5A6,6 0 0,0 6.5,9.5C6.5,12.6 12.5,20 12.5,20S16.7,15.2 17.9,12.9L16.5,11.6C15.8,13.1 12.5,17.6 12.5,17.6S8.5,12.6 8.5,9.5A4,4 0 0,1 12.5,5.5A4,4 0 0,1 16.5,9.5C16.5,9.7 16.5,9.9 16.4,10.1L17.8,11.5C17.9,10.9 18,10.2 18,9.5A5.5,5.5 0 0,0 12.5,4A5.5,5.5 0 0,0 7,9.5C7,14.2 12.5,22 12.5,22S18,14.2 18,9.5A7.5,7.5 0 0,0 12.5,2Z',
    difficulty: 'Expert'
  },
  {
    name: 'Mechanic',
    baseSalary: 250,
    requirements: 'Technical Skills',
    description: 'Repair and maintain vehicles',
    icon: 'M21.71,9.29L20.29,7.88L18.88,9.29C18.45,8.89 17.92,8.6 17.33,8.5L17.33,6.5H15.33L15.33,8.5C14.74,8.6 14.21,8.89 13.79,9.29L12.38,7.88L10.96,9.29L12.38,10.71C11.98,11.13 11.69,11.66 11.59,12.25H9.59V14.25H11.59C11.69,14.84 11.98,15.37 12.38,15.79L10.96,17.21L12.38,18.62L13.79,17.21C14.21,17.61 14.74,17.9 15.33,18V20H17.33V18C17.92,17.9 18.45,17.61 18.88,17.21L20.29,18.62L21.71,17.21L20.29,15.79C20.69,15.37 20.98,14.84 21.08,14.25H23.08V12.25H21.08C20.98,11.66 20.69,11.13 20.29,10.71L21.71,9.29M16.33,15.25A3,3 0 0,1 13.33,12.25A3,3 0 0,1 16.33,9.25A3,3 0 0,1 19.33,12.25A3,3 0 0,1 16.33,15.25M7,2V4H9V2H7M2,7V9H4V7H2M7,22V24H9V22H7M2,17V19H4V17H2Z',
    difficulty: 'Medium'
  },
  {
    name: 'Business Owner',
    baseSalary: 800,
    requirements: 'Capital, Business Plan',
    description: 'Own and operate businesses',
    icon: 'M12,7V3H2V21H22V7H12M6,19H4V17H6V19M6,15H4V13H6V15M6,11H4V9H6V11M6,7H4V5H6V7M10,19H8V17H10V19M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,19H12V17H20V19M20,15H12V13H20V15M20,11H12V9H20V11Z',
    difficulty: 'Expert'
  },
  {
    name: 'Taxi Driver',
    baseSalary: 180,
    requirements: 'Valid License, Clean Record',
    description: 'Transport passengers around the city',
    icon: 'M18.92,6.01C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M6.5,6.5H17.5L18.5,9H5.5L6.5,6.5M19,17H5V12H19V17M7.5,13A1.5,1.5 0 0,1 9,14.5A1.5,1.5 0 0,1 7.5,16A1.5,1.5 0 0,1 6,14.5A1.5,1.5 0 0,1 7.5,13M16.5,13A1.5,1.5 0 0,1 18,14.5A1.5,1.5 0 0,1 16.5,16A1.5,1.5 0 0,1 15,14.5A1.5,1.5 0 0,1 16.5,13Z',
    difficulty: 'Easy'
  }
];

export const EconomyPanel: React.FC<EconomyPanelProps> = ({ data }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getDifficultyColor = (difficulty: JobInfo['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#f97316';
      case 'Expert': return '#ef4444';
    }
  };

  const calculateHourlyPay = (baseSalary: number) => {
    return Math.round(baseSalary * (data.jobMultiplier || 1));
  };

  return (
    <div className="economy-panel">
      <div className="economy-header">
        <h2 className="economy-title">Server Economy</h2>
        <p className="economy-subtitle">Economic information and available job opportunities</p>
      </div>
      
      <div className="economy-overview">
        <div className="overview-grid">
          <div className="overview-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Starting Money</h3>
              <div className="card-value">{formatCurrency(data.startingMoney)}</div>
              <p className="card-description">New player bonus</p>
            </div>
          </div>
          
          <div className="overview-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9Z"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Bank Interest</h3>
              <div className="card-value">{data.bankRate}%</div>
              <p className="card-description">Daily interest rate</p>
            </div>
          </div>
          
          <div className="overview-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Job Multiplier</h3>
              <div className="card-value">{data.jobMultiplier}x</div>
              <p className="card-description">Salary boost</p>
            </div>
          </div>
          
          <div className="overview-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/>
              </svg>
            </div>
            <div className="card-content">
              <h3>Tax Rate</h3>
              <div className="card-value">{data.taxRate}%</div>
              <p className="card-description">Income tax</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="jobs-section">
        <div className="section-header">
          <h3>Available Jobs</h3>
          <p>Choose from various career paths with different pay scales</p>
        </div>
        
        <div className="jobs-grid">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-header">
                <div className="job-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={job.icon} />
                  </svg>
                </div>
                
                <div className="job-info">
                  <h4 className="job-name">{job.name}</h4>
                  <div 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(job.difficulty) }}
                  >
                    {job.difficulty}
                  </div>
                </div>
              </div>
              
              <p className="job-description">{job.description}</p>
              
              <div className="job-details">
                <div className="detail-row">
                  <span className="detail-label">Base Salary:</span>
                  <span className="detail-value salary">
                    {formatCurrency(calculateHourlyPay(job.baseSalary))}/hr
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Requirements:</span>
                  <span className="detail-value">{job.requirements}</span>
                </div>
              </div>
              
              <div className="job-footer">
                <button className="apply-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="economy-tips">
        <div className="tips-header">
          <h3>Economic Tips</h3>
        </div>
        
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
              </svg>
            </div>
            <div className="tip-content">
              <h4>Save Money</h4>
              <p>Use the bank to earn daily interest on your savings</p>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
              </svg>
            </div>
            <div className="tip-content">
              <h4>Complete Jobs</h4>
              <p>Higher difficulty jobs pay more but require experience</p>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
              </svg>
            </div>
            <div className="tip-content">
              <h4>Invest Wisely</h4>
              <p>Consider starting a business for passive income</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
