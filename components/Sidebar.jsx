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
        <h2 className="menu-title">{isExpanded ? 'Menu' : 'M'}</h2>
        <button 
          onClick={toggleSidebar} 
          className="toggle-btn"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? '←' : '→'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${isExpanded ? '' : 'collapsed'}`}>
          {isExpanded ? 'Dashboard' : 'D'}
        </Link>
        <Link to="/ledgers" className={`nav-item ${isExpanded ? '' : 'collapsed'}`}>
          {isExpanded ? 'Ledgers' : 'L'}
        </Link>
        <Link to="/debtors" className={`nav-item ${isExpanded ? '' : 'collapsed'}`}>
          {isExpanded ? 'Debtors' : 'Db'}
        </Link>
        <Link to="/creditors" className={`nav-item ${isExpanded ? '' : 'collapsed'}`}>
          {isExpanded ? 'Creditors' : 'Cr'}
        </Link>
        <Link to="/statements" className={`nav-item ${isExpanded ? '' : 'collapsed'}`}>
          {isExpanded ? 'Statements' : 'S'}
        </Link>
      </nav>

      <button onClick={handleSignOut} className={`sign-out-btn ${isExpanded ? '' : 'collapsed'}`}>
        {isExpanded ? 'Sign Out' : 'SO'}
      </button>
    </aside>
  );
};

export default Sidebar;
