import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root.jsx';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);
