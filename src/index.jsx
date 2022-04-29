// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App.jsx';
import './locales/i18n.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: '1eee01cbbf6c4972a59b624f02b6e26a',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

ReactDOM.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </RollbarProvider>,
  document.querySelector('#chat'),
);
