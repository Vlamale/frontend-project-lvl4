import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header.jsx';
import Modal from './components/modals/index.jsx';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './AppRouter.jsx';

function App() {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <AppRouter />
      </div>
      <ToastContainer
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
      />
      <Modal />
    </>
  );
}

export default App;
