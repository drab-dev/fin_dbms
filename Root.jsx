import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Ledgers from './Ledgers';
import Debtors from './Debtors';
import Creditors from './Creditors';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('fin_user') || 'null');
  return user ? children : <Navigate to="/login" replace />;
};

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ledgers"
          element={
            <PrivateRoute>
              <Ledgers />
            </PrivateRoute>
          }
        />
        <Route
          path="/debtors"
          element={
            <PrivateRoute>
              <Debtors />
            </PrivateRoute>
          }
        />
        <Route
          path="/creditors"
          element={
            <PrivateRoute>
              <Creditors />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default Root;
