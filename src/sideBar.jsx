// Moved from project root
import { Link } from "react-router-dom";
function Sidebar() {
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
    <div className="sidebar" id='sidebar' style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between'}}>
      <div>
        <button className="toggle-btn" onClick={toggleSidebar} id="toggleBtn">→</button>
        <div className="menu-title" id="menuTitle">Menu</div>
        <ul className="menu" id="menu">
          <Link to="/ledgers">
            <li className="menu-item">
              <span className="arrow label">&gt;</span><span className="label">Ledgers</span>
            </li>
          </Link>
          <li className="menu-item">
            <Link to="/debtors" style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', alignItems: 'center' }}>
              <span className="arrow label">&gt;</span><span className="label">Debtors</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/creditors" style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', alignItems: 'center' }}>
              <span className="arrow label">&gt;</span><span className="label">Creditors</span>
            </Link>
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
      <button
        className="signout-btn label"
        onClick={() => {
          localStorage.removeItem('fin_user');
          window.location.replace('login.html');
        }}
        style={{
          margin: '18px 10px',
          background: 'linear-gradient(90deg, #988B86 0%, #65A38D 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          padding: '8px 22px',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          transition: 'background 0.2s, transform 0.1s',
          width: 'calc(100% - 20px)'
        }}
        onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #65A38D 0%, #988B86 100%)'}
        onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #988B86 0%, #65A38D 100%)'}
      >
        Sign Out
      </button>
    </div>
  )
}

export default Sidebar
