import React, { useState } from 'react';
import './fin.css';

const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'employee', password: 'emp123', role: 'employee' },
];

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );
    if (user) {
      localStorage.setItem('fin_user', JSON.stringify(user));
      onLogin(user);
    } else {
      setError('Invalid credentials or role.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">FinDBMS Login</div>
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <div className="login-error">{error}</div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
