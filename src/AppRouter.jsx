import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PNotFound from './pages/notFoundPage.jsx';
import AppContext from './context/app/AppContext.js';
import { authRoutes, publicRoutes } from './consts/routes.js';

const getCurrentRoutes = (isAuthorized) => (isAuthorized ? authRoutes : publicRoutes);

function AppRouter() {
  const { isAuthorized } = useContext(AppContext);
  const [routes, setRoutes] = useState(getCurrentRoutes(isAuthorized));

  useEffect(() => {
    setRoutes(getCurrentRoutes(isAuthorized));
  }, [isAuthorized]);

  return (
    <Routes>
      {routes.map(({ path, Component, redirectTo }) => (
        <Route
          key={path}
          path={path}
          element={redirectTo
            ? (<Navigate replace to={redirectTo} />)
            : (<Component />)}
        />
      ))}
      <Route path="*" element={<PNotFound />} />
    </Routes>
  );
}

export default AppRouter;
