// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/application.scss';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/app/AppProvider.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
  document.querySelector('#chat')
)

