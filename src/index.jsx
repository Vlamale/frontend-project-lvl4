// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/application.scss';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/app/AppProvider.jsx';
import { Provider } from 'react-redux'
import store from './slices/index.js'
import SocketProvider from './context/socket/SocketProvider.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <Provider store={store}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Provider>
    </AppProvider>
  </BrowserRouter>,
  document.querySelector('#chat')
)

