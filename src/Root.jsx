import React from 'react';
import Main from './main.jsx';
import Login from '../Login';

const Root = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('fin_user')) || null;
  } catch {
    user = null;
  }

  if (!user) {
    return <Login onLogin={() => window.location.reload()} />;
  }
  return <Main />;
};

export default Root;
