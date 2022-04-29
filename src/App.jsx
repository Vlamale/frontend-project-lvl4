import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header.jsx';
import Modal from './components/modals/index.jsx';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './AppRouter.jsx';
import AppProvider from './context/app/AppProvider.jsx';
import store from './slices/index.js';
import SocketProvider from './context/socket/SocketProvider.jsx';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Provider store={store}>
          <SocketProvider>
            <div className="d-flex flex-column h-100">
              <Header />
              <AppRouter />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Modal />
          </SocketProvider>
        </Provider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
