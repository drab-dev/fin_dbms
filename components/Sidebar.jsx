import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('fin_user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
        <button 
          onClick={toggleSidebar} 
          className="toggle-btn"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? '←' : '→'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          Dashboard
        </Link>
        <Link to="/ledgers" className="nav-item">
          Ledgers
        </Link>
        <Link to="/debtors" className="nav-item">
          Debtors
        </Link>
        <Link to="/creditors" className="nav-item">
          Creditors
        </Link>
        <Link to="/statements" className="nav-item">
          Statements
        </Link>
      </nav>

      <button onClick={handleSignOut} className="sign-out-btn">
        Sign Out
      </button>
    </aside>
  );
};

export default Sidebar;
