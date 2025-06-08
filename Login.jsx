import React, { useState } from 'react';
import './fin.css';
import logoImage from './accosight logo new.png';

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
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-error">{error}</div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
      <div className="login-logo">
        <img src={logoImage} alt="Logo" />
      </div>
    </div>
  );
};

export default Login;

