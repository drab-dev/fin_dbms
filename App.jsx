import React, { useEffect } from 'react';
import './fin.css';

const DashboardStats = () => {
  const stats = {
    transactions: 1500,
    inventory: 321,
    customers: 87,
    vendors: 34,
    orders: 12,
    lowstock: 5,
  };
  return (
    <div className="dashboard" id="dashboard">
      <div className="stat-card">
        <div className="stat-title">Total Transactions</div>
        <div className="stat-value">{stats.transactions}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Inventory Items</div>
        <div className="stat-value">{stats.inventory}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Customers</div>
        <div className="stat-value">{stats.Customers}</div>
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

/*const FloatingButtons = () => {
  useEffect(() => {
    const fabs = document.querySelectorAll('.fab');
    fabs.forEach((fab) => {
      fab.addEventListener('click', () => {
        fab.animate([
          { transform: 'scale(1) rotate(0deg)' },
          { transform: 'scale(1.18) rotate(12deg)' },
          { transform: 'scale(1) rotate(0deg)' },
        ], {
          duration: 400,
          easing: 'cubic-bezier(.68,-0.55,.27,1.55)',
        });
      });
    });
  }, []);
  return (
    <div className="fab-container">
      <button className="fab fab-1" title="Add Transaction" id="btnAddTrans">＋</button>
      <button className="fab fab-2" title="Add Inventory" id="btnAddInv">📦</button>
      <button className="fab fab-3" title="Add Customer" id="btnAddCust">👤</button>
      <button className="fab fab-4" title="Add Vendor" id="btnAddVend">🏢</button>
      <button className="fab fab-5" title="Reports" id="btnReports">📊</button>
      <button className="fab fab-6" title="Settings" id="btnSettings">⚙️</button>
    </div>
  );
};*/

const Sidebar = ({ openBlank, toggleSidebar, toggleSubmenu }) => (
  <div className="sidebar" id="sidebar">
    <button className="toggle-btn" onClick={toggleSidebar} id="toggleBtn">→</button>
    <div className="menu-title" id="menuTitle">Menu</div>
    <ul className="menu" id="menu">
      <li className="menu-item" onClick={() => openBlank('Ledgers.jsx')}>
        <span className="arrow label">&gt;</span><span className="label">Ledgers</span>
      </li>
      <li className="menu-item" onClick={() => openBlank('Debtors.jsx')}>
        <span className="arrow label">&gt;</span><span className="label">Debtors</span>
      </li>
      <li className="menu-item" onClick={() => openBlank('Creditors.jsx')}>
        <span className="arrow label">&gt;</span><span className="label">Creditors</span>
      </li>
      <li className="menu-item" onClick={toggleSubmenu}>
        <span className="arrow label">&gt;</span><span className="label">Statements</span>
      </li>
      <ul className="submenu" id="statementsSubmenu">
        <li className="menu-item" onClick={() => openBlank('Pl.jsx')}>
          <span className="arrow label">&gt;</span><span className="label">P/L</span>
        </li>
        <li className="menu-item" onClick={() => openBlank('Bank.jsx')}>
          <span className="arrow label">&gt;</span><span className="label">Bank Statement</span>
        </li>
        <li className="menu-item" onClick={() => openBlank('Balance.jsx')}>
          <span className="arrow label">&gt;</span><span className="label">Balance Sheet</span>
        </li>
      </ul>
    </ul>
  </div>
);

const Greeting = () => {
  useEffect(() => {
    const greetingElement = document.getElementById('greeting');
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      greetingElement.textContent = 'Good Morning';
    } else if (hour >= 12 && hour < 16) {
      greetingElement.textContent = 'Good Afternoon';
    } else if (hour >= 16 && hour < 20) {
      greetingElement.textContent = 'Good Evening';
    } else {
      greetingElement.textContent = 'Welcome';
    }
    const user = JSON.parse(localStorage.getItem('fin_user') || '{}');
    if (user && user.username) {
      document.getElementById('userName').textContent = user.username.charAt(0).toUpperCase() + user.username.slice(1);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('fin_user');
    window.location.replace('login.html'); // Use replace to prevent back navigation
  };

  return (
    <div className="greeting-container">
      <div className="greeting" id="greeting"></div>
      <div className="name" id="userName">Nikhil</div>
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
  const openBlank = (page) => {
    window.open(page, '_self');
  };
  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const labels = document.querySelectorAll('.label');
    const menuTitle = document.getElementById('menuTitle');
    const toggleBtn = document.getElementById('toggleBtn');
    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    labels.forEach(el => {
      el.style.display = isCollapsed ? 'none' : 'inline';
    });
    menuTitle.style.display = isCollapsed ? 'none' : 'block';
    toggleBtn.innerHTML = isCollapsed ? '→' : '←';
  };
  const toggleSubmenu = () => {
    const submenu = document.getElementById('statementsSubmenu');
    submenu.classList.toggle('open');
  };
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar openBlank={openBlank} toggleSidebar={toggleSidebar} toggleSubmenu={toggleSubmenu} />
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
