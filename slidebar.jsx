import Ledgers from './Ledgers.jsx'
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
    <div className="sidebar" id='sidebar'>
      <button className="toggle-btn" onClick={toggleSidebar} id="toggleBtn">→</button>
      <div className="menu-title" id="menuTitle">Menu</div>
      <ul className="menu" id="menu">
        <Link to="/ledgers">
          <li className="menu-item">
            <span className="arrow label">&gt;</span><span className="label">Ledgers</span>
          </li>
        </Link>
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
  )
}

export default Sidebar