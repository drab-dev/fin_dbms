import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root.jsx';
import { BrowserRouter } from 'react-router-dom'
import Main from './main.jsx';
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Main></Main>
    </BrowserRouter>
  </StrictMode>,
)
