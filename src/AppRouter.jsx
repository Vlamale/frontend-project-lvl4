import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PNotFound from './pages/notFoundPage.jsx';
import { authRoutes, publicRoutes } from './consts/routes.js';
import useAppContext from './hooks/useAppContext.js';

const getCurrentRoutes = (isAuthorized) => (isAuthorized ? authRoutes : publicRoutes);

function AppRouter() {
  const { isAuthorized } = useAppContext();
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
