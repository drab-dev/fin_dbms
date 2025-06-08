import React, { useEffect, useState } from 'react';
import './fin.css';
import Sidebar from './sideBar.jsx';
import { useRealtimeNetProfit } from './React_hook_for_net_profit_or_loss.jsx';
import { useNavigate } from 'react-router-dom';

const DashboardStats = () => {
  const { netProfit, loading: profitLoading, error: profitError } = useRealtimeNetProfit();
  const stats = {
    inventory: 321,
    customers: 87,
    vendors: 34,
    orders: 12,
    lowstock: 5,
  };
  return (
    <div className="dashboard" id="dashboard">
      <div className="stat-card">
        <div className="stat-title">Net Profit/Loss</div>
        <div className="stat-value" style={{ color: profitLoading ? undefined : (netProfit > 0 ? 'green' : netProfit < 0 ? 'red' : undefined) }}>
          {profitLoading ? 'Loading...' : (profitError ? 'Error' : (netProfit !== null ? netProfit : 0))}
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Inventory Items</div>
        <div className="stat-value">{stats.inventory}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Customers</div>
        <div className="stat-value">{stats.customers}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Vendors</div>
        <div className="stat-value">{stats.vendors}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Pending Orders</div>
        <div className="stat-value">{stats.orders}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Low Stock Alerts</div>
        <div className="stat-value">{stats.lowstock}</div>
      </div>
    </div>
  );
};

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 16) {
      setGreeting('Good Afternoon');
    } else if (hour >= 16 && hour < 20) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Welcome');
    }
    const user = JSON.parse(localStorage.getItem('fin_user') || '{}');
    if (user && user.username) {
      setUsername(user.username.charAt(0).toUpperCase() + user.username.slice(1));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('fin_user');
    navigate('/login', { replace: true });
  };

  return (
    <div className="greeting-container">
      <div className="greeting">{greeting}</div>
      <div className="name">{username || 'User'}</div>
      <button
        className="signout-btn"
        onClick={handleSignOut}
        style={{
          position:'fixed',
          bottom:'10px',
          left:'10px',
          marginTop: '14px',
          background: 'linear-gradient(90deg, #ff5858 0%, #f09819 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          padding: '8px 22px',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #f09819 0%, #ff5858 100%)'}
        onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff5858 0%, #f09819 100%)'}
      >
        Sign Out
      </button>
    </div>
  );
};

const App = () => {
  // No need to handle auth here; Root.jsx should handle redirecting to login if not authenticated
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, position: 'relative' }}>
        <div className="dashboard-container">
          <div className="dashboard-title">Dashboard</div>
          <DashboardStats />
        </div>
        {/* <FloatingButtons /> */}
        <Greeting />
      </div>
    </div>
  );
};

export default App;
