import React, { useState } from 'react';
import App from './App';
import Login from './Login';

const Root = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fin_user')) || null;
    } catch {
      return null;
    }
  });

  if (!user) {
    return <Login onLogin={setUser} />;
  }
  return <App />;
};

export default Root;
