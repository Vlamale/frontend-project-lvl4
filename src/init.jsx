import React from 'react';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import AppProvider from './context/app/AppProvider.jsx';
import SocketProvider from './context/socket/SocketProvider.jsx';
import store from './slices/index.js';
import i18instance from './locales/i18n.js';

const init = (socket) => {
  const rollbarConfig = {
    accessToken: '1eee01cbbf6c4972a59b624f02b6e26a',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppProvider>
            <Provider store={store}>
              <SocketProvider socket={socket}>
                <I18nextProvider i18n={i18instance}>
                  <App />
                </I18nextProvider>
              </SocketProvider>
            </Provider>
          </AppProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
