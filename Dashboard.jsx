import React from 'react';
import Sidebar from './components/Sidebar';

const StatCard = ({ title, value, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('fin_user') || '{}');
  const role = user.role || 'User';
  const username = user.username || 'Guest';

  const stats = [
    { title: 'Total Revenue', value: '₹2,45,000', icon: '💰' },
    { title: 'Monthly Profit', value: '₹32,000', icon: '📈' },
    { title: 'Active Debtors', value: '12', icon: '👥' },
    { title: 'Pending Credits', value: '₹18,500', icon: '⏳' },
    { title: 'Total Transactions', value: '156', icon: '🔄' },
    { title: 'Growth Rate', value: '+8.5%', icon: '📊' }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <div className="welcome-section">
          <h1>{getGreeting()}, {username}!</h1>
          <p>Welcome to your {role} dashboard</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
